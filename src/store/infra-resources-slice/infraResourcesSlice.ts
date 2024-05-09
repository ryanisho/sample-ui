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

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface State {
  vpcs: any[];
  instances: any[];
  selectedRow: {
    provider: string;
    id: string;
    region: string;
    accountId: string;
  };
  selectedClusterRow: {
    name: string;
  };
  infraProvider: string;
  resources: {
    vpcVms: any[];
    vpcSubnets: any[];
    vpcSecurityGroups: any [];
    vpcRouteTables: any [];
    vpcACLS: any [];
    vpcClusters: any[];
    fetchedEntities: any[];
    type: string;
  };
  subResources: {
    type: string;
    fetchedEntities: any[];
  };
  accounts: string[];
  regions: string[];
}

const initialState: State = {
  vpcs: [],
  instances: [],
  selectedRow: {
    provider: "",
    id: "",
    region: "",
    accountId: "",
  },
  selectedClusterRow: {
    name: "",
  },
  infraProvider: "",
  resources: {
    vpcVms: [],
    vpcSubnets: [],
    vpcSecurityGroups: [],
    vpcRouteTables: [],
    vpcACLS: [],
    vpcClusters: [],
    fetchedEntities: [],
    type: "",
  },
  subResources: {
    type: "",
    fetchedEntities: [],
  },
  accounts: [],
  regions: [],
};

export const infraResourcesSlice = createSlice({
  name: "infraResources",
  initialState,
  reducers: {
    setInfraVpcs: (state: State, action: PayloadAction<any[]>) => {
      state.vpcs = [...action.payload];
    },
    setInfraInstances: (state: State, action: PayloadAction<any[]>) => {
      state.instances = [...action.payload];
    },

    setInfraSelectedRow: (state: State, action: PayloadAction<any | null>) => {
      state.selectedRow = { ...action.payload };
    },
    setInfraClusterSelectedRow: (state: State, action: PayloadAction<any | null>) => {
      state.selectedClusterRow = { ...action.payload };
    },

    setInfraProvider: (state: State, action: PayloadAction<string>) => {
      state.infraProvider = action.payload;
    },
    setResourceType: (state: State, action: PayloadAction<string>) => {
      state.resources.type = action.payload;
    },

    setResourceFetchedEntities: (state: State, action: PayloadAction<any[]>) => {
      state.resources.fetchedEntities = [...action.payload];
    },
    setSubResourceFetchedEntities: (state: State, action: PayloadAction<any[]>) => {
      state.subResources.fetchedEntities = [...action.payload];
    },
    setAccountIds: (state: State, action: PayloadAction<string[]>) => {
      state.accounts = [...action.payload];
    },
    setRegionNames: (state: State, action: PayloadAction<string[]>) => {
      state.regions = [...action.payload];
    },
  },
});

export const {
  setInfraVpcs,
  setInfraInstances,
  setInfraSelectedRow,
  setInfraClusterSelectedRow,
  setInfraProvider,
  setResourceType,
  setResourceFetchedEntities,
  setSubResourceFetchedEntities,
  setAccountIds,
  setRegionNames,
} = infraResourcesSlice.actions;
export default infraResourcesSlice.reducer;
