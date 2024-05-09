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
import { Radio as AntDRadio, Space, RadioGroupProps as AntDRadioProps } from "antd";

import { RadioOption } from "./radio-option";

import styles from "./radio-group.module.scss";

interface RadioProps extends Pick<AntDRadioProps, "value" | "defaultValue" | "id"> {
  name?: string;
  register?: any;
  options?: { name: string; value: string }[];
  direction?: "vertical" | "horizontal";
  onChange?: (value: string) => void;
}

export const RadioGroup: FC<RadioProps> = ({
  defaultValue,
  register = () => undefined,
  name,
  options,
  direction = "vertical",
  onChange = () => undefined,
}) => {
  return (
    <AntDRadio.Group
      defaultValue={defaultValue}
      {...register(name)}
      className={styles.radio}
      size="small"
      onChange={(e) => onChange(e.target.value)}
    >
      <Space direction={direction}>
        {options?.map(({ name, value }) => (
          <RadioOption value={value} name={name} key={value} />
        ))}
      </Space>
    </AntDRadio.Group>
  );
};
