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

import { InfraResourceType } from "@/common/enum";

export interface AccountId {
  label: string;
  value: string;
}

interface AccountIdsByProvider {
  [key: string]: AccountId[];
}

export const stubAccountIds: AccountIdsByProvider = {
  AWS: [
    { label: "123456789012", value: "123456789012" },
    { label: "234567890123", value: "234567890123" },
    { label: "345678901234", value: "345678901234" },
    { label: "456789012345", value: "456789012345" },
    { label: "567890123456", value: "567890123456" },
    { label: "678901234567", value: "678901234567" },
    { label: "789012345678", value: "789012345678" },
    { label: "890123456789", value: "890123456789" },
    { label: "901234567890", value: "901234567890" },
    { label: "012345678901", value: "012345678901" },
  ],
  GCP: [
    { label: "project-id-12345", value: "project-id-12345" },
    { label: "project-id-23456", value: "project-id-23456" },
    { label: "project-id-34567", value: "project-id-34567" },
    { label: "project-id-45678", value: "project-id-45678" },
    { label: "project-id-56789", value: "project-id-56789" },
    { label: "project-id-67890", value: "project-id-67890" },
    { label: "project-id-78901", value: "project-id-78901" },
    { label: "project-id-89012", value: "project-id-89012" },
    { label: "project-id-90123", value: "project-id-90123" },
    { label: "project-id-01234", value: "project-id-01234" },
  ],
  AZURE: [
    { label: "6b085460-8f56-4cf6-9945-45c830f7ecb2", value: "6b085460-8f56-4cf6-9945-45c830f7ecb2" },
    { label: "7b694482-9f57-5df7-9856-54d938f6edc3", value: "7b694482-9f57-5df7-9856-54d938f6edc3" },
    { label: "8c703494-a058-6ef8-a967-63fa97f7de3b", value: "8c703494-a058-6ef8-a967-63fa97f7de3b" },
    { label: "9d8144a6-b159-7ff9-b768-72gb88f8ee4c", value: "9d8144a6-b159-7ff9-b768-72gb88f8ee4c" },
    { label: "ae9254b8-c25a-80ga-b869-81hc99f9ff5d", value: "ae9254b8-c25a-80ga-b869-81hc99f9ff5d" },
    { label: "bf0364ca-d36b-91hb-c96a-92id0a0a0g6e", value: "bf0364ca-d36b-91hb-c96a-92id0a0a0g6e" },
    { label: "cg1474dc-e47c-a2ic-d07b-a3je1b1b1h7f", value: "cg1474dc-e47c-a2ic-d07b-a3je1b1b1h7f" },
    { label: "dh2584ee-f58d-b3jd-e18c-b4kf2c2c2i8g", value: "dh2584ee-f58d-b3jd-e18c-b4kf2c2c2i8g" },
    { label: "ei3694ff-g69e-c4ke-f29d-c5lg3d3d3j9i", value: "ei3694ff-g69e-c4ke-f29d-c5lg3d3d3j9i" },
    { label: "fj4705gg-h7af-d5lf-g3ae-d6mh4e4e4k0j", value: "fj4705gg-h7af-d5lf-g3ae-d6mh4e4e4k0j" },
  ],
};

export const stubResourceType = [
  { label: InfraResourceType.VMS, value: InfraResourceType.VMS },
  { label: InfraResourceType.CLUSTERS, value: InfraResourceType.CLUSTERS },
  { label: InfraResourceType.SUBNETS, value: InfraResourceType.SUBNETS },
];
