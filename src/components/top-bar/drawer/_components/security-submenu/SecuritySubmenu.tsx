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

import React, { FC, useState } from "react";
import { Drawer as AntDDrawer } from "antd";

import { Button } from "@/components";
import { FlexColumn } from "../flex-column";

import { ButtonVariants, RoutePaths } from "@/common/enum";
import { NavigationSubmenuProps } from "@/common/interface";

import { ActionSubmenu } from "../action-submenu";


import styles from "./security-submenu.module.scss";

export const SecuritySubmenu: FC<NavigationSubmenuProps> = ({ linkOnClick }) => {
  const [securityMenu, setSecurityMenu] = useState<boolean>(false);

  const showSlaProfiles = () => {
    setSecurityMenu(true);
  };

  const onSlaProfilesClose = () => {
    setSecurityMenu(false);
  };

  const closeSubmenu = () => {
    setSecurityMenu(false);
    linkOnClick();
  };

  const submenuTitle = <h1 className={styles.mainTitle}>Security</h1>;

  return (
    <>
      <Button customClass={styles.button} onClick={showSlaProfiles} variant={ButtonVariants.SECONDARY} text="Security" />
      <AntDDrawer
        title={submenuTitle}
        className={styles.mainBackground}
        width={320}
        closable={false}
        onClose={onSlaProfilesClose}
        open={securityMenu}
        placement="left"
      >
        <FlexColumn>
          <ActionSubmenu link={"Access Control Policy"} title={"Access Control Policy"}
            actions={[
              { name: "List", destination: RoutePaths.ACCESS_CONTROL_POLICIES },
              { name: "Create", destination: RoutePaths.ACCESS_CONTROL_POLICIES_CREATOR }
            ]} linkOnClick={closeSubmenu}>

          </ActionSubmenu>
          <ActionSubmenu link={"Geofencing Policy"} title={"Geofencing Policy"}
            actions={[
              { name: "List", destination: RoutePaths.GEOFENCING_POLICIES },
              { name: "Create", destination: RoutePaths.GEOFENCING_POLICIES_CREATOR }
            ]} linkOnClick={closeSubmenu}>

          </ActionSubmenu>
          <ActionSubmenu link={"Network Data Privacy Policy"} title={"Network Data Privacy Policy"}
            actions={[
              { name: "List", destination: RoutePaths.NETWORK_DATA_PRIVACY_POLICIES },
              { name: "Create", destination: RoutePaths.NETWORK_DATA_PRIVACY_POLICIES_CREATOR }
            ]} linkOnClick={closeSubmenu}>

          </ActionSubmenu>
          <ActionSubmenu link={"Traffic Inspection Policy"} title={"Traffic Inspection Policy"}
            actions={[
              { name: "List", destination: RoutePaths.TRAFFIC_INSPECTION_POLICIES },
              { name: "Create", destination: RoutePaths.TRAFFIC_INSPECTION_POLICIES_CREATOR }
            ]} linkOnClick={closeSubmenu}>

          </ActionSubmenu>
          
        </FlexColumn>
      </AntDDrawer>
    </>
  );
};
