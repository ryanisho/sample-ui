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

import { useDispatch, useSelector } from "react-redux";

import { Select } from "@/components";

import { AppDispatch, RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { fetchDataClient } from "@/common/utils";
//import { SlaProfile } from "@/components/views/network-domains-connection-creator/_components";
import { SlaProfile } from "@/common/interface";
import { ApiEndpoints } from "@/common/enum";

import styles from "./network-policy.module.scss";
import { setNetworkPolicy } from "@/store/application-connection-deployer-slice/applicationConnectionDeployerSlice";

export const NetworkPolicy = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { networkPolicyData } = useSelector((state: RootState) => state.applicationConnectionDeployer);

  const setNetworkPolicySla = (kind: string) => {
    dispatch(setNetworkPolicy(kind));
  };

  const fetchedSlaProfiles = useQuery({
    queryKey: ["customSlaProfiles"],
    queryFn: () => fetchDataClient(ApiEndpoints.CUSTOM_SLA_PROFILES),
  });

  const slaProfiles = fetchedSlaProfiles.data?.map((profile: SlaProfile) => {
    return {
      value: profile.metadata.name,
    };
  });
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Network Policy For Application Traffic [Optional]</h2> 
      {
        slaProfiles && slaProfiles.length > 0 ? (
          <Select
            options={slaProfiles}
            onChange={setNetworkPolicySla}
            defaultValue={networkPolicyData.networkPolicy.selector.matchName}
            allowClear={false}
            expand
          />
        ) : (
          <span>N/A</span>
        )
      }
    </div>
  )
};
