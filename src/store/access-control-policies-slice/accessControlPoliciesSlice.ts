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

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { fetchAccessControlPolicies } from "@/store/access-control-policies-slice/thunk/accessControlPoliciesThunk";

import { Security_AccessPolicy } from "@/_proto/grpc-service/ts/security_policies";

interface State {
  data: Security_AccessPolicy[];
}

const initialState: State = {
  data: [],
};

export const accessControlPoliciesSlice = createSlice({
  name: "accessControlPolicies",
  initialState,
  reducers: {
    setAccessControlPolicies: (state: State, action: PayloadAction<Security_AccessPolicy[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAccessControlPolicies.fulfilled, (state, action) => {
        state.data = action.payload;
      })
  },
});

export const {
  setAccessControlPolicies,
} = accessControlPoliciesSlice.actions;

export default accessControlPoliciesSlice.reducer;
