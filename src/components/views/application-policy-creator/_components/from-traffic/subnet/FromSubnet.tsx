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

import { ChangeEvent, FC } from "react";

import { MatchExpressions, MatchLabels, MatchPrefix } from "../../settings";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
  setFromSubnetMatchLabels,
  setFromSubnetMatchPrefix,
  setFromSubnetMatchExpressions,
} from "@/store/application-connection-slice/applicationConnectionSlice";
import { MatchExpression } from "@/_proto/grpc-service/ts/app_connection";

export const FromSubnet: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const setSubnetMatchLabels = (labels: []) => {
    dispatch(setFromSubnetMatchLabels(labels));
  };

  const setSubnetMatchExpressions = (expressions: MatchExpression) => {
    dispatch(setFromSubnetMatchExpressions(expressions));
  };

  const handleMatchPrefixChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const arrayOfMatchPrefixes = value.split(",");

    dispatch(setFromSubnetMatchPrefix(arrayOfMatchPrefixes));
  };

  return (
    <article>
      <MatchLabels reduxStateUpdateHandler={setSubnetMatchLabels} />
      <MatchPrefix handleMatchPrefixChange={handleMatchPrefixChange} />
      <MatchExpressions reduxStateUpdateHandler={setSubnetMatchExpressions} />
    </article>
  );
};
