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

import styles from "./wrapper.module.scss";
import cx from "classnames";

interface WrapperProps {
  title: string;
  children: ReactNode;
  capitalized?: boolean;
  maxWidth?: string;
  customStyles?: string;
  expand?:boolean
}

export const Wrapper: FC<WrapperProps> = ({ title, children, capitalized, maxWidth, customStyles, expand }) => {
  return (
    <div style={{ maxWidth: maxWidth, height:"100%", ...(expand ? {width:"100%"} : {}) }} className={cx(styles.wrapper, customStyles)}>
      {capitalized ? (
        <h2 className={styles.title}>{title.toUpperCase()}</h2>
      ) : (
        <h2 className={styles.title}>{title.charAt(0).toUpperCase() + title.slice(1)}</h2>
      )}

      {children}
    </div>
  );
};
