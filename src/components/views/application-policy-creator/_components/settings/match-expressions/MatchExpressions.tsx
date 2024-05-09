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

import { Button, Input, Select, HorizontalContainer, Tooltip } from "@/components";

import { ButtonVariants } from "@/common/enum";
import { MatchExpression } from "@/common/interface";
import { matchExpressionsOptions } from "@/common/constants";
import { Tooltips } from "@/common/enum";

import enter from "@/assets/icons/enter.png";

import styles from "./match-expressions.module.scss";

export const MatchExpressions: FC<MatchExpression> = ({ reduxStateUpdateHandler }) => {
  const [expressionKey, setExpressionKey] = useState<string>("");
  const [expressionOperator, setExpressionOperator] = useState<string>("");
  const [expressionValues, setExpressionValues] = useState<any>("");
  const [matchExpressions, setMatchExpressions] = useState<any[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddMatchExpression = () => {
    if (expressionKey && expressionOperator && expressionValues) {
      // Perform your submit logic here, e.g., pushing the data
      const newMatchExpression = {
        key: expressionKey,
        operator: expressionOperator,
        values: expressionValues,
      };

      // You can also pass the data to a parent component or an API endpoint

      setMatchExpressions((prevExpressions) => [...prevExpressions, newMatchExpression]);
      reduxStateUpdateHandler(newMatchExpression);

      // Clear the input values after submitting
      setExpressionKey("");
      setExpressionOperator("");
      setExpressionValues("");
    }
  };

  const handleOperatorChange = (value: string) => {
    setExpressionOperator(value);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={styles.matchExpressions} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <h2 className={styles.title}>
        Match Expressions <Tooltip title={Tooltips.MATCH_EXPRESSIONS} />{" "}
      </h2>
      <HorizontalContainer
        render={<Input value={expressionKey} onChange={(e: any) => setExpressionKey(e.target.value)} />}
        label="Key"
        flexedItemPlacement={"start"}
      />
      <HorizontalContainer
        label="Operator"
        render={<Select onChange={handleOperatorChange} options={matchExpressionsOptions} value={expressionOperator} />}
        flexedItemPlacement="start"
      />
      <HorizontalContainer
        render={
          <>
            <Input value={expressionValues} onChange={(e: any) => setExpressionValues(e.target.value)} />
            <Button onClick={handleAddMatchExpression} variant={ButtonVariants.TERTIARY} iconSrc={enter} text="" />
          </>
        }
        label="Values"
        flexedItemPlacement={"start"}
      />

      {isHovered && matchExpressions.length > 0 && (
        <div className={styles.labelsContainer}>
          <h2 className={styles.title}>Created Expressions:</h2>
          <ul>
            {matchExpressions.map((expression, index) => (
              <li key={index}>
                Key: {expression.key}, Operator: {expression.operator}, Values: {expression.values}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
