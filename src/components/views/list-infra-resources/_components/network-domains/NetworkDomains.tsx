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

import { useDispatch, useSelector } from "react-redux";
import { useFormContext } from "react-hook-form";
import React, { FC, useEffect, useMemo, useState } from "react";
import { ColDef, RowSelectedEvent } from "ag-grid-community";

import { BottomDrawer, DataGrid, TextRowCell, Tooltip } from "@/components";
import { VmsAndSubnets } from "@/components/views/list-infra-resources/_components/network-domains/_components";
import { fetchNetworkDomains } from "@/store/network-domains-slice/thunk/networkDomainsThunk";
import {
  setInfraSelectedRow,
  setResourceFetchedEntities,
  setResourceType,
  setInfraClusterSelectedRow,
} from "@/store/infra-resources-slice/infraResourcesSlice";
import { AppDispatch, RootState } from "@/store/store";
import { serverStatus } from "@/common/constants";
import { Button, ButtonGroup } from "@mui/material";
import { InfraResourceType, Tooltips } from "@/common/enum";
import { useFetchVpcResourceClusters, useFetchVpcResourceSubnets, useFetchVpcResourceVms,useFetchVpcResourceSecurityGroups,useFetchVpcResourceRouteTables,useFetchVpcResourceACLs,useFetchVpcResourceVpcEndpoints,useFetchVpcResourceRouters, useFetchVpcResourceNATGateways,useFetchVpcResourceInternetGateways} from "@/common/hooks";
import { muiButtonColorHandler } from "@/common/utils";

interface NetworkDomainsProps {
  setIsClusterDrawerVisible: (value: ((prevState: boolean) => boolean) | boolean) => void;
}

