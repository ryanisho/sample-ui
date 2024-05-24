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

import { HorizontalContainer, Wrapper } from "@/components";

import styles from "./network-domain-info.module.scss";
import { NetworkDomainObject } from "@/_proto/grpc-service/ts/network_domain";

export const NetworkDomainInfo: FC<{ data?: NetworkDomainObject, title: string }> = ({ data, title }) => {

  return (
    <Wrapper customStyles={styles.section} title={title} maxWidth="350px">
      <div style={{ margin: "10px"}}>
        <section>
          <HorizontalContainer
            label="Name"
            render={data?.name}
            flexedItemPlacement="start"
          />
          <HorizontalContainer
            label="Type"
            render={data?.type}
            flexedItemPlacement="start"
          />
          <HorizontalContainer
            label="ID"
            render={data?.id}
            flexedItemPlacement="start"
          />
          <HorizontalContainer
            label="Provider"
            render={data?.provider}
            flexedItemPlacement="start"
          />
        </section>
      </div>

    </Wrapper>
  );
};