/**
 * Copyright (c) 2023 Cisco Systems, Inc. and its affiliates
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http:www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { FC, useEffect, useState } from "react";
import { Radio } from "antd";

import { Wrapper } from "@/components";
import { NetworkPolicy } from "@/components/views/application-policy-attachment/_components/network-policy";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { createChannel, createClient } from "nice-grpc-web";
import { AppConnectionControllerDefinition } from "@/_proto/grpc-service/ts/app_connection_controller";
import {
  setNetworkDomainConnectionNames,
  toApplicationConnectionShell
} from "@/store/application-connection-deployer-slice/applicationConnectionDeployerSlice";
import { MatchedResources } from "@/_proto/grpc-service/ts/app_connection";
import { ConnectionInformation } from "@/_proto/grpc-service/ts/network_domain_connection";
import { Checkbox } from "antd";
import styles from "./network-configuration.module.scss";
import { BACKEND_API_PREFIX } from "@/common/constants";

export const NetworkConfiguration: FC<{ visible: boolean }> = ({ visible }) => {
  // NDC : Network Domain Connection
  const { data: NDCs } = useSelector((state: RootState) => state.networkDomainsConnections);
  const state = useSelector((state: RootState) => state.applicationConnectionDeployer);
  const appConnectionClient = createClient((AppConnectionControllerDefinition), createChannel(BACKEND_API_PREFIX))
  const appConnection = toApplicationConnectionShell(state)
  const [foundNDCs, setNetworkDomainConnections] = useState<ConnectionInformation[]>()
  const dispatch = useDispatch<AppDispatch>();

  const hasResources = (resource?: MatchedResources) => {
    if (!resource) return false
    return (resource.matchedInstances.length || resource.matchedPods.length || resource.matchedServices.length || resource.matchedSubnets.length)
  }
  const findNetworkDomainConnections = async () => {
    const found: ConnectionInformation[] = []
    if (appConnection) {
      for (const connection of NDCs) {
        try {
          appConnection.networkDomainConnection.selector.matchName = connection.metadata?.name ?? "Unknown";
          const { destinationMatched, sourceMatched } = await appConnectionClient.getMatchedResources(appConnection)
          if (hasResources(destinationMatched) && hasResources(sourceMatched)) {
            found.push(connection)
          }
        } catch (error) {
          console.log(`skipping ${connection.metadata?.name}`, error)
        }
      }
    }
    setNetworkDomainConnections(found)
    //dispatch(setNetworkDomainConnectionNames(found.map(({ name }) => name)))
  }
  const onChange = (checkedValues: any[]) => {
    console.log("User selected connections", checkedValues)
    if (checkedValues.includes('all')) {
      checkedValues = ['all'];
    }
    dispatch(setNetworkDomainConnectionNames(checkedValues))
  };

  useEffect(() => {
    findNetworkDomainConnections()
  }, [visible])

  return (
    <Wrapper title={"Network Configuration"} expand>
      <p>Description</p>
      <div className={styles.container}>
        <h2 className={styles.title}>Network Domain Connections</h2>
        {
          foundNDCs !== undefined ? (
            (
              foundNDCs.length > 0 || NDCs.length > 0 ? (
                <Checkbox.Group
                  //defaultValue={[...NDCs.map(({ name }) => name), 'all']}
                  options={[
                    {
                      label: 'All Network Domain Connections [Watch All Network Domain Connections & Auto Connect Resources]',
                      value: 'all',
                    },
                    ...foundNDCs.map(({ id, metadata }) => ({
                      label: `${metadata?.name || 'Unknown'} (${id})`,
                      value: metadata?.name || 'Unknown',
                      checked: true
                    }))
                  ]}
                  onChange={onChange}
                />

              ) : <span>Could not find any existing network domain NDCs to apply this policy to.</span>
            )
          ) : (
            <span>Loading...</span>
          )
        }
      </div>
      <NetworkPolicy />
    </Wrapper>
  );
};