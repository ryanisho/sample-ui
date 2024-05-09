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

export const networkDomainSchema = {
  grpcServer: [
    { label: "name", value: "name" },
    { label: "Network Domain ID", value: "id" },
    { label: "type", value: "type" },
    { label: "provider", value: "provider" },
    { label: "site ID", value: "site_id" },
  ],
  stubServer: [
    { label: "name", value: "metadata.name" },
    { label: "Network Domain ID", value: "id" },
    { label: "type", value: "type" },
    { label: "provider", value: "provider" },
    { label: "site ID", value: "site_id" },
  ],
};

export const staticNetworkDomainIds = [
  { label: "vpc-1", value: "vpc-1" },
  { label: "vpc-12", value: "vpc-12" },
  { label: "vpc-13", value: "vpc-13" },
  { label: "vpc-134", value: "vpc-134" },
  { label: "vpc-134-1", value: "vpc-134-1" },
  { label: "vpc-134-2", value: "vpc-134-2" },
  { label: "vpc-134-3", value: "vpc-134-3" },
];

export const networkDomainTypes = [
  { label: "VPC", value: "vpc" },
  { label: "VRF", value: "vrf" },
  { label: "VLAN", value: "vlan" },
];
