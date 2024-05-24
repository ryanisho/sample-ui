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

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BACKEND_API_PREFIX } from "@/common/constants";

import { setNetworkDomainsConnections } from "@/store/network-domains-connections-slice/networkDomainsConnectionsSlice";
import { ConnectionInformation, ListConnectionsRequest } from "@/_proto/grpc-service/ts/network_domain_connection";
import { createChannel, createClient } from "nice-grpc-web";
import { ConnectionControllerDefinition } from "@/_proto/grpc-service/ts/service_controller";


const connectionClient = createClient(ConnectionControllerDefinition, createChannel(BACKEND_API_PREFIX))
const request = ListConnectionsRequest.create();

export const useFetchNetworkDomainsConnections = () => {
  const [array, setArray] = useState<ConnectionInformation[]>([]);
  const dispatch = useDispatch();

  const fetchConnections = () => {
    console.log("Fetch connections called")
    connectionClient.listConnections(request).then((response) => {
      if (response?.error) {
        console.log(response?.error, "Static response");
      }
      setArray((prev) => [...prev, ...response.connections]);
    });
  };

  useEffect(() => {
    if (array.length) {
      dispatch(setNetworkDomainsConnections(array));
    }
  }, [array]);

  return { array, fetchConnections };
};
