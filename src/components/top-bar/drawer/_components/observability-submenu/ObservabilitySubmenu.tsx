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

import styles from "./observability-submenu.module.scss";

export const ObservabilitySubmenu: FC<NavigationSubmenuProps> = ({ linkOnClick }) => {
  const [observabilityMenu, setObservabilityMenu] = useState<boolean>(false);

  const showSlaProfiles = () => {
    setObservabilityMenu(true);
  };

  const onSlaProfilesClose = () => {
    setObservabilityMenu(false);
  };

  const closeSubmenu = () => {
    setObservabilityMenu(false);
    linkOnClick();
  };

  const submenuTitle = <h1 className={styles.mainTitle}>Observability</h1>;

  return (
    <>
      <Button customClass={styles.button} onClick={showSlaProfiles} variant={ButtonVariants.SECONDARY} text="Observability"/>
      <AntDDrawer
        title={submenuTitle}
        className={styles.mainBackground}
        width={370}
        closable={false}
        onClose={onSlaProfilesClose} 
        open={observabilityMenu}
        placement="left"
      >
        <FlexColumn>
          <ActionSubmenu link={"Connection Monitoring Policy"} title={"Connection Monitoring Policy"}
                         actions={[
                           { name: "List", destination: RoutePaths.MONITORING_POLICIES },
                           { name: "Create", destination: RoutePaths.MONITORING_POLICIES_CREATOR }
                         ]} linkOnClick={closeSubmenu}></ActionSubmenu>
          <ActionSubmenu link={"Connection Logging Policy"} title={"Connection Logging Policy"}
                         actions={[
                           { name: "List", destination: RoutePaths.LOGGING_POLICIES },
                           { name: "Create", destination: RoutePaths.LOGGING_POLICIES_CREATOR }
                         ]} linkOnClick={closeSubmenu}></ActionSubmenu>
          <ActionSubmenu link={"Metrics Collection Policy"} title={"Metrics Collection Policy"}
                         actions={[
                           { name: "List", destination: RoutePaths.NETWORK_DOMAIN_CONNECTIONS },
                           { name: "Create", destination: RoutePaths.CONNECTION_CREATOR }
                         ]} linkOnClick={closeSubmenu}></ActionSubmenu>
          <ActionSubmenu link={"Alerting Policy"} title={"Alerting Policy"}
                         actions={[
                           { name: "List", destination: RoutePaths.SLA_PROFILES },
                           { name: "Create", destination: RoutePaths.SLA_PROFILE_CREATOR }
                         ]} linkOnClick={closeSubmenu}></ActionSubmenu>
          <ActionSubmenu link={"Packet Tracing Policy"} title={"Packet Tracing Policy"}
                         actions={[
                           { name: "List", destination: RoutePaths.SLA_PROFILES },
                           { name: "Create", destination: RoutePaths.SLA_PROFILE_CREATOR }
                         ]} linkOnClick={closeSubmenu}></ActionSubmenu>
        </FlexColumn>
      </AntDDrawer>
    </>
  );
};
