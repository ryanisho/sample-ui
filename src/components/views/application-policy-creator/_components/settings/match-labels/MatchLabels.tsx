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

import React, { FC, useState } from "react";

import { Button, HorizontalContainer, Input } from "@/components";

import { ButtonVariants } from "@/common/enum";
import { MatchLabel } from "@/common/interface";

import enter from "@/assets/icons/enter.png";

import styles from "./match-labels.module.scss";

export const MatchLabels: FC<MatchLabel> = ({ reduxStateUpdateHandler }) => {
  const [localLabels, setLocalLabels] = useState<{ key: string; value: string }[]>([]);
  const [keyInput, setKeyInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<any>(null);

  const handleAddLabel = () => {
    // Check if both inputs have values
    if (keyInput && valueInput) {
      // Create a new label object
      const newLocalLabel = { key: keyInput, value: valueInput };
      const newGlobalLabel = { [keyInput]: valueInput };

      // Push the new label to localLabels state
      setLocalLabels((prevLabels) => [...prevLabels, newLocalLabel]);

      // Update global redux state for endpoint match labels; does not work correctly
      reduxStateUpdateHandler(newGlobalLabel);

      // Reset the input fields
      setKeyInput("");
      setValueInput("");
    }
  };

  const handleRemoveLabel = (label: any) => {
    // Filter out the selected label from localLabels
    const updatedLabels = localLabels.filter((l) => l !== label);

    // Update the localLabels state
    setLocalLabels(updatedLabels);

    // Clear the selected label
    setSelectedLabel(null);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={styles.matchLabels} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <h2 className={styles.title}>Match Labels</h2>
      <HorizontalContainer
        render={<Input value={keyInput} onChange={(e: any) => setKeyInput(e.target.value)} />}
        label="Key"
        flexedItemPlacement={"start"}
      />
      <HorizontalContainer
        render={
          <>
            <Input value={valueInput} onChange={(e: any) => setValueInput(e.target.value)} />
            <Button variant={ButtonVariants.TERTIARY} onClick={handleAddLabel} iconSrc={enter} text="" />
          </>
        }
        label="Value"
        flexedItemPlacement={"start"}
      />
      {isHovered && localLabels.length > 0 && (
        <div className={styles.labelsContainer}>
          <h2 className={styles.title}>Created labels:</h2>
          <ul>
            {localLabels.map((label, index) => (
              <li key={index}>
                {label.key}: {label.value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
