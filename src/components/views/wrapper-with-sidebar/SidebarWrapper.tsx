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

import { FC, ReactNode } from "react";

import styles from "./sidebar-wrapper.module.scss";
import cx from "classnames";

interface WrapperProps {
  title: string | ReactNode;
  children?: ReactNode;
  rightSidebar: ReactNode
}

export const SidebarWrapper: FC<WrapperProps> = ({ title, children, rightSidebar }) => {
  return (
    <section className={styles.section}>
      <div>
        <h1 className={styles.sectionTitle}>
          {typeof title === "string" ? title.charAt(0).toUpperCase() + title.slice(1) : title}
        </h1>
        {children}
      </div>
      <div className={styles.main}>
        {rightSidebar}
      </div>
    </section>
  );
};
