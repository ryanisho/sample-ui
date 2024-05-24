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

import { ColDef } from "ag-grid-community";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { DataGrid, TextRowCell } from "@/components/data-grid";
import { Wrapper } from "@/components/views/wrapper";

import { serverStatus } from "@/common/constants";
import { AppDispatch, RootState } from "@/store/store";
import { fetchNetworkDomains } from "@/store/network-domains-slice/thunk/networkDomainsThunk";
import { useFetchNetworkDomains } from "@/common/hooks";
import { NetworkDomainsSliceBuilderStatuses } from "@/common/enum";

export const NetworkDomains = () => {
  const { data, status } = useSelector((state: RootState) => state.networkDomains);
  const { grpcData } = useSelector((state: RootState) => state.grpcNetworkDomains);

  const { fetchAllNetworkDomains } = useFetchNetworkDomains();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (serverStatus === "stub") {
      dispatch(fetchNetworkDomains());
    } else {
      fetchAllNetworkDomains()
    }
  }, []);

  const liveServerColumnsDef: ColDef[] = [
    {
      field: "name",
      headerName: "Name",
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.data.name} />;
      },
      editable: true,
      width: 300,
    },
    {
      field: "type",
      headerName: "Type",
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.data.type.toUpperCase()} />;
      },
      width: 100,
    },
    {
      field: "provider",
      headerName: "Provider",
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.data.provider} />;
      },
      width: 100,
    },
    {
      field: "region",
      headerName: "Region",
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.data.region} />;
      },
      width: 100,
    },
    {
      field: "id",
      headerName: "ID",
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.data.id} />;
      },
      width: 1200,
    },
  ];
  const stubServerColumnsDef: ColDef[] = [
    {
      field: "name",
      headerName: "Name",
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.data.metadata.name} />;
      },
      editable: true,
      onCellValueChanged: () => console.log("changed"),
      width: 260,
    },
    {
      field: "type",
      headerName: "Type",
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.value.toUpperCase()} />;
      },
      width: 100,
    },
    {
      field: "provider",
      headerName: "Provider",
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.value} />;
      },
      width: 100,
    },
    {
      field: "id",
      headerName: "Network Domain ID",
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.value} />;
      },
      width: 300,
    },
    {
      field: "site_id",
      headerName: "Site ID",
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.value} />;
      },
    },
  ];

  if (status === NetworkDomainsSliceBuilderStatuses.PENDING) {
    return <div>Loading... </div>;
  }

  if (status === NetworkDomainsSliceBuilderStatuses.FAILED) {
    return <div>Something went wrong.</div>;
  }

  if ((status === NetworkDomainsSliceBuilderStatuses.SUCCESS && data) || grpcData) {
    return (
      <Wrapper title="Network Domains">
        <DataGrid
          rowData={serverStatus === "live" ? grpcData : data}
          columnDefs={serverStatus === "live" ? liveServerColumnsDef : stubServerColumnsDef}
          heightAndWidth={{
            height: "690px",
            width: "100%",
          }}
        />
      </Wrapper>
    );
  }

  return <span>Loading data, please wait...</span>;
};
