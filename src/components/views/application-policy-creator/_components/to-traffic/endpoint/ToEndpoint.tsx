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

import { ChangeEvent, FC } from "react";
import { useDispatch } from "react-redux";

import { HorizontalContainer, Input, Select } from "@/components";
import { MatchExpressions, MatchLabels } from "../../settings";

import {
  setToEndpointType,
  setToEndpointName,
  setToEndpointMatchLabels,
  setToEndpointMatchExpressions,
} from "@/store/application-connection-slice/applicationConnectionSlice";
import { AppDispatch } from "@/store/store";
import { fromToEndpointKinds } from "@/common/constants";
import { MatchExpression } from "@/_proto/grpc-service/ts/app_connection";

export const ToEndpoint: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const setEndpointKind = (kind: string) => {
    dispatch(setToEndpointType(kind));
  };

  const handleEndpointNameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(setToEndpointName(value));
  };

  const setEndpointMatchLabels = (label: []) => {
    dispatch(setToEndpointMatchLabels(label));
  };

  const setEndpointMatchExpressions = (expressions: MatchExpression) => {
    dispatch(setToEndpointMatchExpressions(expressions));
  };

  return (
    <article>
      <div style={{ marginBottom: '44px' }}>
      <HorizontalContainer
        label="Type"
        render={<Select options={fromToEndpointKinds} onChange={setEndpointKind} />}
        flexedItemPlacement="start"
      />
      </div>
     
      <div style={{ marginBottom: '44px' }}>
      <MatchLabels reduxStateUpdateHandler={setEndpointMatchLabels} />
      </div>
      <MatchExpressions reduxStateUpdateHandler={setEndpointMatchExpressions} />
    </article>
  );
};

// <HorizontalContainer
//label="Match Name"
//render={<Input onChange={handleEndpointNameInputChange} />}
//flexedItemPlacement="start"
///>