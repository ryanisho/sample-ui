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

import { fetchMonitoringPolicies } from "@/store/monitoring-policies-slice/thunk/monitoringPoliciesThunk";

import { ConnectionMonitoringPolicy } from "@/common/interface";

interface State {
  data: ConnectionMonitoringPolicy[];
}

const initialState: State = {
  data: [],
};

export const monitoringPoliciesSlice = createSlice({
  name: "monitoringPolicies",
  initialState,
  reducers: {
    setMonitoringPolicies: (state: State, action: PayloadAction<ConnectionMonitoringPolicy[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMonitoringPolicies.fulfilled, (state, action) => {
        state.data = action.payload;
      })
  },
});

export default monitoringPoliciesSlice.reducer;
