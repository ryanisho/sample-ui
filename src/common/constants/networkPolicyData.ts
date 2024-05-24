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

import { NetworkPolicySettingType } from "@/common/enum";

// TODO: change labels to enums
export const fromNetworkSettings = [
  { label: "endpoint", value: NetworkPolicySettingType.ENDPOINT },
  { label: "subnet", value: NetworkPolicySettingType.SUBNET },
  { label: "namespace", value: NetworkPolicySettingType.NAMESPACE },
  { label: "SGT", value: NetworkPolicySettingType.SGT },
  { label: "USER", value: NetworkPolicySettingType.USER },
  { label: "cluster", value: NetworkPolicySettingType.CLUSTER },
  { label: "network-domain", value: NetworkPolicySettingType.NETWORK_DOMAIN },
];

export const toNetworkSettings = [
  { label: "endpoint", value: NetworkPolicySettingType.ENDPOINT },
  { label: "subnet", value: NetworkPolicySettingType.SUBNET },
  { label: "namespace", value: NetworkPolicySettingType.NAMESPACE },
  { label: "SGT", value: NetworkPolicySettingType.SGT },
  { label: "USER", value: NetworkPolicySettingType.USER },
  { label: "service", value: NetworkPolicySettingType.SERVICE },
  { label: "network-domain", value: NetworkPolicySettingType.NETWORK_DOMAIN },
  { label: "cluster", value: NetworkPolicySettingType.CLUSTER },
  { label: "external-entity", value: NetworkPolicySettingType.EXTERNAL_ENTITY },
];

export const fromToEndpointKinds = [
  { label: "vm", value: "vm" },
  { label: "container", value: "container" },
  { label: "pod", value: "pod" },
];

export const accessTypeValues = [
  { label: "allow", value: "allow" },
  { label: "deny", value: "deny" },
  { label: "allow with inspection", value: "allow-with-inspection" },
  { label: "allow with logging", value: "allow-with-logging" },
];

export const protocolOptions = [
  {
    label: "TCP",
    value: "TCP",
  },
  {
    label: "HTTP",
    value: "HTTP",
  },
  {
    label: "UDP",
    value: "UDP",
  },
  {
    label: "RTP",
    value: "RTP",
  },
  {
    label: "HTTPS",
    value: "HTTPS",
  },
  {
    label: "FTP",
    value: "FTP",
  },
  {
    label: "SSH",
    value: "SSH",
  },
  {
    label: "SMTP",
    value: "SMTP",
  },
  {
    label: "IMAP",
    value: "IMAP",
  },
  {
    label: "POP3",
    value: "POP3",
  },
  {
    label: "ICMP",
    value: "ICMP",
  },
];
