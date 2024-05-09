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

import React, { FC } from "react";

import { HorizontalContainer, Input, Tooltip } from "@/components";

import { MatchPrefixModel } from "@/common/interface/matchPrefix.model";
import { Tooltips } from "@/common/enum";

import styles from "./match-prefix.module.scss";

export const MatchPrefix: FC<MatchPrefixModel> = ({ handleMatchPrefixChange }) => {
  return (
    <div className={styles.matchPrefix}>
      <h2 className={styles.title}>
        Match Prefix: <Tooltip title={Tooltips.MATCH_PREFIX} />{" "}
      </h2>
      <HorizontalContainer
        render={<Input onChange={(e: any) => handleMatchPrefixChange(e)} />}
        label="Match Prefix:" 
        flexedItemPlacement={"start"}
      />
    </div>
  );
};
