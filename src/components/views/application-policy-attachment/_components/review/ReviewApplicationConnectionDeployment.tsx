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

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ColDef } from "ag-grid-community";
import {
  toApplicationConnection
} from "@/store/application-connection-deployer-slice/applicationConnectionDeployerSlice";
import { ApplicationConnection } from "@/common/interface";

import { TextRowCell } from "@/components/data-grid";
import { appConnectionInject, BottomDrawer, Wrapper } from "@/components";
import { AppConnectionData, AppConnectionResources, } from "@/components/application-connection-info";
import {
  TableEnvironmentProvider
} from "@/components/application-connection-info/_components/dynamic-table/TableTypeContext";
import { Button } from "antd";
import { AgGridReact } from "ag-grid-react";
import gridStyles from "@/components/data-grid/data-grid.module.scss";
import { YAMLSideDrawer } from "@/components/common/yaml-side-drawer";
import { createChannel, createClient } from "nice-grpc-web";
import { AppConnectionControllerDefinition } from "@/_proto/grpc-service/ts/app_connection_controller";
import { BACKEND_API_PREFIX } from "@/common/constants";

export const ReviewApplicationConnectionDeployment = () => {
  const state = useSelector((state: RootState) => state.applicationConnectionDeployer);
  const applicationConnections = toApplicationConnection(state)
  const [bottomDrawerVisible, setBottomDrawerVisible] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [yamlSource, setYamlSource] = useState<any>({})
  const [connectionResources, setConnectionResources] = useState<AppConnectionData>({ config: undefined })
  const appConnectionClient = createClient((AppConnectionControllerDefinition), createChannel(BACKEND_API_PREFIX))

  const handleRowSelection = (params: any) => {
    const row: ApplicationConnection | undefined = params.api.getSelectedRows()[0]
    if (row) {
      setYamlSource(row)
      setDrawerOpen(true)
    }
  };

  const columnDefs: ColDef<ApplicationConnection>[] = [
    {
      valueGetter: (params) => params.data?.metadata.name,
      cellRenderer: (params: any) => {
        return <TextRowCell value={params.value}/>;
      },
      width: 500,
    },
    {
      valueGetter: (params) => params.data,
      cellRenderer: (params: { value: ApplicationConnection | undefined }) => {
        const handleDownload = () => {
          setBottomDrawerVisible(true)
          setConnectionResources({})
          const appConnection = params.value
          if (appConnection) {
            appConnectionClient.getMatchedResources(appConnection).then(response => {
              setConnectionResources({
                config: appConnection,
                from: response.sourceMatched,
                to: response.destinationMatched
              })
            }).catch(error => console.log(error, "Static response")
            )
          }
        };
        return <Button onClick={handleDownload}> View Matched Resources</Button>
      },
      width: 300,
    },
  ];

  return (
    <Wrapper title="Application Connections" expand>
      <p>Description</p>
      <div className="ag-theme-material" style={{
        height: "300px",
        width: "100%",
      }}>
        <AgGridReact
          headerHeight={0}
          className={gridStyles.dataGrid}
          rowData={applicationConnections}
          columnDefs={columnDefs}
          onSelectionChanged={handleRowSelection}
          rowSelection={"single"}
        />
      </div>
      <YAMLSideDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}
                      yamlSource={appConnectionInject(yamlSource)} width={"30%"}/>
      <BottomDrawer isDrawerVisible={bottomDrawerVisible} setIsDrawerVisible={setBottomDrawerVisible} destroyOnClose>
        <TableEnvironmentProvider>
          <AppConnectionResources {...connectionResources}/>
        </TableEnvironmentProvider>
      </BottomDrawer>
    </Wrapper>
  );
};
