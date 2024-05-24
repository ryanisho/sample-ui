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

import { useDispatch, useSelector } from "react-redux";
import React, { FC, useEffect } from "react";
import { RowSelectedEvent } from "ag-grid-community";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { DataGrid, LabelText, Popover, TextRowCell } from "@/components";

import { fetchNetworkDomains } from "@/store/network-domains-slice/thunk/networkDomainsThunk";
import { setInfraSelectedRow, setResourceType } from "@/store/infra-resources-slice/infraResourcesSlice";
import { AppDispatch, RootState } from "@/store/store";
import { serverStatus } from "@/common/constants";
import { capitalizeStrings, extractKeysFromObjects, parseThisToString } from "@/common/utils";

interface VmsAndSubnetsProps {
  setDynamicTableVisibility?: (value: ((prevState: boolean) => boolean) | boolean) => void;
}

export const VmsAndSubnets: FC<VmsAndSubnetsProps> = ({ setDynamicTableVisibility }) => {
  const { resources } = useSelector((state: RootState) => state.infraResources);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (serverStatus === "stub") {
      dispatch(fetchNetworkDomains());
    }
  }, []);

  const dynamicRowData = resources !== undefined ? resources.fetchedEntities : [];
  const fetchedInstanceKeys = extractKeysFromObjects(resources.fetchedEntities);
  function convertObjectToLabelTextComponents(obj: any) {
    return Object.entries(obj).map(([label, value]) => <LabelText key={label} label={label} value={value as string} />);
  }

  const dynamicColDefs: any[] = fetchedInstanceKeys.map((key) => {
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
  });

  const onRowSelected = (event: RowSelectedEvent) => {
    const [selectedRow] = event.api.getSelectedRows();

    if (selectedRow && setDynamicTableVisibility) {
      setDynamicTableVisibility(false);
      const provider = selectedRow.provider;
      const id = selectedRow.id;
      const region = selectedRow.region;
      const accountId = selectedRow.accountId;

      dispatch(setResourceType(""));
      dispatch(setInfraSelectedRow({ provider, id, region, accountId }));
    }
  };

  return (
    <>
      <DataGrid
        rowData={dynamicRowData}
        columnDefs={dynamicColDefs}
        onRowSelected={onRowSelected}
        heightAndWidth={{
          height: "690px",
          width: "1800px",
        }}
      />
    </>
  );
};
