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

import { ChangeEvent, FC } from "react";
import { useFormContext } from "react-hook-form";

import styles from "./input-number.module.scss";

interface InputNumberProps {
  min: number;
  max: number;
  name: string;
}

export const InputNumber: FC<InputNumberProps> = ({ min, max, name }) => {
  const { register } = useFormContext();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value > max) {
      event.target.value = max.toString();
    }
    if (value < 0) {
      event.target.value = min.toString();
    }
    return register(name).onChange;
  };

  return <input type="number" {...register(name)} className={styles.numberInput} min={min} max={max} onChange={onChange} />;
};
