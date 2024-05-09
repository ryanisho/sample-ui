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

import { FC, useState } from "react";
import { Drawer as AntDDrawer } from "antd";

import { Button } from "@/components";

import { ButtonVariants, RoutePaths } from "@/common/enum";
import { NavigationSubmenuProps } from "@/common/interface";

import styles from "./user-submenu.module.scss";
import { ActionSubmenu, FlexColumn } from "../";

export const UserSubmenu: FC<NavigationSubmenuProps> = ({ linkOnClick }) => {
  const [usersMenu, setUsersMenu] = useState<boolean>(false);

  const showUserConnectionsMenu = () => {
    setUsersMenu(true);
  };

  const onUserConnectionsClose = () => {
    setUsersMenu(false);
  };

  const closeSubmenu = () => {
    setUsersMenu(false);
    linkOnClick();
  };

  const submenuTitle = <h1 className={styles.mainTitle}>User</h1>;

  return (
    <>
      <Button
        customClass={styles.button}
        onClick={showUserConnectionsMenu}
        variant={ButtonVariants.SECONDARY}
        text="User"
      />
      <AntDDrawer
        className={styles.mainBackground}
        title={submenuTitle}
        width={350}
        closable={false}
        onClose={onUserConnectionsClose}
        open={usersMenu}
        placement="left"
      >
        <FlexColumn>
          <ActionSubmenu link={"List"} title={"List"}
                         actions={[
                           { name: "List", destination: RoutePaths.USER_LIST },
                         ]} linkOnClick={closeSubmenu}></ActionSubmenu>
          <ActionSubmenu link={"Connections"} title={"Connections"}
                         actions={[
                           { name: "List", destination: RoutePaths.USER_CONNECTIONS_POLICIES },
                           { name: "Create", destination: RoutePaths.USER_CONNECTION_ATTACHMENT }
                         ]} linkOnClick={closeSubmenu}></ActionSubmenu>
          <ActionSubmenu link={"Connection Policies"} title={"Connection Policies"}
                         actions={[
                           { name: "List", destination: RoutePaths.USER_CONNECTIONS_POLICIES },
                           { name: "Create", destination: RoutePaths.USER_CONNECTIONS_POLICIES_CREATOR }
                         ]} linkOnClick={closeSubmenu}></ActionSubmenu>
        </FlexColumn>
      </AntDDrawer>
    </>
  );
};
