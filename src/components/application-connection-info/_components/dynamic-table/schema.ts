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

export type ColumnList = { Header: string; accessor: string }[]

export const EndpointTable = {
  id: 'Id',
  name: 'Name',
  kind: 'Kind',
  //provider: 'Provider',
  publicIP: 'Public IP',
  privateIP: 'Private IP',
  'subnet-id': 'Subnet ID',
  'vpc-id': 'VPC ID',
  state: 'State'
} as const

export const SubnetTable = {
  id: 'Subnet ID',
  cidr: 'CIDR Block',
  vpcid: 'VPC ID',
  provider: 'Provider',
  az: 'Availability Zone',
  rtid: 'Route Table',
  state: 'State'
} as const

export const NamespaceTable = {
  name: 'Name',
  labels: 'Labels',
  status: 'Status',
  cluster: 'Cluster'
} as const

export const ClusterTable = {
  name: 'Cluster Name',
  id: 'Cluster ID',
  state: 'State'
} as const

export const ExternalEntityTable = {
  url: 'URL',
  acp: 'Access Policy'
} as const

export const ServiceTable = {
  id: 'Service Name',
  kind: 'Service Type',
  port: 'Service Port',
  ip: 'Service IP',
  status: 'Status'

} as const
export const NetworkDomainTable = {
  name: 'Network Domain Name',
  id: 'Network Domain Id',
  type: 'Network Domain Type',
  port: 'Provider',
  ip: 'Ip Address Space',
} as const

export const SgtTable = {
  name: 'SGT Name',
  id: 'SGT ID',
  access_policy: 'ISE Access Policy'
} as const

export const UserTable = {
  name: 'User Name',
  id: 'User Id',
  access_policy: 'User Access Policy'
} as const

export const SCHEMAS = {
  'Endpoint': columnsForTable(EndpointTable),
  'Subnet': columnsForTable(SubnetTable),
  'Namespace': columnsForTable(NamespaceTable),
  'Cluster': columnsForTable(ClusterTable),
  'ExternalEntity': columnsForTable(ExternalEntityTable),
  'Service': columnsForTable(ServiceTable),
  'NetworkDomain': columnsForTable(NetworkDomainTable),
  'Sgt': columnsForTable(SgtTable),
  'User': columnsForTable(UserTable)
}

function columnsForTable(table: object): ColumnList {
  return Object.entries(table).map(([accessor, Header]) => ({
    Header,
    accessor
  }));
}