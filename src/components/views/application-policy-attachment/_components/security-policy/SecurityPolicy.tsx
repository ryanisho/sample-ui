/**
 * Copyright (c) 2024 Cisco Systems, Inc. and its affiliates
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
import { HorizontalContainer, Select, Wrapper } from "@/components";
import {
  setAccessControlPolicy,
  setDLPPolicy,
  setGeofencingPolicy,
  setInspectionPolicy,
  setPrivacyPolicy
} from "@/store/application-connection-deployer-slice/applicationConnectionDeployerSlice";
import { useQuery } from "@tanstack/react-query";
import { Security_AccessPolicy, Security_AccessPolicy_AccessProtocol, Security_PolicyMetadata } from "@/_proto/grpc-service/ts/security_policies";
import { SecurityPolicyServiceDefinition } from "@/_proto/grpc-service/ts/security_policy_service";
import { createChannel, createClient } from "nice-grpc-web";
import { AccessPolicyListRequest } from "@/_proto/grpc-service/ts/security_policy_service";
import { BACKEND_API_PREFIX } from "@/common/constants";

export const SecurityPolicy: FC = () => {
  const { accessPolicyData } = useSelector((state: RootState) => state.applicationConnectionDeployer);

  const dispatch = useDispatch<AppDispatch>();

  const setAccessPolicy = (kind: string) => {
    console.log("Setting access policy ", kind)
    dispatch(setAccessControlPolicy(kind));
  };

  // Use React Query to fetch access policies
  const fetchedAccessPolicies = useQuery(["accessPolicies"], async () => {
    const securityPolicyService = createClient(SecurityPolicyServiceDefinition, createChannel(BACKEND_API_PREFIX));
    const response = await securityPolicyService.listAccessPolicies(AccessPolicyListRequest.create({}));
    return response.accessPolicies;
  });

  const accessPolicies = (fetchedAccessPolicies.data || []).map((profile: Security_AccessPolicy) => ({
    value: profile.metadata?.name || '',
    label: profile.metadata?.name || '', // Provide a label for each option
  })) ;

  return (
    <Wrapper title={"Select Security Policy"} expand>
     <p>
      <strong>Access Control Policy:</strong> This policy regulates whether workloads can access specific resources,or services of other workloads, which reduces the risk of unauthorized data breaches or misuse.
      <br />
      <br />
      <strong>Inspection Policy:</strong> Inspection Policies monitor and analyze network traffic for malicious activities, offering real-time threat detection and protection against cyberattacks.
      <br />
      <br />
      <strong>Geofencing Policy:</strong> Geofencing Policies restrict access to certain resources based on the user's physical location, enhancing security by limiting access to authorized regions, thus reducing the risk of data breaches from unauthorized locations.
      <br />
      <br />
      <strong>Privacy Policy:</strong> Privacy Policies define how user data is collected, used, and protected, instilling trust in the end user by safeguarding their personal information and ensuring transparency in data handling practices.
      <br />
      <br />
      <strong>DLP (Data Loss Prevention) Policy:</strong> DLP Policies prevent the unauthorized sharing or leakage of sensitive data, maintaining confidentiality and compliance with data protection regulations, ultimately protecting the end user's data from exposure and misuse.
    </p>

      <HorizontalContainer
        label="Access Control Policy"
        render={<Select
          options={accessPolicies}
          defaultValue={accessPolicyData.accessPolicy.selector.matchName.name}
          onChange={(value: any) => setAccessPolicy(value)}
          allowClear = {false}
          expand
        />}
        flexedItemPlacement="start"
      />
      <HorizontalContainer
        label="Inspection Policy"
        render={<Select
          options={[{ value: "test", label: "test" }]}
          onChange={(value: any) => dispatch(setInspectionPolicy(value))}
          allowClear
        />}
        flexedItemPlacement="start"
      />
      <HorizontalContainer
        label="Geofencing Policy"
        render={<Select
          options={[{ value: "test", label: "test" }]}
          onChange={(value: any) => dispatch(setGeofencingPolicy(value))}
          allowClear
        />}
        flexedItemPlacement="start"
      />
      <HorizontalContainer
        label="Privacy Policy"
        render={<Select
          options={[{ value: "test", label: "test" }]}
          onChange={(value: any) => dispatch(setPrivacyPolicy(value))}
          allowClear
        />}
        flexedItemPlacement="start"
      />
      <HorizontalContainer
        label="DLP Policy"
        render={<Select
          options={[{ value: "test", label: "test" }]}
          onChange={(value: any) => dispatch(setDLPPolicy(value))}
          allowClear
        />}
        flexedItemPlacement="start"
      />
    </Wrapper>
  );
};
