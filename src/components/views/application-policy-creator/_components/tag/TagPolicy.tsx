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

import React, { FC, useState } from "react";

import { Button, HorizontalContainer, Input } from "@/components";

import { ButtonVariants } from "@/common/enum";

import enter from "@/assets/icons/enter.png";
import { useDispatch } from "react-redux";
import { setMetadataLabels } from "@/store/application-connection-slice/applicationConnectionSlice";

export const TagPolicy: FC = () => {
  const [localLabels, setLocalLabels] = useState<{ key: string; value: string }[]>([]);
  const [keyInput, setKeyInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [selectedLabel, setSelectedLabel] = useState<any>(null);
  const dispatch = useDispatch()

  const handleAddLabel = () => {
    if (keyInput && valueInput) {
      const newLocalLabel = { key: keyInput, value: valueInput };
      const newGlobalLabel = { [keyInput]: valueInput };

      setLocalLabels((prevLabels) => [...prevLabels, newLocalLabel]);
      dispatch(setMetadataLabels(newGlobalLabel));

      setKeyInput("");
      setValueInput("");
    }
  };

  const handleRemoveLabel = (label: any) => {
    const updatedLabels = localLabels.filter((l) => l !== label);
    setLocalLabels(updatedLabels);
    setSelectedLabel(null);
  };


  return (
    <div>
      <HorizontalContainer
        render={<Input value={keyInput} onChange={(e: any) => setKeyInput(e.target.value)}/>}
        label="Key"
        flexedItemPlacement={"start"}
      />
      <HorizontalContainer
        render={
          <>
            <Input value={valueInput} onChange={(e: any) => setValueInput(e.target.value)}/>
            <Button variant={ButtonVariants.TERTIARY} onClick={handleAddLabel} iconSrc={enter} text=""/>
          </>
        }
        label="Value"
        flexedItemPlacement={"start"}
      />
      <div>
        <h3>Created tags:</h3>
        <ul>
          {localLabels.map((label, index) => (
            <li key={index}>
              {label.key}: {label.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
