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

import { FC, useState } from "react";
import { Drawer as AntDDrawer } from "antd";

import { Button } from "@/components";

import { ButtonVariants, RoutePaths } from "@/common/enum";
import { NavigationSubmenuProps } from "@/common/interface";

import styles from "./applications-submenu.module.scss";
import { ActionSubmenu, FlexColumn } from "../";

export const ApplicationsSubmenu: FC<NavigationSubmenuProps> = ({ linkOnClick }) => {
  const [applicationsMenu, setApplicationsMenu] = useState<boolean>(false);

  const showApplicationConnectionsMenu = () => {
    setApplicationsMenu(true);
  };

  const onApplicationConnectionsClose = () => {
    setApplicationsMenu(false);
  };

  const closeSubmenu = () => {
    setApplicationsMenu(false);
    linkOnClick();
  };

  const submenuTitle = <h1 className={styles.mainTitle}>Application</h1>;

  return (
    <>
      <Button
        customClass={styles.button}
        onClick={showApplicationConnectionsMenu}
        variant={ButtonVariants.SECONDARY}
        text="Application"
      />
      <AntDDrawer
        className={styles.mainBackground}
        title={submenuTitle}
        width={350}
        closable={false}
        onClose={onApplicationConnectionsClose}
        open={applicationsMenu}
        placement="left"
      >
        <FlexColumn>
          <ActionSubmenu link={"Connections"} title={"Application Connections"}
                         actions={[
                           { name: "List", destination: RoutePaths.APPLICATION_CONNECTIONS },
                           { name: "Create", destination: RoutePaths.APPLICATION_CONNECTION_ATTACHMENT }
                         ]} linkOnClick={closeSubmenu}></ActionSubmenu>
          <ActionSubmenu link={"Connection Policies"} title={"Application Connection Policies"}
                         actions={[
                           { name: "List", destination: RoutePaths.APPLICATION_CONNECTION_POLICIES },
                           { name: "Create", destination: RoutePaths.APPLICATION_CONNECTION_CREATOR }
                         ]} linkOnClick={closeSubmenu}></ActionSubmenu>
        </FlexColumn>
      </AntDDrawer>
    </>
  );
};
