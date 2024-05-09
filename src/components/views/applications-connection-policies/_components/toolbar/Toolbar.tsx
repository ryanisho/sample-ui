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

import { FC } from "react";
import type { MenuProps } from "antd";

import { Button, Dropdown, Popconfirm } from "@/components";

import { ButtonVariants } from "@/common/enum";
import { serverStatus } from "@/common/constants";

import refresh from "@/assets/icons/refresh.svg";
import { createChannel, createClient } from "nice-grpc-web";
import { AppConnectionControllerDefinition } from "@/_proto/grpc-service/ts/app_connection_controller";
import { AppConnectionPolicy, DeleteAppConnectionPolicyRequest } from "@/_proto/grpc-service/ts/app_connection";
import { useFetchAppConnectionPolicies } from "@/common/hooks";
import { BACKEND_API_PREFIX } from "@/common/constants";

interface ToolbarProps {
  selectedAppConnections: AppConnectionPolicy[];
}

export const Toolbar: FC<ToolbarProps> = ({ selectedAppConnections }) => {
  const appConnectionService = createClient(AppConnectionControllerDefinition, createChannel(BACKEND_API_PREFIX))

  const { fetchAppConnectionPolicies } = useFetchAppConnectionPolicies();

  const handleConfirmDelete = (appConnections: AppConnectionPolicy[]) => {
    if (serverStatus === "live") {
      for (const { id } of appConnections) {
        appConnectionService.deleteAppConnectionPolicy(DeleteAppConnectionPolicyRequest.create({ id })).then(() => console.log("SFDLKJDSF"))
      }
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Popconfirm
          disabled={selectedAppConnections.length <= 0}
          title={"Are you sure you want to delete selected connections?"}
          onConfirm={() => handleConfirmDelete(selectedAppConnections)}
        >
          <span>Delete connections</span>
        </Popconfirm>
      ),
      disabled: selectedAppConnections.length <= 0,
    },
  ];

  return (
    <section style={{ display: "flex", justifyContent: "flex-end", gap: "20px" }}>
      <Button onClick={fetchAppConnectionPolicies} variant={ButtonVariants.TERTIARY} iconSrc={refresh}/>
      <Dropdown menu={{ items }}>
        <span style={{ padding: "3px 10px", border: "1px solid gray" }}>Actions</span>
      </Dropdown>
    </section>
  );
};
