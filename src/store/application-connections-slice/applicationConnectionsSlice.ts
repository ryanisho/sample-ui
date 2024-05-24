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

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchApplicationConnections } from "@/store/application-connections-slice/thunk/applicationConnectionsThunk";
import { ApplicationConnectionsSliceBuilderStatuses } from "@/common/enum/applicationConnectionsSliceBuilderStatuses";
import { AppConnectionInformation } from "@/_proto/grpc-service/ts/app_connection";

interface State {
  data: AppConnectionInformation[];
  status: string;
}

const initialState: State = {
  data: [],
  status: "",
};

export const applicationConnectionsSlice = createSlice({
  name: "applicationConnectionsSlice",
  initialState,
  reducers: {
    setApplicationConnections: (state: State, action: PayloadAction<AppConnectionInformation[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchApplicationConnections.pending, (state) => {
        state.status = ApplicationConnectionsSliceBuilderStatuses.PENDING;
      })
      .addCase(fetchApplicationConnections.fulfilled, (state, action) => {
        state.status = ApplicationConnectionsSliceBuilderStatuses.SUCCESS;
        state.data = action.payload;
      })
      .addCase(fetchApplicationConnections.rejected, (state) => {
        state.status = ApplicationConnectionsSliceBuilderStatuses.FAILED;
      });
  },
});

export const { setApplicationConnections } = applicationConnectionsSlice.actions;
export default applicationConnectionsSlice.reducer;
