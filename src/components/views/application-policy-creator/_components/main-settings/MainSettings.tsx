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

import { ChangeEvent, FC, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";

import { HorizontalContainer, Input, Textarea } from "@/components";

import { AppDispatch, RootState } from "@/store/store";
import {
  setApplicationConnectionDescription,
  setApplicationConnectionName,
} from "@/store/application-connection-slice/applicationConnectionSlice";

import styles from "./main-settings.module.scss";

export const MainSettings: FC = () => {
  const { data } = useSelector((state: RootState) => state.applicationConnection);

  const dispatch = useDispatch<AppDispatch>();

  const handleApplicationConnectionName = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(setApplicationConnectionName(value));
  };

  const handleApplicationConnectionDescription = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(setApplicationConnectionDescription(value));
  };

  const textAreaSize = {
    rows: 1,
    cols: 70,
  };

  return (
    <section className={styles.topBar}>
      <HorizontalContainer
        label="Name"
        render={<Input onChange={handleApplicationConnectionName} defaultValue={data.metadata.name}/>}
        flexedItemPlacement="start"
      />
      <HorizontalContainer
        label="Description"
        render={
          <Textarea
            size={textAreaSize}
            onChange={handleApplicationConnectionDescription}
          />
        }
        flexedItemPlacement="start"
      />
    </section>
  );
};
