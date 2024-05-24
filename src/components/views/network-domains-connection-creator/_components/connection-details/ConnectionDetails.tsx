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
import { useFormContext } from "react-hook-form";

import { TextList, Wrapper } from "@/components";

import { defaultSlaSchema, networkDomainSchema, serverStatus } from "@/common/constants";

import styles from "./connection-details.module.scss";

export const ConnectionDetails: FC = () => {
  const { watch } = useFormContext();

  const customSlaDetails = watch("network_sla");
  const sourceDetails = watch("source");
  const destinationDetails = watch("destination");

  return (
    <article className={styles.detailsContainer}>
      <section className={styles.details}>
        <Wrapper title="Source">
          {sourceDetails && (
            <TextList
              data={sourceDetails}
              schema={serverStatus === "live" ? networkDomainSchema.grpcServer : networkDomainSchema.stubServer}
            />
          )}
        </Wrapper>
        <Wrapper title="Destination">
          {destinationDetails && (
            <TextList
              data={destinationDetails}
              schema={serverStatus === "live" ? networkDomainSchema.grpcServer : networkDomainSchema.stubServer}
            />
          )}
        </Wrapper>
        <Wrapper title="Network Transport SLO">
          {customSlaDetails && <TextList data={customSlaDetails} schema={defaultSlaSchema}/>}
        </Wrapper>
      </section>
    </article>
  );
};
