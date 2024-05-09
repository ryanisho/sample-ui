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

import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/store/store";

import {
  setLoggingPolicy,
  setMonitoringPolicy
} from "@/store/application-connection-deployer-slice/applicationConnectionDeployerSlice";
import { HorizontalContainer, Select, Wrapper } from "@/components";
import { ApiEndpoints } from "@/common/enum";
import { fetchDataClient } from "@/common/utils";
import { useQuery } from "@tanstack/react-query";
import { ConnectionMonitoringPolicy } from "@/common/interface/monitoringPolicy.model";


export const ObservabilityPolicy: FC = () => {
  //const { observability } = useSelector((state: RootState) => state.applicationConnectionDeployer);

  const dispatch = useDispatch<AppDispatch>();
  const fetchedMonitoringPolicies = useQuery({
    queryKey: ["customObservabilityProfiles"],
    queryFn: () => fetchDataClient(ApiEndpoints.MONITORING_POLICIES),
  });

  const observabilityPolicies = fetchedMonitoringPolicies.data?.map((profile: ConnectionMonitoringPolicy) => {
    return {
      value: profile.metadata.name,
    };
  })
// Define the HTML content as a string
const htmlContent = `
<p>
  <strong>Monitoring Policy:</strong> This policy involves continuous observation of network activities and systems to detect unusual behavior or security threats, providing early warning and enhanced security for the end user.
  <br><br>
  <strong>Logging Policy:</strong> Logging Policies specify what events and activities should be recorded in system logs, helping to track and investigate security incidents, which ensures accountability and aids in incident response for the end user.
</p>
`;
  return (
    <Wrapper title={"Select Observability Policy"} expand>
   
    {/* Render the HTML content using dangerouslySetInnerHTML */}
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />


      <HorizontalContainer
        label="logging-policy"
        render={<Select
          options={observabilityPolicies}
          onChange={(value: any) => dispatch(setLoggingPolicy(value))}
          allowClear
        />}
        flexedItemPlacement="start"
      />
      <HorizontalContainer
        label="monitoring-policy"
        render={<Select
          options={observabilityPolicies}
          onChange={(value: any) => dispatch(setMonitoringPolicy(value))}
          allowClear
        />}
        flexedItemPlacement="start"
      />
    </Wrapper>
  );
};
