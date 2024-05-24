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

import { FC } from "react";

import { HorizontalContainer, Select, Wrapper } from "@/components";
import { ToEndpoint } from "./endpoint";
import { ToSubnet } from "./subnet";
import { ToNamespace } from "./namespace";

import { toNetworkSettings } from "@/common/constants";
import { NetworkPolicySettingType } from "@/common/enum";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { resetToMatchLabels, setToEntityType } from "@/store/application-connection-slice/applicationConnectionSlice";
import { To } from "@/_proto/grpc-service/ts/app_connection";

export const ToTraffic: FC = () => {
  const { data } = useSelector((state: RootState) => state.applicationConnection);
  const entityType = Object.entries(data.spec.appConnection.to ?? {}).find(([, ob]) => ob != undefined)?.[0] ?? "endpoint"
  const dispatch = useDispatch<AppDispatch>();

  const handleEntityChange = (type: keyof To) => {
    dispatch(setToEntityType(type));
    dispatch(resetToMatchLabels());
  };

  return (
    <Wrapper title={"To"} maxWidth="350px">
      <HorizontalContainer
        //label="Select Setting"
        render={
          <Select onChange={handleEntityChange} options={toNetworkSettings} defaultValue={entityType}
                  allowClear={false}/>
        }
        flexedItemPlacement="start"
      />
      <hr style={{ width: "100%" }} />
      {entityType === NetworkPolicySettingType.ENDPOINT && <ToEndpoint />}
      {entityType === NetworkPolicySettingType.SUBNET && <ToSubnet />}
      {entityType === NetworkPolicySettingType.NAMESPACE && <ToNamespace />}
      {entityType === NetworkPolicySettingType.SGT && <span>To be implemented ...</span>}
      {entityType === NetworkPolicySettingType.USER && <span>To be implemented ...</span>}
      {entityType === NetworkPolicySettingType.SERVICE && <span>To be implemented ...</span>}
      {entityType === NetworkPolicySettingType.CLUSTER && <span>To be implemented ...</span>}
      {entityType === NetworkPolicySettingType.NETWORK_DOMAIN && <span>To be implemented ...</span>}
      {entityType === NetworkPolicySettingType.EXTERNAL_ENTITY && <span>To be implemented ...</span>}
    </Wrapper>
  );
};
