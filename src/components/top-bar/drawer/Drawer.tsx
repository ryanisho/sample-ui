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

import { Drawer as AntDDrawer, DrawerProps as AntDDrawerProps } from "antd";
import logo from "@/assets/images/logo/logo1.png"

import { Button } from "@/components";
import styled from 'styled-components';
import {
  ApplicationsSubmenu,
  FlexColumn,
  InfrastructureSubmenu,
  NetworkSubmenu,
  SecuritySubmenu,
  ObservabilitySubmenu,
  DashboardSubmenu,
  UserSubmenu,
  EndpointSubmenu,
  SLOSubmenu,
} from "./_components";

import { applicationName } from "@/common/constants";
import { ButtonVariants, RoutePaths } from "@/common/enum";

import styles from "./drawer.module.scss";
import { useNavigate } from "react-router-dom";

export const Drawer: FC<AntDDrawerProps> = () => {
  const [openMainMenu, setOpenMainMenu] = useState<boolean>(false);

  const navigate = useNavigate()

  const showMainMenu = () => {
    setOpenMainMenu(true);
  };

  const linkOnClick = () => {
    setOpenMainMenu(false);
  };

  const DividerLine = styled.hr`
  border: 0;
  border-top: 1px solid #ccc;
  margin: 10px 0;
`;

  const mainTitle = <h1 className={styles.mainTitle}>CISCO - AUSM</h1>;

  return (
    <>
      <Button
        onClick={showMainMenu}
        variant={ButtonVariants.TERTIARY}
        customClass={styles.mainButton}
        //iconSrc={logo}
        text={applicationName}
      />
      <AntDDrawer
        className={styles.mainBackground}
        placement="left"
        title={<img src={logo} alt="AWI" style={{ width: '100%', height: 'auto' }} />}
        //width={370}
        closable={false}
        onClose={linkOnClick}
        onClick={showMainMenu}
        open={openMainMenu}
      >
        <FlexColumn>
          <DashboardSubmenu linkOnClick={linkOnClick}/>
          <InfrastructureSubmenu linkOnClick={linkOnClick}/>
          <DividerLine />
          <NetworkSubmenu linkOnClick={linkOnClick}/>
          <ApplicationsSubmenu linkOnClick={linkOnClick}/>
          <UserSubmenu linkOnClick={linkOnClick}/>
          <EndpointSubmenu linkOnClick={linkOnClick}/>
          <DividerLine />          
          <ObservabilitySubmenu linkOnClick={linkOnClick}/>
          <SecuritySubmenu linkOnClick={linkOnClick}/>
          <SLOSubmenu linkOnClick={linkOnClick}/>
          
        </FlexColumn>
      </AntDDrawer>
    </>
  );
};
