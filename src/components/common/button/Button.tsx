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
import { Button as AntDButton } from "antd";
import cx from "classnames";

import { ButtonVariants } from "@/common/enum";

import styles from "./button.module.scss";

interface PrimaryButtonProps {
  text: string;
  onClick: () => void;
  variant: ButtonVariants.PRIMARY;
  customClass?: string;
  iconSrc?: string;
}

interface SecondaryButtonProps {
  text: string;
  onClick: () => void;
  variant: ButtonVariants.SECONDARY;
  customClass?: string;
  iconSrc?: string;
}

interface TertiaryButtonProps {
  onClick: () => void;
  variant: ButtonVariants.TERTIARY;
  iconSrc?: string;
  customClass?: string;
  text?: string;
}

type ButtonProps = PrimaryButtonProps | SecondaryButtonProps | TertiaryButtonProps;

export const Button: FC<ButtonProps> = ({ customClass, onClick, text, iconSrc, variant }) => {
  return (
    <AntDButton
      className={cx(styles.btn, customClass, {
        [styles.btn__primary]: variant === ButtonVariants.PRIMARY,
        [styles.btn__secondary]: variant === ButtonVariants.SECONDARY,
        [styles.btn__tertiary]: variant === ButtonVariants.TERTIARY,
      })}
      onClick={onClick}
    >
      <span>{text}</span>
      {iconSrc && <img src={iconSrc} alt={text} />}
    </AntDButton>
  );
};
