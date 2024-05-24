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

import { Form, Select, Tooltip, FlexItems, Wrapper } from "@/components/";

import { Tooltips } from "@/common/enum";
import { NetworkDomain } from "@/common/interface";

interface DestinationObjectProps {
  networkDomains: NetworkDomain[];
}

export const DestinationObject: FC<DestinationObjectProps> = ({ networkDomains }) => {
  const { watch, setValue, getValues } = useFormContext();
  const sourceId = watch("source.id");

  const destinationOptions = networkDomains?.map(({ id, name, provider, region }, index) => {
    return {
      label: `${name} (${provider} | ${region} | ${id})`,
      value: id,
      key: index + id,
      disabled: id === sourceId,
    };
  });

  const changeSelectedValue = (destinationId: string) => {
    const data = networkDomains?.find((networkDomain) => networkDomain.id === destinationId);
    const destinationObj = getValues("destination");
    setValue("destination", { ...destinationObj, ...data });
  };

  const destinationFields = [
    {
      name: "destinationName",
      label: "Destination Network Domain",
      component: (
        <FlexItems>
          <Tooltip title={Tooltips.NETWORK_DOMAIN} />
          <Select onChange={changeSelectedValue} options={destinationOptions} />
        </FlexItems>
      )
    }
  ];

  return (
      <Form fields={destinationFields} />
  );
};
