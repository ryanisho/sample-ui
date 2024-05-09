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

import React from "react";
import Table from "./Table"; // Assuming you have this component
import {useTableEnvironment} from "./TableTypeContext.jsx";
import {SCHEMAS} from "@/components/application-connection-info/_components/dynamic-table/schema";

const DynamicTable = ({direction}) => {
    const {fromTableType, toTableType, fromTableData, toTableData} = useTableEnvironment();
    const tableType = direction.toLowerCase() === "from" ? fromTableType : toTableType;
    const tableData = direction.toLowerCase() === "from" ? fromTableData : toTableData;

    const schema = SCHEMAS[tableType]

    if (schema)
        return (
            <div>
                <h2>
                    {direction}: {tableType}
                </h2>
                <Table columns={schema} data={tableData}/>
            </div>
        );
    else {
        return <p>Could not display "{direction}" table.</p>
    }
};

export default DynamicTable;
