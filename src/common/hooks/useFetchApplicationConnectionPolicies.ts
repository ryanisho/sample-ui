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

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppConnectionPolicy, ListAppConnectionPoliciesRequest } from "@/_proto/grpc-service/ts/app_connection";
import { createChannel, createClient } from "nice-grpc-web";
import { AppConnectionControllerDefinition } from "@/_proto/grpc-service/ts/app_connection_controller";
import {
  setApplicationConnectionPolicies
} from "@/store/application-connection-policies-slice/applicationConnectionPoliciesSlice";
import { BACKEND_API_PREFIX } from "@/common/constants";

const appConnectionClient = createClient(AppConnectionControllerDefinition, createChannel(BACKEND_API_PREFIX))
const request = ListAppConnectionPoliciesRequest.create();

export const useFetchAppConnectionPolicies = () => {
  const [array, setArray] = useState<AppConnectionPolicy[]>([]);
  const dispatch = useDispatch();

  const fetchAppConnectionPolicies = () => {
    setArray(() => [])
    appConnectionClient.listAppConnectionPolicies(request).then(({ appConnectionPolicies }) => {
      setArray((prev) => [...prev, ...appConnectionPolicies]);
    }).catch(error => console.log(error, "Static response"))
  };

  useEffect(() => {
    if (array.length) {
      dispatch(setApplicationConnectionPolicies(array));
    }
  }, [array]);

  return { array, fetchAppConnectionPolicies };
};
