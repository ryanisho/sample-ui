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

import styles from "./horizontal-container.module.scss";

interface HorizontalContainerProps {
  render: ReactNode;
  label?: string;
  flexedItemPlacement?: "start" | "center" | "end";
  isBold?: boolean;
}

export const HorizontalContainer: FC<HorizontalContainerProps> = ({ label, render, flexedItemPlacement, isBold }) => {
  return (
    <div className={cx(styles.container, `flex-${flexedItemPlacement}`)}>
      <span
        className={cx(styles.name, {
          [styles.boldTitle]: isBold,
        })}
      >
        {label && label.charAt(0).toUpperCase() + label.slice(1)}
      </span>
      {render}
    </div>
  );
};
