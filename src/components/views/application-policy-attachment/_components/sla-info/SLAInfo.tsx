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

import { FC } from "react";

import styles from "./sla-info.module.scss";
import { SlaProfile } from "@/common/interface";
import { FaLongArrowAltRight } from "react-icons/fa";

export const SLAInfo: FC<{ data?: SlaProfile }> = ({ data }) => {
  return <div className={styles.verticalContainer}>
    <FaLongArrowAltRight style={{ margin: "-25% 0" }} size={250} color={"#1e4471"}/>
    <p className={styles.text}>Jitter: {data?.trafficSLO.QoSParams.jitter}, Loss: {data?.trafficSLO.QoSParams.loss}, Bandwidth: {data?.trafficSLO.QoSParams.bandwidth},
      Latency: {data?.trafficSLO.QoSParams.latency}</p>
  </div>
};