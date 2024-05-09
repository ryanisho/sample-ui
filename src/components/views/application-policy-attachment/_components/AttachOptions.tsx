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

import React, { FC, useEffect, useState } from 'react';
import { appConnectionInject, stringOfYAML } from "@/components/views/application-policy-creator";
import { saveAs } from "file-saver";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { createChannel, createClient } from "nice-grpc-web";
import { AppConnectionControllerDefinition } from "@/_proto/grpc-service/ts/app_connection_controller";
import { AppConnectionData, AppConnectionResources } from "@/components/application-connection-info";
import { BottomDrawerButton } from "@/components";
import {
  toApplicationConnection
} from "@/store/application-connection-deployer-slice/applicationConnectionDeployerSlice";
import { useFetchAppConnectionPolicies } from "@/common/hooks";
import { YAMLSideDrawer } from "@/components/common/yaml-side-drawer";
import { BACKEND_API_PREFIX } from "@/common/constants";

export const AttachOptions: FC = () => {
  const state = useSelector((state: RootState) => state.applicationConnectionDeployer);
  const [connectionResources, setConnectionResources] = useState<AppConnectionData>({})
  const appConnectionClient = createClient((AppConnectionControllerDefinition), createChannel(BACKEND_API_PREFIX))
  const appConnection = toApplicationConnection(state)[0]
  const [drawerOpen, setDrawerOpen] = useState(false)
  const disableButton = !state.policy

  const { fetchAppConnectionPolicies } = useFetchAppConnectionPolicies()

  useEffect(() => {
    fetchAppConnectionPolicies();
  }, []);

  const handleMatchedResources = () => {
    setConnectionResources({})

    if (appConnection) {
      appConnectionClient.getMatchedResources(appConnection).then(response => {
        setConnectionResources({
          config: appConnection,
          from: response.sourceMatched,
          to: response.destinationMatched
        })
      }).catch(error => console.log(error, "Static response")
      )
    }
  }


  const buttonRowStyle = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "30px"
  };

  const buttonStyle = {
    // Button styles here
    padding: "10px 20px",
    backgroundColor: "DarkGray",
    color: "white",
    borderRadius: "5px",
  };

  const handleDeploy = () => {
    if (appConnection) appConnectionClient.connectApps(appConnection).then(response => {
      if (response?.error) {
        console.log(response?.error, "Static response");
      }
      console.log(response);
    }).catch(error => console.log(error, "Static response"))
  };

  const handleDownload = () => {
    const blob = new Blob([stringOfYAML(appConnectionInject(appConnection))], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "application-connection.yaml");
  };

  return (
    <>
      <section>
        <div style={buttonRowStyle}>
          <BottomDrawerButton
            drawerButtonText="View Matched Resources"
            title="Matched Resources"
            closable={true}
            handleOpenDrawer={handleMatchedResources}
            disabled={disableButton}
          >
            <AppConnectionResources {...connectionResources}/>
          </BottomDrawerButton>
          <button style={buttonStyle} onClick={handleDeploy} disabled={disableButton}>
            Deploy
          </button>
          <button style={buttonStyle} onClick={handleDownload} disabled={disableButton}>
            Download
          </button>
          <button style={buttonStyle} onClick={() => setDrawerOpen(true)} disabled={disableButton}>
            View YAML
          </button>
        </div>
      </section>
      <YAMLSideDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}
                      yamlSource={appConnectionInject(appConnection)} width={"30%"}/>
    </>
  );
}