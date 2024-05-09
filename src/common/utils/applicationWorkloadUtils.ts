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

import { EndpointTable } from "@/components/application-connection-info/_components/dynamic-table/schema";
import { Instance, Pod } from "@/_proto/grpc-service/ts/cloud_request";

export const displayInstance = (instance: Instance): { [K in keyof typeof EndpointTable]?: string } => {
  return {
    id: instance.ID,
    name: instance.Name,
    kind: 'VM',
    //provider: '', //TODO: add to API
    publicIP: instance.PublicIP,
    privateIP: instance.PrivateIP,
    'subnet-id': instance.SubnetID,
    'vpc-id': instance.VPCID,
    'state': instance.State,
  }
}

export const displayPod = (pod: Pod): { [K in keyof typeof EndpointTable]?: string } => {
  return {
    name: pod.name,
    //TODO
  }
}

