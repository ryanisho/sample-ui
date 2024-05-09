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

import React from 'react';
import styles from "./access-policy-display.module.scss";
import { NetworkAccessControl } from "@/_proto/grpc-service/ts/app_connection";

export const AccessPolicyDisplay = ({ accessType, networkAccessControl, networkPolicySelector }: {
                                      accessType?: string;
                                      networkPolicySelector?: string;
                                      networkAccessControl?: NetworkAccessControl[]
                                    }
) => {
  const capitalize = (words: string): string => words.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  const accessStyle = (accessType == "deny") ? styles.deny : styles.allow
  return (
    <div className={styles.component}>
      <h2>
        policy:
      </h2>
      <div className={styles.config}>
        <div className={styles.item}>
          <h3>Access Policy</h3>
          <div className={styles.policy}><p
            className={accessStyle}> {(accessType) ? capitalize(accessType) : null}</p></div>
        </div>
        <div className={styles.item}>
          <h3>Access Control</h3>
          {networkAccessControl ? networkAccessControl.map((acp, index) => {
            return <li key={index}> {acp.protocol + " using port " + acp.port}</li>
          }) : null}
        </div>
        <div className={styles.item}>
          <h3>Application SLO</h3>
          <p> {networkPolicySelector}</p>
        </div>
      </div>
    </div>
  );
};