export const NetworkDomains: FC<NetworkDomainsProps> = ({ setIsClusterDrawerVisible }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedResourceType, setSelectedResourceType] = useState<string>();

  const { data } = useSelector((state: RootState) => state.networkDomains);
  const { vpcs } = useSelector((state: RootState) => state.infraResources);
  const { selectedRow } = useSelector((state: RootState) => state.infraResources);
  const { watch } = useFormContext();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (serverStatus === "stub") {
      dispatch(fetchNetworkDomains());
    }
  }, []);

  const selectedProvider = watch("provider");

  const filteredNetworkDomains = useMemo(() => {
    const networkDomains = serverStatus === "stub" ? data : vpcs;

    if (!selectedProvider) {
      console.log("VPCs =",vpcs)
      return networkDomains;
    }

    return networkDomains?.filter((networkDomain: any) => {
      return networkDomain.provider.toUpperCase() === selectedProvider;
    });
  }, [data, vpcs, selectedProvider]);

  const liveServerColDefs: ColDef[] = [
    {
      field: "id",
      headerName: "ID",
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.data.id} />;
      },
    },
    {
      field: "name",
      headerName: "Name",
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.data.name} />;
      },
      editable: true,
      width: 220,
    },
    /* {
      field: "network_domain_type",
      headerName: "Network Domain Type",
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.data.type.toUpperCase()} />;
      },
      width: 200,
    }, */
    {
      field: "region",
      headerName: "Region",
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.data.region} />;
      },
      width: 130,
    },
    {
      field: "ipv4_cidr",
      headerName: "IPv4 CIDR",
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.data.ipv4_cidr} />;
      },
      width: 130,
    },
    {
      field: "ipv6_cidr",
      headerName: "IPv6 CIDR",
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.data.ipv6_cidr} />;
      },
      width: 130,
    },

    
  ];

  const stubServerColDefs: ColDef[] = [
    {
      field: "name",
      headerName: "Name",
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.data.metadata.name} />;
      },
      editable: true,
      width: 260,
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
      field: "site_id",
      headerName: "Site ID",
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.data.id} />;
      },
    },
  ];

  const onRowSelected = (event: RowSelectedEvent) => {
    const [selectedRow] = event.api.getSelectedRows();

    if (selectedRow) {
      const provider = selectedRow.provider;
      const id = selectedRow.id;
      const region = selectedRow.region;
      const accountId = selectedRow.accountId;

      setIsClusterDrawerVisible(false);
      //setIsDrawerVisible(false);
      //setSelectedResourceType("");
      //dispatch(setResourceType(""));
      dispatch(setInfraSelectedRow({ provider, id, region, accountId }));
      dispatch(setInfraClusterSelectedRow(""));
    }
    else {
      console.log("No row selected");
    }
  };

  const { fetchVpcResourcesVms } = useFetchVpcResourceVms(
    selectedRow.provider,
    selectedRow.region,
    selectedRow.id,
    selectedRow.accountId
  );

  const { fetchVpcResourcesSubnets } = useFetchVpcResourceSubnets(
    selectedRow.provider,
    selectedRow.region,
    selectedRow.id,
    selectedRow.accountId
  );

  const { fetchVpcResourceSecurityGroups } = useFetchVpcResourceSecurityGroups(
    selectedRow.provider,
    selectedRow.region,
    selectedRow.id,
    selectedRow.accountId
  );

  const { fetchVpcResourceRouteTables } = useFetchVpcResourceRouteTables(
    selectedRow.provider,
    selectedRow.region,
    selectedRow.id,
    selectedRow.accountId
  );

  const { fetchVpcResourceVPCEndpoints } = useFetchVpcResourceVpcEndpoints(
    selectedRow.provider,
    selectedRow.region,
    selectedRow.id,
    selectedRow.accountId
  );

  const { fetchVpcResourceRouters } = useFetchVpcResourceRouters(
    selectedRow.provider,
    selectedRow.region,
    selectedRow.id,
    selectedRow.accountId
  );

  const { fetchVpcResourceNATGateways } = useFetchVpcResourceNATGateways(
    selectedRow.provider,
    selectedRow.region,
    selectedRow.id,
    selectedRow.accountId
  );

  const { fetchVpcResourceInternetGateways } = useFetchVpcResourceInternetGateways(
    selectedRow.provider,
    selectedRow.region,
    selectedRow.id,
    selectedRow.accountId
  );

  const { fetchVpcResourceACLs } = useFetchVpcResourceACLs(
    selectedRow.provider,
    selectedRow.region,
    selectedRow.id,
    selectedRow.accountId
  );


  const { fetchVpcResourcesClusters } = useFetchVpcResourceClusters(
    selectedRow.provider,
    selectedRow.region,
    selectedRow.id,
    selectedRow.accountId
  );

  const handleResourceChange = (value: InfraResourceType) => {
    dispatch(setResourceType(value));
    switch (value) {
      case InfraResourceType.VMS:
        dispatch(setResourceFetchedEntities([]));
        fetchVpcResourcesVms();
        setIsDrawerVisible(true);
        setIsClusterDrawerVisible(false);
        setSelectedResourceType(InfraResourceType.VMS);
        break;
      case InfraResourceType.SUBNETS:
        dispatch(setResourceFetchedEntities([]));
        fetchVpcResourcesSubnets();
        setIsDrawerVisible(true);
        setIsClusterDrawerVisible(false);
        setSelectedResourceType(InfraResourceType.SUBNETS);
        break;
      case InfraResourceType.CLUSTERS:
        dispatch(setResourceFetchedEntities([]));
        fetchVpcResourcesClusters();
        //setIsDrawerVisible(false);
        setIsClusterDrawerVisible(false);
        setSelectedResourceType(InfraResourceType.CLUSTERS);
        break;
      case InfraResourceType.SECURITY_GROUPS:
        dispatch(setResourceFetchedEntities([]));
        fetchVpcResourceSecurityGroups();
        setIsDrawerVisible(true);
        setIsClusterDrawerVisible(false);
        setSelectedResourceType(InfraResourceType.SECURITY_GROUPS);
        break;
      case InfraResourceType.ACLS:
        dispatch(setResourceFetchedEntities([]));
        fetchVpcResourceACLs();
        setIsDrawerVisible(true);
        setIsClusterDrawerVisible(false);
        setSelectedResourceType(InfraResourceType.ACLS);
        break;
      case InfraResourceType.ROUTE_TABLES:
        dispatch(setResourceFetchedEntities([]));
        fetchVpcResourceRouteTables();
        setIsDrawerVisible(true);
        setIsClusterDrawerVisible(false);
        setSelectedResourceType(InfraResourceType.ROUTE_TABLES);
        break;
      case InfraResourceType.VPC_ENDPOINTS:
        dispatch(setResourceFetchedEntities([]));
        fetchVpcResourceVPCEndpoints();
        setIsDrawerVisible(true);
        setIsClusterDrawerVisible(false);
        setSelectedResourceType(InfraResourceType.VPC_ENDPOINTS);
        break;
      case InfraResourceType.CLOUD_ROUTERS:
        dispatch(setResourceFetchedEntities([]));
        fetchVpcResourceRouters();
        setIsDrawerVisible(true);
        setIsClusterDrawerVisible(false);
        setSelectedResourceType(InfraResourceType.CLOUD_ROUTERS);
        break;
      case InfraResourceType.NAT_GATEWAYS:
        dispatch(setResourceFetchedEntities([]));
        fetchVpcResourceNATGateways();
        setIsDrawerVisible(true);
        setIsClusterDrawerVisible(false);
        setSelectedResourceType(InfraResourceType.NAT_GATEWAYS);
        break;
      case InfraResourceType.INTERNET_GATEWAYS:
        dispatch(setResourceFetchedEntities([]));
        fetchVpcResourceInternetGateways();
        setIsDrawerVisible(true);
        setIsClusterDrawerVisible(false);
        setSelectedResourceType(InfraResourceType.INTERNET_GATEWAYS);
        break;
    }
  };

  const isResourceDisabled = !selectedRow.provider || !selectedRow.id || !selectedRow.region || !selectedRow.accountId;
  //const isResourceDisabled = !selectedRow.provider || !selectedRow.accountId;

  return (
    <section style={{ display: "flex", flexDirection: "column", padding: "1px", width: "50%" }}>
      <div style={{ display: "flex", justifyContent: "flex-start", padding: "2px" }}>
        <ButtonGroup disabled={isResourceDisabled} variant="contained" aria-label="contained button group">
          <Button
            sx={muiButtonColorHandler(selectedResourceType, InfraResourceType.VMS)}
            onClick={() => handleResourceChange(InfraResourceType.VMS)}
          >
            VM
          </Button>
          <Button
            sx={muiButtonColorHandler(selectedResourceType, InfraResourceType.SUBNETS)}
            onClick={() => handleResourceChange(InfraResourceType.SUBNETS)}
          >
            Subnet
          </Button>
          <Button
            sx={muiButtonColorHandler(selectedResourceType, InfraResourceType.SECURITY_GROUPS)}
            onClick={() => handleResourceChange(InfraResourceType.SECURITY_GROUPS)}
          >
            Security Group
          </Button>
          <Button
            sx={muiButtonColorHandler(selectedResourceType, InfraResourceType.ACLS)}
            onClick={() => handleResourceChange(InfraResourceType.ACLS)}
          >
            ACL
          </Button>
          <Button
            sx={muiButtonColorHandler(selectedResourceType, InfraResourceType.ROUTE_TABLES)}
            onClick={() => handleResourceChange(InfraResourceType.ROUTE_TABLES)}
          >
            Route Table
          </Button>
          <Button
            sx={muiButtonColorHandler(selectedResourceType, InfraResourceType.VPC_ENDPOINTS)}
            onClick={() => handleResourceChange(InfraResourceType.VPC_ENDPOINTS)}
          >
            VPC Endpoint
          </Button>
          <Button
            sx={muiButtonColorHandler(selectedResourceType, InfraResourceType.CLOUD_ROUTERS)}
            onClick={() => handleResourceChange(InfraResourceType.CLOUD_ROUTERS)}
          >
            Cloud Routers
          </Button>
          <Button
            sx={muiButtonColorHandler(selectedResourceType, InfraResourceType.NAT_GATEWAYS)}
            onClick={() => handleResourceChange(InfraResourceType.NAT_GATEWAYS)}
          >
            NAT Gateways
          </Button>
          <Button
            sx={muiButtonColorHandler(selectedResourceType, InfraResourceType.INTERNET_GATEWAYS)}
            onClick={() => handleResourceChange(InfraResourceType.INTERNET_GATEWAYS)}
          >
            Internet Gateways
          </Button>
          <Button
            sx={muiButtonColorHandler(selectedResourceType, InfraResourceType.INTERNET_GATEWAYS)}
            onClick={() => handleResourceChange(InfraResourceType.INTERNET_GATEWAYS)}
          >
            Public IP Addresses
          </Button>
          <Button
            sx={muiButtonColorHandler(selectedResourceType, InfraResourceType.INTERNET_GATEWAYS)}
            onClick={() => handleResourceChange(InfraResourceType.INTERNET_GATEWAYS)}
          >
            Overlapping IP CIDR
          </Button>
          <Button
            sx={muiButtonColorHandler(selectedResourceType, InfraResourceType.CLUSTERS)}
            onClick={() => handleResourceChange(InfraResourceType.CLUSTERS)}
          >
            K8S Clusters
          </Button>
         
        </ButtonGroup>
        <Tooltip title={Tooltips.RESOURCE_TYPE} />
      </div>
      <DataGrid
        rowData={filteredNetworkDomains}
        columnDefs={serverStatus === "stub" ? stubServerColDefs : liveServerColDefs}
        onRowSelected={onRowSelected}
        heightAndWidth={{
          height: "690px",
          width: "810px",
        }}
      />
      <BottomDrawer
        isDrawerVisible={isDrawerVisible}
        setIsDrawerVisible={setIsDrawerVisible}
        title={`${selectedResourceType} resources`}
      >
        <VmsAndSubnets />
      </BottomDrawer>
    </section>
  );
};
