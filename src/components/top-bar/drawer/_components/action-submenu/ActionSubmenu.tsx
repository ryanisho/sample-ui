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
import { Link } from "react-router-dom";
import { Drawer as AntDDrawer } from "antd";

import { Button } from "@/components";
import { FlexColumn } from "../flex-column";

import { ButtonVariants } from "@/common/enum";
import { ActionSubmenuProps } from "@/common/interface";

import styles from "./actions-submenu.module.scss";

export const ActionSubmenu: FC<ActionSubmenuProps> = ({ linkOnClick, actions, title, link }) => {
  const [actionSubmenu, setActionSubmenu] = useState<boolean>(false);

  const closeSubmenu = () => {
    setActionSubmenu(false);
    linkOnClick();
  };

  const submenuTitle = <h1 className={styles.mainTitle}>{title}</h1>;

  return (
    <>
      <Button
        customClass={styles.link}
        onClick={() => setActionSubmenu(true)}
        variant={ButtonVariants.SECONDARY}
        text={link}
      />
      <AntDDrawer
        className={styles.mainBackground}
        title={submenuTitle}
        width={350}
        closable={false}
        onClose={() => setActionSubmenu(false)}
        open={actionSubmenu}
        placement="left"
      >
        <FlexColumn>
          {
            actions.map(({ name, destination }) =>
              <Link key={name} className={styles.link} onClick={closeSubmenu} to={destination}>{name}</Link>)
          }
        </FlexColumn>
      </AntDDrawer>
    </>
  );
};
