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

const getData = async (tableType) => {
  // Simulating an asynchronous API call to fetch data
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = generateTableData(tableType);
      resolve(data);
    }, 1000); // Simulating a delay of 1 second
  });
};

// Fetch Data here .  
const generateTableData = (tableType) => {
  // Generate or fetch the data for the specified table type
  // Here, we are generating dummy data for demonstration purposes
  if (tableType === 'Endpoint') {
    
    return [
  {
    id: 'endpoint-1',
    name: 'Stratus Endpoint',
    kind: 'vm',
    provider: 'AWS',
    publicIP: '3.101.37.7',
    privateIP: '172.31.0.101',
    'subnet-id': 'subnet-06d70c8c',
    'vpc-id': 'vpc-0d4f7a4a',
    state: 'active',
  },
  {
    id: 'endpoint-2',
    name: 'Nimbus Endpoint',
    kind: 'pod',
    provider: 'Google Cloud',
    publicIP: '34.86.112.38',
    privateIP: '10.142.0.2',
    'subnet-id': 'subnet-03d3e375',
    'vpc-id': 'vpc-0c55b4a7',
    state: 'active',
  },
  {
    id: 'endpoint-3',
    name: 'Cumulus Endpoint',
    kind: 'container',
    provider: 'Azure',
    publicIP: '52.183.28.168',
    privateIP: '10.0.0.4',
    'subnet-id': 'subnet-07d3d7b2',
    'vpc-id': 'vpc-0d3f4b5a',
    state: 'active',
  },
  {
    id: 'endpoint-4',
    name: 'Cirrus Endpoint',
    kind: 'vm',
    provider: 'IBM Cloud',
    publicIP: '169.48.113.201',
    privateIP: '10.240.0.5',
    'subnet-id': 'subnet-0dd3d7b3',
    'vpc-id': 'vpc-0f3b5c6a',
    state: 'active',
  },
  {
    id: 'endpoint-5',
    name: 'Alto Endpoint',
    kind: 'pod',
    provider: 'Oracle Cloud',
    publicIP: '129.213.114.154',
    privateIP: '10.0.1.6',
    'subnet-id': 'subnet-0bd3d7c4',
    'vpc-id': 'vpc-0e3b5c7a',
    state: 'active',
  },
  {
    id: 'endpoint-6',
    name: 'Mistral Endpoint',
    kind: 'container',
    provider: 'AWS',
    publicIP: '13.211.223.84',
    privateIP: '172.31.1.7',
    'subnet-id': 'subnet-05d3d8d5',
    'vpc-id': 'vpc-0a4b5c8b',
    state: 'active',
  },
  {
    id: 'endpoint-7',
    name: 'Sirocco Endpoint',
    kind: 'vm',
    provider: 'Google Cloud',
    publicIP: '35.196.26.154',
    privateIP: '10.142.0.8',
    'subnet-id': 'subnet-03d3e485',
    'vpc-id': 'vpc-0c5b6a8b',
    state: 'active',
  },
  {
    id: 'endpoint-8',
    name: 'Zephyr Endpoint',
    kind: 'pod',
    provider: 'Azure',
    publicIP: '40.83.179.85',
    privateIP: '10.0.1.9',
    'subnet-id': 'subnet-07d3d8f6',
    'vpc-id': 'vpc-0d5b7a9c',
    state: 'active',
  },

]
  }

  if (tableType === 'Subnet') {
    return [
      { id: 'subnet-01', cidr: '192.168.1.0/24', vpcid: 'vpc-01', provider: 'AWS', az: 'us-west-2a', rtid: 'rtb-01', state: 'Active' },
      { id: 'subnet-02', cidr: '10.0.1.0/24', vpcid: 'vnet-02', provider: 'Azure', az: 'eastus2', rtid: 'rtb-02', state: 'Active' },
      { id: 'subnet-03', cidr: '10.142.0.0/20', vpcid: 'vpc-03', provider: 'Google Cloud', az: 'us-central1-a', rtid: 'rtb-03', state: 'Active' },
      { id: 'subnet-04', cidr: '10.0.0.0/16', vpcid: 'vcn-04', provider: 'Oracle Cloud', az: 'us-phoenix-1', rtid: 'rtb-04', state: 'Active' },
      { id: 'subnet-05', cidr: '172.16.0.0/16', vpcid: 'vpc-05', provider: 'IBM Cloud', az: 'us-south-1', rtid: 'rtb-05', state: 'Active' },
      { id: 'subnet-06', cidr: '192.168.2.0/24', vpcid: 'vpc-06', provider: 'AWS', az: 'us-east-2b', rtid: 'rtb-06', state: 'Active' },
      { id: 'subnet-07', cidr: '10.1.0.0/20', vpcid: 'vnet-07', provider: 'Azure', az: 'westus2', rtid: 'rtb-07', state: 'Active' },
      { id: 'subnet-08', cidr: '10.142.1.0/20', vpcid: 'vpc-08', provider: 'Google Cloud', az: 'europe-west1-b', rtid: 'rtb-08', state: 'Active' },
      { id: 'subnet-09', cidr: '10.0.1.0/16', vpcid: 'vcn-09', provider: 'Oracle Cloud', az: 'us-ashburn-1', rtid: 'rtb-09', state: 'Active' },
      { id: 'subnet-10', cidr: '172.16.1.0/16', vpcid: 'vpc-10', provider: 'IBM Cloud', az: 'us-east-1', rtid: 'rtb-10', state: 'Active' }
    ] ;
  }
  if (tableType === 'Namespace') {
    return [
      {
        name : 'User Namespace', labels: 'type:user', status: 'available', cluster: "arn:aws:eks:us-west-2:229451923406:cluster/ml-training-cluster",

      },
      {
        name : 'Root Namespace', labels: 'type:root', status: 'available', cluster: "arn:aws:eks:us-west-2:229451923406:cluster/awi-test"

      },
      {
        name : 'Infra Namespace', labels: 'type:infra', status: 'available', cluster: "arn:aws:eks:us-west-2:229451923406:cluster/ml-dataset-cluster"

      }
    ]
  }
  return [];
};

export { getData };