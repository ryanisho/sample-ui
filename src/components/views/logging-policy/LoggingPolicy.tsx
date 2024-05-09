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

import { ColDef } from "ag-grid-community";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { DataGrid, TextRowCell } from "@/components/data-grid";
import { Wrapper } from "@/components/views/wrapper";

import { serverStatus } from "@/common/constants";
import { AppDispatch, RootState } from "@/store/store";
import { fetchMonitoringPolicies } from "@/store/monitoring-policies-slice/thunk/monitoringPoliciesThunk";

export const MonitoringPolicy = () => {
  const { data } = useSelector((state: RootState) => state.monitoringPolicies);
  const { grpcData } = useSelector((state: RootState) => state.grpcSlaProfiles);


  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (serverStatus === "stub") {
      dispatch(fetchMonitoringPolicies());
    } else {
      //fetchMonitoringPolicies();
      dispatch(fetchMonitoringPolicies());
    }
  }, []);

  const liveServerColumnsDef: ColDef[] = [
    {
        field: "name",
        headerName: "Name",
        width:300,
        cellRenderer: (params: any) => {
          return <TextRowCell value={params.data.metadata.name} />;
        },
      
      },
      {
        field: "protocol",
        width:200,
        headerName: "Protocol Filter",
        cellRenderer: (params: any) => {
          return <TextRowCell value={params.data.metadata.category} />;
        },
      
      },
      {
        field: "logLevel",
        width:300,
        headerName: "Log Level",
        cellRenderer: (params: any) => {
          return <TextRowCell value={params.data.metadata.trafficType} />;
        },
      },
      {
        field: "logFormat",
        headerName: "Log Format",
        width:100,
        cellRenderer: (params: any) => {
          return <TextRowCell value={params.data.metadata.name} />;
        },
        
      },
  
      {
        field: "logRotationSize",
        headerName: "Log Rotation Size (MB)",
        cellRenderer: (params: any) => {
          return <TextRowCell value={params.data.params.data.metadata.name} />;
        },
      },
      {
        field: "logRetention",
        headerName: "Log Retention Period (Days)",
        cellRenderer: (params: any) => {
          return <TextRowCell value={params.data.params.data.metadata.name} />;
        },
      },
      {
        field: "logLolcation",
        headerName: "Log Location (Path)",
        cellRenderer: (params: any) => {
          return <TextRowCell value={params.data.params.data.metadata.name} />;
        },
      },
      {
        field: "logField",
        headerName: "Log Fields",
        cellRenderer: (params: any) => {
          return <TextRowCell value={params.data.params.data.metadata.name} />;
        },
      },
  ];
  const stubServerColumnsDef: ColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width:300,
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.data.metadata.name} />;
      },
    
    },
    {
      field: "protocol",
      width:200,
      headerName: "Protocol Filter",
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.data.metadata.category} />;
      },
    
    },
    {
      field: "logLevel",
      width:300,
      headerName: "Log Level",
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.data.metadata.trafficType} />;
      },
    },
    {
      field: "logFormat",
      headerName: "Log Format",
      width:100,
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.data.metadata.name} />;
      },
      
    },

    {
      field: "logRotationSize",
      headerName: "Log Rotation Size (MB)",
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.data.metadata.name} />;
      },
    },
    {
      field: "logRetention",
      headerName: "Log Retention Period (Days)",
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.data.metadata.name} />;
      },
    },
    {
      field: "logLolcation",
      headerName: "Log Location (Path)",
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.data.metadata.name} />;
      },
    },
    {
      field: "logField",
      headerName: "Log Fields",
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.data.metadata.name} />;
      },
    },
  ];

  if ( ( data) || (grpcData)) {
    return (
      <Wrapper title="Connection Monitoring Policies">
        <DataGrid
          rowData={serverStatus === "live" ? data : data}
          columnDefs={serverStatus === "live" ? stubServerColumnsDef : stubServerColumnsDef}
          heightAndWidth={{
            height: "1200px",
            width: "1600px",
          }}
        />
      </Wrapper>
    );
  }

  return <span>Loading data, please wait...</span>;
};
