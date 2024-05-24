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

import React, { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, ButtonGroup } from "@mui/material";
import { RowSelectedEvent } from "ag-grid-community";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { BottomDrawer, DataGrid, LabelText, Popover, TextRowCell, Tooltip } from "@/components";

import { useFetchClustersPods } from "@/common/hooks";
import { capitalizeStrings, extractKeysFromObjects, parseThisToString, muiButtonColorHandler } from "@/common/utils";
import { AppDispatch, RootState } from "@/store/store";
import { InfraClusterSubResources, InfraResourceType, Tooltips } from "@/common/enum";
import { setInfraClusterSelectedRow } from "@/store/infra-resources-slice/infraResourcesSlice";
import { SubResources } from ".";

interface ClustersProps {
    setIsClusterDrawerVisible: (value: ((prevState: boolean) => boolean) | boolean) => void;
    isClusterDrawerVisible: boolean;
  }
export const Clusters: FC<ClustersProps> = ({ setIsClusterDrawerVisible, isClusterDrawerVisible }) => {
 
const [selectedSubResourceType, setSelectedSubResourceType] = useState<string>();
const { resources, selectedClusterRow } = useSelector((state: RootState) => state.infraResources);

  const dispatch = useDispatch<AppDispatch>();

  const dynamicRowData =
    resources.type !== undefined && resources.type !== "" && resources.type === InfraResourceType.CLUSTERS
      ? resources.fetchedEntities
      : [];
  const fetchedInstanceKeys = extractKeysFromObjects(resources.fetchedEntities);
  const isSubResourceDisabled = !selectedClusterRow.name || resources.type !== InfraResourceType.CLUSTERS;

  const { fetchClusterNodes, fetchClusterPods, fetchClusterServices } = useFetchClustersPods(selectedClusterRow.name);

  function convertObjectToLabelTextComponents(obj: any) {
    return Object.entries(obj).map(([label, value]) => <LabelText key={label} label={label} value={value as string} />);
  }

  const dynamicColDefs: any[] =
    resources.type === InfraResourceType.CLUSTERS
      ? fetchedInstanceKeys.map((key) => {
        return {
          field: key,
          headerName: capitalizeStrings(key),
          cellRenderer: (params: any) => {
            const value = params.data[key];
            return key === "labels" ? (
              <Popover
                content={
                  <div style={{ width: "fit-content" }}>
                    {convertObjectToLabelTextComponents(value)}
                    <CopyToClipboard text={parseThisToString(JSON.stringify(value))}>
                      <button>Copy to clipboard</button>
                    </CopyToClipboard>
                  </div>
                }
                title={"Labels"}
              >
                <span>Hover to display labels</span>
              </Popover>
            ) : (
              <TextRowCell value={value !== null && typeof value === "object" ? JSON.stringify(value) : value} />
            );
          },
        };
      })
      : [];

  const handleSubResourceChange = (value: InfraClusterSubResources) => {
    switch (value) {
      case InfraClusterSubResources.PODS:
        fetchClusterPods();
        setSelectedSubResourceType(InfraClusterSubResources.PODS);
        setIsClusterDrawerVisible(true);
        break;

      case InfraClusterSubResources.SERVICES:
        fetchClusterServices();
        setSelectedSubResourceType(InfraClusterSubResources.SERVICES);
        setIsClusterDrawerVisible(true);
        break;

      case InfraClusterSubResources.NAMESPACES:
        setSelectedSubResourceType(InfraClusterSubResources.NAMESPACES);
        setIsClusterDrawerVisible(true);
        break;
      case InfraClusterSubResources.NODES:
        fetchClusterNodes();
        setSelectedSubResourceType(InfraClusterSubResources.NODES);
        setIsClusterDrawerVisible(true);
        break;
    }
  };

  const onRowSelected = (event: RowSelectedEvent) => {
    const [selectedRow] = event.api.getSelectedRows();

    if (selectedRow) {
      const name = selectedRow.name;

      //setIsClusterDrawerVisible(true);
      setSelectedSubResourceType("");
      dispatch(setInfraClusterSelectedRow({ name }));
    }
  };

  useEffect(() => {
    setSelectedSubResourceType("");
  }, [isSubResourceDisabled]);

  return (
    <div style={{ padding: "5px", width: "50%" }}>
      <div style={{ display: "flex", gap: "5px", justifyContent: "flex-end" }}>
        <ButtonGroup disabled={isSubResourceDisabled} variant="contained" aria-label="contained button group">
          <Button
            sx={muiButtonColorHandler(selectedSubResourceType, InfraClusterSubResources.NODES)}
            onClick={() => handleSubResourceChange(InfraClusterSubResources.NODES)}
          >
            Nodes
          </Button>
          <Button
            sx={muiButtonColorHandler(selectedSubResourceType, InfraClusterSubResources.PODS)}
            onClick={() => handleSubResourceChange(InfraClusterSubResources.PODS)}
          >
            pods
          </Button>
          <Button
            sx={muiButtonColorHandler(selectedSubResourceType, InfraClusterSubResources.SERVICES)}
            onClick={() => handleSubResourceChange(InfraClusterSubResources.SERVICES)}
          >
            services
          </Button>
          <Button
            sx={muiButtonColorHandler(selectedSubResourceType, InfraClusterSubResources.NAMESPACES)}
            onClick={() => handleSubResourceChange(InfraClusterSubResources.NAMESPACES)}
          >
            Namespaces
          </Button>
        </ButtonGroup>
        <Tooltip title={Tooltips.CLUSTERS_RESOURCES} />
      </div>
      <div style={{ padding: "25px", width: "80%" }}>
      <DataGrid
        rowData={dynamicRowData}
        columnDefs={dynamicColDefs}
        heightAndWidth={{
          height: "500px",
          width: "140000px",
        }}
        onRowSelected={onRowSelected}
      />
      </div>
      <BottomDrawer
        isDrawerVisible={isClusterDrawerVisible}
        setIsDrawerVisible={setIsClusterDrawerVisible}
        title={`K8S Cluster ${selectedSubResourceType}`}
      >
        <SubResources />
      </BottomDrawer>
    </div>
  );
};
