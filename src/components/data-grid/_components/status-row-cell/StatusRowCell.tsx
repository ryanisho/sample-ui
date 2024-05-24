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

import { FC } from "react";

import cx from "classnames";

import styles from "./status-row-cell.module.scss";

interface StatusRowCellProps {
  value: "active" | "inactive"  | "inprogress" | undefined;
}

export const StatusRowCell: FC<StatusRowCellProps> = ({ value }) => {
  return (
    <div
      className={cx(styles.statusInfo, {
        [styles.statusActive]: value === "active",
        [styles.statusInactive]: value === "inactive",
        [styles.statusInProgress]: value === "inprogress",
        [styles.statusUnknown]: value === undefined || null,
      })}
    />
  );
};
