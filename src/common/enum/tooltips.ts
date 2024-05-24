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

export enum Tooltips {
  NETWORK_DOMAIN = "A network domain could be a VPC or VRF. Exists behind a router.",
  SITE_ID = "What's the site / location id that you need connectivity from ?",
  ALLOW_ALL = "Allow all traffic through this network domain connection ?",
  SLA_TYPE = "Select the SLA Type:\nSoft - Best Effort by Network and does not guarantee requested parameters.\n Hard - Guaranteed SLA.",
  MATCH_PREFIX = "Provide values separated by a comma.",
  MATCH_EXPRESSIONS = 'Eg. {key: environment, operator: In, values: ["production", "staging"]} \n {key: environment, operator: NotIn, values: ["sandbox"]}',
  ACCOUNT_ID = "Use this to list all network domains of the selected account.",
  REGION = "Filter network domains based on region",
  RESOURCE_TYPE = "You need to select a domain first in order to pick a resource type.",
  CLUSTERS_RESOURCES = "Available only for clusters resource type. You need to select a cluster first in order to pick a sub-resource type.",
}
