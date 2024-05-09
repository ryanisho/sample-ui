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

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConnectionInformation } from "@/_proto/grpc-service/ts/network_domain_connection";

interface State {
  data: ConnectionInformation[];
  status: string;
}

const initialState: State = {
  data: [],
  status: "",
};

export const networkDomainsConnectionsSlice = createSlice({
  name: "networkDomainsConnections",
  initialState,
  reducers: {
    setNetworkDomainsConnections: (state: State, action: PayloadAction<ConnectionInformation[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setNetworkDomainsConnections } = networkDomainsConnectionsSlice.actions;
export default networkDomainsConnectionsSlice.reducer;
