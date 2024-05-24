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
import cx from "classnames";

import styles from "./flex-items.module.scss";

interface FlexItems {
  children: ReactNode;
  flexDirectionColumn?: boolean;
}

export const FlexItems: FC<FlexItems> = ({ flexDirectionColumn, children }) => {
  return (
    <div
      className={cx(styles.flexItems, {
        [styles.flexDirectionColumn]: flexDirectionColumn,
      })}
    >
      {children}
    </div>
  );
};
