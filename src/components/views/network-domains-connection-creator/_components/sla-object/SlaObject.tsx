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
import { useQuery } from "@tanstack/react-query";

import { FormItem, Select, Wrapper, FlexItems, Tooltip } from "@/components";

import { slaContractTypes } from "@/common/constants";
import { fetchDataClient } from "@/common/utils";
import { Tooltips } from "@/common/enum";
import { SlaProfile } from "@/common/interface";


export const SlaObject: FC = () => {
  const { setValue, getValues } = useFormContext();

  const fetchedSlaProfiles = useQuery({
    queryKey: ["customSlaProfiles"],
    queryFn: () => fetchDataClient("custom_sla_profiles"),
    useErrorBoundary: true,
  });

  const slaProfiles = fetchedSlaProfiles.data?.map((profile: SlaProfile) => {
    console.log("SLA profile = ",profile)

    return {
      value: profile.metadata.name,
      bandwidth: profile.trafficSLO.QoSParams.bandwidth,
      jitter: profile.trafficSLO.QoSParams.jitter,
      latency: profile.trafficSLO.QoSParams.latency,
      loss: profile.trafficSLO.QoSParams.loss,
    };
  });

  const selectSlaProfile = (selectedProfile: string) => {
    const data = slaProfiles.find(({ value }: { value: string }) => value === selectedProfile);
    const networkSla = getValues("network_sla");
    setValue("network_sla", { ...networkSla, ...data });
  };

  const selectContractType = (selectedType: string) => {
    const data = slaContractTypes.find(({ label }) => label === selectedType);
    setValue("network_sla.type", data?.label);
  };

  const slaProfileFields = [
    {
      name: "slaSoftProfile",
      label: "Connection SLO",
      component: <Select options={slaProfiles} onChange={selectSlaProfile} />,
      rules: [
        {
          required: true,
          message: "Please select SLA profile.",
        },
      ],
    },
    {
      name: "contractType",
      label: "Type",
      component: (
        <FlexItems>
          <Tooltip title={Tooltips.SLA_TYPE} />
          <Select options={slaContractTypes} onChange={selectContractType} />
        </FlexItems>
      ),
      rules: [
        {
          required: true,
          message: "Please contract type.",
        },
      ],
    },
  ];

  return (
      <>
        {slaProfileFields.map(({ label, component, rules }, index) => (
          <FormItem label={label} key={index} rules={rules}>
            {component}
          </FormItem>
        ))}
      </>
  );
};
