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

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { ApplicationConnection, FullyDefined, } from "@/common/interface";
import { From, MatchExpression, To } from "@/_proto/grpc-service/ts/app_connection";

interface Inject {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
    namespace: string;
  };
}

interface Data extends Inject {
  spec: {
    appConnection: ApplicationConnection
  }
}

interface State {
  data: Data
}

type NestWithRemaining<T> = {
  [K in keyof T]: { [P in K]: T[K] } & { [Q in Exclude<keyof T, K>]: undefined };
}

//hack to ensure externalEntities are []
type NestWithRemainingExcept<T, E extends keyof T> = {
  [K in keyof T]: { [P in K]: T[K] } & { [Q in Exclude<keyof T, K>]: Q extends E ? [] : undefined };
};

const defaultFromEntityStates: NestWithRemaining<FullyDefined<From>> = {
  endpoint: {
    endpoint: {
      kind: "",
      selector: {
        matchLabels: {},
        matchExpressions: [],
        matchCluster: { name: "" },
        matchName: { name: "" },
        matchNamespace: { name: "" }
      },
    },
    subnet: undefined,
    namespace: undefined,
    SGT: undefined,
    cluster: undefined,
    networkDomain: undefined,
  },
  subnet: {
    subnet: {
      selector: {
        matchLabels: {},
        matchPrefix: [],
        matchExpressions: [],
      },
    },
    endpoint: undefined,
    namespace: undefined,
    SGT: undefined,
    cluster: undefined,
    networkDomain: undefined,
  },
  namespace: {
    namespace: {
      selector: {
        matchName: "",
        matchLabels: {},
        matchExpressions: [],
      },
    },
    endpoint: undefined,
    subnet: undefined,
    SGT: undefined,
    cluster: undefined,
    networkDomain: undefined,
  },
  SGT: {
    SGT: { name: "", },
    endpoint: undefined,
    subnet: undefined,
    namespace: undefined,
    cluster: undefined,
    networkDomain: undefined,
  },
  cluster: {
    cluster: {
      selector: {
        matchName: { name: "", },
        matchLabels: {}
      },
    },
    endpoint: undefined,
    subnet: undefined,
    namespace: undefined,
    SGT: undefined,
    networkDomain: undefined,
  },
  networkDomain: {
    networkDomain: {
      Kind: "",
      selector: {
        matchName: { name: "", },
        matchID: { id: "", },
        matchLabels: {},
        matchOwner: {
          owner: ""
        },
      },
    },
    endpoint: undefined,
    subnet: undefined,
    namespace: undefined,
    SGT: undefined,
    cluster: undefined,
  },
};

const defaultToEntityStates: NestWithRemainingExcept<FullyDefined<To>, "externalEntities"> = {
  endpoint: {
    endpoint: {
      kind: "",
      selector: {
        matchLabels: {},
        matchExpressions: [],
        matchCluster: { name: "" },
        matchName: { name: "" },
        matchNamespace: { name: "" }
      },
    },
    subnet: undefined,
    namespace: undefined,
    cluster: undefined,
    networkDomain: undefined,
    externalEntities: [],
    service: undefined
  },
  subnet: {
    subnet: {
      selector: {
        matchLabels: {},
        matchPrefix: [],
        matchExpressions: [],
      },
    },
    endpoint: undefined,
    namespace: undefined,
    cluster: undefined,
    networkDomain: undefined,
    externalEntities: [],
    service: undefined
  },
  namespace: {
    namespace: {
      selector: {
        matchName: "",
        matchLabels: {},
        matchExpressions: [],
      },
    },
    endpoint: undefined,
    subnet: undefined,
    cluster: undefined,
    networkDomain: undefined,
    externalEntities: [],
    service: undefined
  },
  cluster: {
    cluster: {
      selector: {
        matchName: { name: "", },
        matchLabels: {}
      },
    },
    endpoint: undefined,
    subnet: undefined,
    namespace: undefined,
    networkDomain: undefined,
    externalEntities: [],
    service: undefined
  },
  networkDomain: {
    networkDomain: {
      Kind: "",
      selector: {
        matchName: { name: "", },
        matchID: { id: "", },
        matchLabels: {},
        matchOwner: { owner: "" },
      },
    },
    endpoint: undefined,
    subnet: undefined,
    namespace: undefined,
    cluster: undefined,
    externalEntities: [],
    service: undefined
  },
  service: {
    service: {
      kind: {
        k8sService: { serviceType: "" },
        vmService: { serviceType: "" }
      },
      selector: {
        matchLabels: {},
        matchExpressions: [],
        matchCluster: { name: "" },
        matchName: { name: "" },
        matchNamespace: { name: "" },
        matchHost: { ip: "" }
      }
    },
    endpoint: undefined,
    subnet: undefined,
    namespace: undefined,
    cluster: undefined,
    networkDomain: undefined,
    externalEntities: [],
  },
  externalEntities: {
    externalEntities: ["https://example1.com:8080/example1", "tcp://example1.com:8080"],
    endpoint: undefined,
    subnet: undefined,
    namespace: undefined,
    cluster: undefined,
    networkDomain: undefined,
    service: undefined
  },
};

