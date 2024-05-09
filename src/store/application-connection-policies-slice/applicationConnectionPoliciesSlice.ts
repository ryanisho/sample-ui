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
import { AppConnectionPolicy } from "@/_proto/grpc-service/ts/app_connection";

interface State {
  data: AppConnectionPolicy[];
  status: string;
}

const initialState: State = {
  data: [],
  status: "",
};

export const applicationConnectionPoliciesSlice = createSlice({
  name: "applicationConnectionPoliciesSlice",
  initialState,
  reducers: {
    setApplicationConnectionPolicies: (state: State, action: PayloadAction<AppConnectionPolicy[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setApplicationConnectionPolicies } = applicationConnectionPoliciesSlice.actions;
export default applicationConnectionPoliciesSlice.reducer;
