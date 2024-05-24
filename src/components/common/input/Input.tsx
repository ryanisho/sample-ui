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

import cx from "classnames";

import styles from "./input.module.scss";

interface InputProps {
  disabled?: boolean;
  value?: string;
  placeholder?: string;
  name?: string;
  register?: any;
  type?: string;
  onChange?: any;
  defaultValue?: string;
}

export const Input: FC<InputProps> = ({
  value,
  onChange,
  defaultValue,
  disabled,
  type,
  name,
  placeholder,
  register = () => undefined,
}) => {
  return (
    <input
      type={type}
      disabled={disabled}
      className={cx(styles.antInput, {
        [styles.disabled]: disabled,
      })}
      placeholder={placeholder}
      {...register(name)}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
    />
  );
};