export const DefaultInject: Inject = {
  apiVersion: "awi.app-net-interface.io/v1alpha1",
  kind: "InterNetworkDomainAppConnection",
  metadata: {
    name: "app-connectivity-across-clusters",
    namespace: "inter-cluster-appsec",
  },
}

const initialState: State = {
  data: {
    ...DefaultInject,
    spec: {
      appConnection: {
        controller: "Cisco vManage",
        metadata: {
          name: "app-connectivity-across-clusters",
          creationTimestamp: "",
          modificationTimestamp: "",
          description: "Connect pods,vms, and services across two network domains",
          label: {},
        },
        from: defaultFromEntityStates.endpoint,
        to: defaultToEntityStates.endpoint,
        networkDomainConnection: {
          selector: {
            matchName: "",
          },
        },
        accessPolicy: {
          selector: {
            matchName: {
              name : "",
            },
            matchId: {
              id : "",
            },
            matchLabels: {}
            },
        },
        networkPolicy: {
          selector: {
            matchName: "",
          },
        },
      },
    },
  },
};

export const applicationConnectionSlice = createSlice({
  name: "applicationConnection",
  initialState,
  reducers: {
    reset: () => initialState,
    setApplicationConnection: (state: State, action: PayloadAction<ApplicationConnection>) => {
      state.data.spec.appConnection = action.payload
    },
    setApplicationConnectionName: (state: State, action: PayloadAction<string>) => {
      const applicationName = state.data.metadata;
      if (applicationName) {
        applicationName.name = action.payload;
      }
      const applicationConnection = state.data.spec.appConnection;
      if (applicationConnection) {
        applicationConnection.metadata.name = action.payload;
      }
    },
    setNetworkDomainConnectionName: (state: State, action: PayloadAction<string>) => {
      const applicationName = state.data.spec.appConnection;
      if (applicationName) {
        applicationName.networkDomainConnection.selector.matchName = action.payload;
      }
    },
    //setNetworkAccessControl: (state: State, action: PayloadAction<any>) => {
      //const accessPolicy = state.data.spec.appConnection.accessPolicy.selector.matchName.name;
      //if (accessPolicy) {
      //  accessPolicy = [...accessPolicy.networkAccessControl, action.payload];
      //}
    //},
    setApplicationConnectionDescription: (state: State, action: PayloadAction<string>) => {
      const applicationConnection = state.data.spec.appConnection;
      if (applicationConnection) {
        applicationConnection.metadata.description = action.payload;
      }
    },
    setAccessType: (state: State, action: PayloadAction<string>) => {
      const applicationConnection = state.data.spec.appConnection;
      if (applicationConnection) {
        //applicationConnection.accessPolicy.selector. = action.payload;
      }
    },
    setNetworkPolicy: (state: State, action: PayloadAction<string>) => {
      const applicationConnection = state.data.spec.appConnection;
      if (applicationConnection) {
        applicationConnection.networkPolicy.selector.matchName = action.payload;
      }
    },
    setAccessPolicy: (state: State, action: PayloadAction<string>) => {
      const applicationConnection = state.data.spec.appConnection;
      if (applicationConnection) {
        applicationConnection.accessPolicy.selector.matchName.name = action.payload;
      }
    },
    setFromEntityType: (state: State, action: PayloadAction<keyof From>) => {
      state.data.spec.appConnection.from = defaultFromEntityStates[action.payload]
    },
    setFromEndpointType: (state: State, action: PayloadAction<string>) => {
      const fromEndpoint = state.data.spec.appConnection.from?.endpoint;
      if (fromEndpoint) {
        fromEndpoint.kind = action.payload;
      }
    },
    setFromEndpointMatchLabels: (state: State, action: PayloadAction<any>) => {
      const fromEndpoint = state.data.spec.appConnection.from?.endpoint;
      if (fromEndpoint?.selector) {
        fromEndpoint.selector.matchLabels = { ...fromEndpoint.selector.matchLabels, ...action.payload };
      }
    },
    setFromEndpointMatchExpressions: (state: State, action: PayloadAction<MatchExpression>) => {
      const fromEndpoint = state.data.spec.appConnection.from?.endpoint;
      if (fromEndpoint?.selector) {
        fromEndpoint.selector.matchExpressions = [...fromEndpoint.selector.matchExpressions, action.payload];
      }
    },
    setFromSubnetMatchExpressions: (state: State, action: PayloadAction<MatchExpression>) => {
      const fromSubnet = state.data.spec.appConnection.from?.subnet;
      if (fromSubnet?.selector) {
        fromSubnet.selector.matchExpressions = [...fromSubnet.selector.matchExpressions, action.payload];
      }
    },
    setFromNamespaceMatchExpressions: (state: State, action: PayloadAction<MatchExpression>) => {
      const fromNamespace = state.data.spec.appConnection.from?.namespace;
      if (fromNamespace?.selector) {
        fromNamespace.selector.matchExpressions = [...fromNamespace.selector.matchExpressions, action.payload];
      }
    },
    setFromSubnetMatchLabels: (state: State, action: PayloadAction<any>) => {
      const fromSubnet = state.data.spec.appConnection.from?.subnet;
      if (fromSubnet?.selector) {
        fromSubnet.selector.matchLabels = { ...fromSubnet.selector.matchLabels, ...action.payload };
      }
    },
    setFromSubnetMatchPrefix: (state: State, action: PayloadAction<string[]>) => {
      const fromSubnet = state.data.spec.appConnection.from?.subnet;
      if (fromSubnet?.selector) {
        fromSubnet.selector.matchPrefix = [...action.payload];
      }
    },
    setToSubnetMatchPrefix: (state: State, action: PayloadAction<string[]>) => {
      const toSubnet = state.data.spec.appConnection.to?.subnet;
      if (toSubnet?.selector) {
        toSubnet.selector.matchPrefix = [...action.payload];
      }
    },
    setFromNamespaceMatchLabels: (state: State, action: PayloadAction<any>) => {
      const fromNamespace = state.data.spec.appConnection.from?.namespace;
      if (fromNamespace?.selector) {
        fromNamespace.selector.matchLabels = { ...fromNamespace.selector.matchLabels, ...action.payload };
      }
    },
    setFromNamespaceMatchName: (state: State, action: PayloadAction<string>) => {
      const fromNamespace = state.data.spec.appConnection.from?.namespace;
      if (fromNamespace?.selector) {
        fromNamespace.selector.matchName = action.payload;
      }
    },
    setToEntityType: (state: State, action: PayloadAction<keyof To>) => {
      state.data.spec.appConnection.to = defaultToEntityStates[action.payload];
    },
    setToEndpointType: (state: State, action: PayloadAction<string>) => {
      const toEndpoint = state.data.spec.appConnection.to?.endpoint;
      if (toEndpoint) {
        toEndpoint.kind = action.payload;
      }
    },
    setToEndpointName: (state: State, action: PayloadAction<string>) => {
      const toEndpoint = state.data.spec.appConnection.to?.endpoint;
      if (toEndpoint?.selector?.matchName) {
        toEndpoint.selector.matchName.name = action.payload;
      }
    },
    setToEndpointMatchLabels: (state: State, action: PayloadAction<any>) => {
      const toEndpoint = state.data.spec.appConnection.to?.endpoint;
      if (toEndpoint?.selector) {
        toEndpoint.selector.matchLabels = { ...toEndpoint.selector.matchLabels, ...action.payload };
      }
    },
    setToSubnetMatchLabels: (state: State, action: PayloadAction<any>) => {
      const toSubnet = state.data.spec.appConnection.to?.subnet;
      if (toSubnet?.selector) {
        toSubnet.selector.matchLabels = { ...toSubnet.selector.matchLabels, ...action.payload };
      }
    },
    setToNamespaceMatchLabels: (state: State, action: PayloadAction<any>) => {
      const toNamespace = state.data.spec.appConnection.to?.namespace;
      if (toNamespace?.selector) {
        toNamespace.selector.matchLabels = { ...toNamespace.selector.matchLabels, ...action.payload };
      }
    },
    setToEndpointMatchExpressions: (state: State, action: PayloadAction<MatchExpression>) => {
      const toEndpoint = state.data.spec.appConnection.to?.endpoint;
      if (toEndpoint?.selector) {
        toEndpoint.selector.matchExpressions = [...toEndpoint.selector.matchExpressions, action.payload];
      }
    },
    setToSubnetMatchExpressions: (state: State, action: PayloadAction<MatchExpression>) => {
      const toSubnet = state.data.spec.appConnection.to?.subnet;
      if (toSubnet?.selector) {
        toSubnet.selector.matchExpressions = [...toSubnet.selector.matchExpressions, action.payload];
      }
    },
    setToNamespaceMatchExpressions: (state: State, action: PayloadAction<MatchExpression>) => {
      const toNamespace = state.data.spec.appConnection.to?.namespace;
      if (toNamespace?.selector) {
        toNamespace.selector.matchExpressions = [...toNamespace.selector.matchExpressions, action.payload];
      }
    },
    resetFromMatchLabels: (state: State) => {
      const fromEndpoint = state.data.spec.appConnection.from?.endpoint;
      const fromSubnet = state.data.spec.appConnection.from?.subnet;
      const fromNamespace = state.data.spec.appConnection.from?.namespace;
      if (fromSubnet?.selector) {
        fromSubnet.selector.matchLabels = {};
      }
      if (fromEndpoint?.selector) {
        fromEndpoint.selector.matchLabels = {};
      }
      if (fromNamespace?.selector) {
        fromNamespace.selector.matchLabels = {};
      }
    },
    resetToMatchLabels: (state: State) => {
      const toEndpoint = state.data.spec.appConnection.to?.endpoint;
      const toSubnet = state.data.spec.appConnection.to?.subnet;
      const toNamespace = state.data.spec.appConnection.to?.namespace;
      if (toSubnet?.selector) {
        toSubnet.selector.matchLabels = {};
      }
      if (toEndpoint?.selector) {
        toEndpoint.selector.matchLabels = {};
      }
      if (toNamespace?.selector) {
        toNamespace.selector.matchLabels = {};
      }
    },
    setToNamespaceMatchName: (state: State, action: PayloadAction<string>) => {
      const toNamespace = state.data.spec.appConnection.to?.namespace;
      if (toNamespace?.selector) {
        toNamespace.selector.matchName = action.payload;
      }
    },
    setMetadataLabels: (state: State, action: PayloadAction<any>) => {
      const metadata = state.data.spec.appConnection.metadata;
      if (metadata) {
        metadata.label = { ...metadata.label, ...action.payload };
      }
    },
  },
});

export const {
  setApplicationConnection,
  setToEndpointMatchExpressions,
  setApplicationConnectionDescription,
  //setAccessType,
  //setNetworkAccessControl,
  setApplicationConnectionName,
  setToNamespaceMatchExpressions,
  setToSubnetMatchExpressions,
  setFromEndpointMatchExpressions,
  setFromNamespaceMatchExpressions,
  setFromSubnetMatchExpressions,
  resetFromMatchLabels,
  setToSubnetMatchPrefix,
  resetToMatchLabels,
  setFromSubnetMatchPrefix,
  setToNamespaceMatchName,
  setToNamespaceMatchLabels,
  setToSubnetMatchLabels,
  setToEndpointMatchLabels,
  setFromEndpointType,
  setFromSubnetMatchLabels,
  setFromEndpointMatchLabels,
  setFromNamespaceMatchLabels,
  setToEndpointType,
  setToEndpointName,
  setFromNamespaceMatchName,
  setFromEntityType,
  setToEntityType,
  setMetadataLabels,
  reset
} = applicationConnectionSlice.actions;
export default applicationConnectionSlice.reducer;