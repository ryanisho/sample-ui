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

import React, { FC } from "react";

import { DataGrid, LabelText, Popover, TextRowCell } from "@/components";

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { capitalizeStrings, extractKeysFromObjects, parseThisToString } from "@/common/utils";
import { CopyToClipboard } from "react-copy-to-clipboard";

export const SubResources: FC = () => {
  const { subResources } = useSelector((state: RootState) => state.infraResources);

  const dynamicRowData = subResources !== undefined ? subResources.fetchedEntities : [];
  const fetchedInstanceKeys = extractKeysFromObjects(subResources.fetchedEntities);

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

  return (
    <div>
      <DataGrid
        rowData={dynamicRowData}
        columnDefs={dynamicColDefs}
        heightAndWidth={{
          height: "500px",
          width: "1040px",
        }}
      />
    </div>
  );
};
