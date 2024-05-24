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

import styles from "@/components/application-connection-info/app-connection-resources.module.scss";
import DynamicTable from "@/components/application-connection-info/_components/dynamic-table/DynamicTable";
import {
  AccessPolicyDisplay
} from "@/components/application-connection-info/_components/access-policy-display/AccessPolicyDisplay";
import {
  useTableEnvironment
} from "@/components/application-connection-info/_components/dynamic-table/TableTypeContext";
import { FC, useEffect } from "react";
import { displayInstance } from "@/common/utils/applicationWorkloadUtils";
import { AppConnection, MatchedResources } from "@/_proto/grpc-service/ts/app_connection";
import { Provider } from "react-redux";


export interface AppConnectionData {
  config?: AppConnection,
  from?: MatchedResources,
  to?: MatchedResources,
}

export const AppConnectionResources: FC<AppConnectionData> = ({ config, from, to }) => {
  const { setFromTableType, setToTableType, setFromTableData, setToTableData } = useTableEnvironment();

  useEffect(
    () => {
      if (config) {
        try {
          const blockTypes = ["endpoint", "subnet", "namespace", "cluster", "networkDomain", "SGT","User"] as const;
          const toBlockTypes = [...blockTypes, "service"] as const;

          const setTableByDirection = (direction: "from" | "to", type: typeof toBlockTypes[number]) => {
            const capitalizedType = type[0].toUpperCase() + type.slice(1);
            const block = config[direction]

            if (block && block[type as keyof typeof block]) {
              const setType = direction === "from" ? setFromTableType : setToTableType;
              setType(capitalizedType);
              const setData = direction === "from" ? setFromTableData : setToTableData;
              const data = direction === "from" ? from : to;
              switch (type) {
                case "endpoint":
                  if (data?.matchedInstances)
                    //displayInstance.provider = "aws"
                    setData([...data.matchedInstances.map(displayInstance)])
                  break;
                case "subnet":
                  setData([]) //todo
                  break;
                case "namespace":
                  setData([]) //todo
                  break;
                case "cluster":
                  setData([]) //todo
                  break;
                case "networkDomain":
                  setData([]) //todo
                  break;
                case "SGT":
                  setData([]) //todo
                  break;
                case "User":
                  setData([]) //todo
                  break;
                case "service":
                  setData([]) //todo
                  break;
              }
            }
          };

          blockTypes.forEach((type) => {
            setTableByDirection("from", type);
          });

          toBlockTypes.forEach((type) => {
            setTableByDirection("to", type);
          });


        } catch (error) {
          console.error("Failed to parse JSON:", error);
        }
      }
    }, [config, from, to])

  return (
    <>
      <div style={{ textAlign: "center", fontWeight: "bold", color: "green", backgroundColor: "white" }}>
        Under this application connection, resources in the from table can access, or not access resources in the to
        table using the access policy information specified.
      </div>
      <div className={styles.columnsContainer}>
        <DynamicTable direction="from"/>
        <DynamicTable direction="to"/>
      </div>
    </>
  );
};
//<AccessPolicyDisplay accessType={config?.accessPolicy?.accessType}
//networkAccessControl={config?.accessPolicy?.networkAccessControl}
//networkPolicySelector={config?.networkPolicy?.selector?.matchName}></AccessPolicyDisplay>