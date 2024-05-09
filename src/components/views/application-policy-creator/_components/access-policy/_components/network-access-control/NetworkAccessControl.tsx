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

import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Button, HorizontalContainer, Input, Select } from "@/components";

import { protocolOptions } from "@/common/constants";
import { ButtonVariants } from "@/common/enum";
import { NetworkAccessControlPortProtocolModel } from "@/common/interface";
import { AppDispatch } from "@/store/store";
//import { setNetworkAccessControl } from "@/store/application-connection-slice/applicationConnectionSlice";

import enter from "@/assets/icons/enter.png";

import styles from "./network-access-control.module.scss";

export const NetworkAccessControl = () => {
  const [protocolPortPairs, setProtocolPortPairs] = useState<NetworkAccessControlPortProtocolModel[]>([]);
  const [protocol, setProtocol] = useState("");
  const [port, setPort] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  //
  const handleProtocolPortPair = () => {
    if (protocol) {
      const newProtocolPortPair: NetworkAccessControlPortProtocolModel = {
        protocol: protocol,
      };

      if (port) {
        newProtocolPortPair.port = port;
      }

      setProtocolPortPairs((prev) => [...prev, newProtocolPortPair]);
      //dispatch(setNetworkAccessControl(newProtocolPortPair));

      setPort("");
      setProtocol("");
    }
  };

  const handleProtocolChange = (protocol: string) => {
    setProtocol(protocol);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <section className={styles.networkAccessControl} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <h2 className={styles.title}>Network Access Control</h2>
      <HorizontalContainer
        label="Protocol"
        render={<Select onChange={handleProtocolChange} options={protocolOptions} value={protocol} />}
        flexedItemPlacement="start"
      />
      <HorizontalContainer
        render={
          <>
            <Input value={port} onChange={(e: any) => setPort(e.target.value)} />
            <Button onClick={handleProtocolPortPair} variant={ButtonVariants.TERTIARY} text="" iconSrc={enter} />
          </>
        }
        label="Port"
        flexedItemPlacement={"start"}
      />
      {isHovered && protocolPortPairs.length > 0 && (
        <div className={styles.labelsContainer}>
          <h2 className={styles.title}>Created protocol and port pairs:</h2>
          <ul>
            {protocolPortPairs.map((expression, index) => (
              <li key={index}>
                Protocol: {expression.protocol}
                {expression.port && <>, Port: {expression.port}</>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
