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

import React, { FC, useState } from "react";
import { Drawer as AntDDrawer } from "antd";

import { Button } from "@/components";
import { ActionSubmenu, FlexColumn } from "../";

import { ButtonVariants, RoutePaths } from "@/common/enum";
import { NavigationSubmenuProps } from "@/common/interface";

import styles from "./network-submenu.module.scss";

export const NetworkSubmenu: FC<NavigationSubmenuProps> = ({ linkOnClick }) => {
  const [networkMenu, setNetworkMenu] = useState<boolean>(false);

  const showNetworkDomainsMenu = () => {
    setNetworkMenu(true);
  };

  const onNetworkDomainsClose = () => {
    setNetworkMenu(false);
  };

  const closeSubmenu = () => {
    setNetworkMenu(false);
    linkOnClick();
  };

  const submenuTitle = <h1 className={styles.mainTitle}>Network Domain</h1>;

  return (
    <>
      <Button
        customClass={styles.button}
        onClick={showNetworkDomainsMenu}
        variant={ButtonVariants.SECONDARY}
        text="Network Domain"
      />
      <AntDDrawer
        title={submenuTitle}
        className={styles.mainBackground}
        width={320}
        closable={false}
        onClose={onNetworkDomainsClose}
        open={networkMenu}
        placement="left"
      >
        <FlexColumn>
          <ActionSubmenu link={"Domains"} title={"Network Domains"}
                         actions={[
                           { name: "List", destination: RoutePaths.NETWORK_DOMAINS },
                           { name: "Create", destination: RoutePaths.DEFINE_NETWORK_DOMAIN }
                         ]} linkOnClick={closeSubmenu}></ActionSubmenu>
          <ActionSubmenu link={"Connections"} title={"Network Domain Connections"}
                         actions={[
                           { name: "List", destination: RoutePaths.NETWORK_DOMAIN_CONNECTIONS },
                           { name: "Create", destination: RoutePaths.CONNECTION_CREATOR }
                         ]} linkOnClick={closeSubmenu}></ActionSubmenu>

        </FlexColumn>
      </AntDDrawer>
    </>
  );
};
