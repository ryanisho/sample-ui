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

import React, { ChangeEvent, FC } from "react";
import { useDispatch } from "react-redux";

import { HorizontalContainer, Input } from "@/components";
import { MatchExpressions, MatchLabels } from "../../settings";

import { AppDispatch } from "@/store/store";
import {
  setFromNamespaceMatchLabels,
  setFromNamespaceMatchName,
  setFromNamespaceMatchExpressions,
} from "@/store/application-connection-slice/applicationConnectionSlice";
import { MatchExpression } from "@/_proto/grpc-service/ts/app_connection";

export const FromNamespace: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleNamespaceMatchNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(setFromNamespaceMatchName(value));
  };

  const setNamespaceMatchLabels = (labels: []) => {
    dispatch(setFromNamespaceMatchLabels(labels));
  };

  const setNamespaceMatchExpressions = (expressions: MatchExpression) => {
    dispatch(setFromNamespaceMatchExpressions(expressions));
  };

  return (
    <article>
      <HorizontalContainer
        label="Match Name"
        render={<Input onChange={handleNamespaceMatchNameChange} />}
        flexedItemPlacement="start"
      />
      <MatchLabels reduxStateUpdateHandler={setNamespaceMatchLabels} />
      <MatchExpressions reduxStateUpdateHandler={setNamespaceMatchExpressions} />
    </article>
  );
};
