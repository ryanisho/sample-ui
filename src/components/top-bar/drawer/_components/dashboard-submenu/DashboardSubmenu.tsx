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
import { Link } from "react-router-dom";
import { Drawer as AntDDrawer } from "antd";

import { Button } from "@/components";
import { FlexColumn } from "../flex-column";

import { ButtonVariants, RoutePaths } from "@/common/enum";
import { NavigationSubmenuProps } from "@/common/interface";

import styles from "./dashboard-submenu.module.scss";

export const DashboardSubmenu: FC<NavigationSubmenuProps> = ({ linkOnClick }) => {
  const [dashboardMenu, setInfrastructureMenu] = useState<boolean>(false);

  const showInfraResourceDashboard = () => {
    setInfrastructureMenu(true);
  };

  const onInfraResourceDashboardClose = () => {
    setInfrastructureMenu(false);
  };

  const closeSubmenu = () => {
    setInfrastructureMenu(false);
    linkOnClick();
  };

  const submenuTitle = <h1 className={styles.mainTitle}>Infrastructure Resource</h1>;

  return (
    <>
      <Button
        customClass={styles.button}
        onClick={showInfraResourceDashboard}
        variant={ButtonVariants.SECONDARY}
        text="Dashboard"
      />
      <AntDDrawer
        title={submenuTitle}
        className={styles.mainBackground}
        width={350}
        closable={false}
        onClose={onInfraResourceDashboardClose}
        open={dashboardMenu}
        placement="left"
      >
        <FlexColumn>
          <Link className={styles.link} onClick={closeSubmenu} to={RoutePaths.INFRA_RESOURCE_DASHBOARD}>
            Infrastructure Resources
          </Link>
          <Link className={styles.link} onClick={closeSubmenu} to={RoutePaths.VPC_CONNECTION_DASHBOARD}>
            IP Traffic (Connections)
          </Link>
        </FlexColumn>
      </AntDDrawer>
    </>
  );
};
