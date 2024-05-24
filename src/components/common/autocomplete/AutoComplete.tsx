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
import { AutoComplete as AntDAutocomplete, AutoCompleteProps as AntDAutoCompleteProps } from "antd";

import styles from "./autocomplete.module.scss";

type AutoCompleteProps = Pick<AntDAutoCompleteProps, "options" | "placeholder"> & {
  onChange: any;
};

export const AutoComplete: FC<AutoCompleteProps> = ({ options, placeholder, onChange }) => {
  return (
    <AntDAutocomplete
      allowClear
      size="middle"
      options={options}
      onChange={(value) => onChange(value)}
      className={styles.autocomplete}
      placeholder={placeholder}
      filterOption={true}
    />
  );
};
