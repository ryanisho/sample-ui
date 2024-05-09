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

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ColDef } from "ag-grid-community";

import { DataGrid, StatusRowCell, TextRowCell } from "@/components/data-grid";
import { Wrapper } from "@/components/views/wrapper";

import { serverStatus } from "@/common/constants";
import { useFetchNetworkDomainsConnections } from "@/common/hooks";
import { useQuery } from "@tanstack/react-query";
import { fetchDataClient } from "@/common/utils";
import { ApiEndpoints } from "@/common/enum";
import { ConnectionInformation } from "@/_proto/grpc-service/ts/network_domain_connection";
import { Status } from "@/_proto/grpc-service/ts/common";

export const NetworkDomainsConnections = () => {
  const { data } = useSelector((state: RootState) => state.networkDomainsConnections);

  // TODO: rewrite to redux toolkit
  const stubNetworkDomains = useQuery({
    queryKey: ["networkDomainsConnections"],
    queryFn: () => fetchDataClient(ApiEndpoints.STUB_NETWORK_DOMAIN_CONNECTIONS),
  });

  const { fetchConnections } = useFetchNetworkDomainsConnections();

  useEffect(() => {
    fetchConnections();
  }, []);

  const liveServerColumnsDef: ColDef<ConnectionInformation>[] = [
    {
      headerName: "Connection Name",
      valueGetter: (params) => params.data?.metadata?.name,
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.value}/>;
      },
      width: 300,
    },
    {
      headerName: "Source Name",
      valueGetter: (params) => params.data?.source?.name,
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.value}/>;
      },
    },
    {
      headerName: "Source Type",
      valueGetter: (params) => params.data?.source?.type,
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.value}/>;
      },
      width: 120,
    },
    {
      headerName: "Source Provider",
      valueGetter: (params) => params.data?.source?.provider,
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.value}/>;
      },
      width: 150,
    },
    {
      headerName: "Destination Name",
      valueGetter: (params) => params.data?.destination?.name,
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.value}/>;
      },
    },
    {
      headerName: "Destination Type",
      valueGetter: (params) => params.data?.destination?.type,
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.value.toUpperCase()}/>;
      },
      width: 150,
    },
    {
      headerName: "Destination Provider",
      valueGetter: (params) => params.data?.destination?.provider,
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.value}/>;
      },
      width: 150,
    },
    {
      field: "allow_all",
      headerName: "Access Type",
      valueGetter: (params) => "Deny", //params.data.destination.defaultAccessControl,
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.value}/>;
      },
      width: 130,
    },
    {
      field: "sla_profile",
      headerName: "SLO Profile",
      valueGetter: (params) => "Default", // params.data.destination.defaultAccessControl,
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.value}/>;
      },
      width: 120,
    },
    /*{
      field: "controller",
      headerName: "Controller",
      valueGetter: (params) => params.data?.controller,
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.value} />;
      },
      width: 240,
    },*/
    {
      field: "status",
      headerName: "Status",
      valueGetter: (params) => params.data?.status ?? Status.UNRECOGNIZED,
      cellRenderer: (params: any) => {
        const status : Status= params.value
        switch (status) {
          case Status.FAILED:
            return <StatusRowCell value={"inactive"}/>;
          case Status.IN_PROGRESS:
            return <StatusRowCell value={"inprogress"}/>;
          case Status.SUCCESS:
            return <StatusRowCell value={"active"}/>;
          case Status.UNRECOGNIZED:
            return <StatusRowCell value={"inactive"}/>;
        }
      },
      width: 100,
    }
  ];
  const stubServerColumnsDef: ColDef[] = [
    {
      headerName: "Connection Name",
      valueGetter: (params) => params.data.name,
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.value} />;
      },
      width: 300,
    },
    {
      headerName: "ID",
      valueGetter: (params) => params.data.id,
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.value} />;
      },
      width: 250,
    },
    {
      headerName: "Source Name",
      valueGetter: (params) => params.data.source.metadata.name,
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.value} />;
      },
    },
    {
      headerName: "Source Type",
      valueGetter: (params) => params.data.source.type,
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.value} />;
      },
      width: 120,
    },
    {
      headerName: "Source Provider",
      valueGetter: (params) => params.data.source.provider,
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.value} />;
      },
      width: 150,
    },
    {
      headerName: "Destination Name",
      valueGetter: (params) => params.data.destination.metadata.name,
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.value} />;
      },
    },
    {
      headerName: "Destination Type",
      valueGetter: (params) => params.data.destination.type,
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.value.toUpperCase()} />;
      },
      width: 150,
    },
    {
      headerName: "Destination Provider",
      valueGetter: (params) => params.data.destination.provider,
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.value} />;
      },
      width: 150,
    },
    {
      field: "allow_all",
      headerName: "Access Type",
      valueGetter: (params) => "Deny", //params.data.destination.defaultAccessControl,
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.value} />;
      },
      width: 130,
    },
    {
      field: "sla_profile",
      headerName: "SL0 Profile",
      valueGetter: (params) => "Default", // params.data.destination.defaultAccessControl,
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.value} />;
      },
      width: 120,
    },
    {
      field: "status",
      headerName: "Status",
      cellRenderer: (params: any) => {
        return <StatusRowCell value={params.value === 1 ? "active" : "inactive"} />;
      },
      width: 100,
    },

    // {
    //   field: "controller",
    //   headerName: "Controller",
    //   valueGetter: (params) => params.data.source.vendorController,
    //   cellRenderer: (params: any) => {
    //     return <TextRowCell value={params.value} />;
    //   },
    //   width: 240,
    // },
  ];

  return (
    <Wrapper title="Network Domain Connections">
      <DataGrid
        rowData={serverStatus === "live" ? data : stubNetworkDomains.data}
        columnDefs={serverStatus === "live" ? liveServerColumnsDef : stubServerColumnsDef}
        heightAndWidth={{
          height: "790px",
          width: "100%",
        }}
      />
    </Wrapper>
  );
};
