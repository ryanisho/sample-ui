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
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-eclipse";
import { Wrapper } from "@/components";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ShareButton } from "@/components/share-button/ShareButton.jsx"

import styles from "./yaml-live-preview.module.scss";
import { stringOfYAML } from "@/components/views/application-policy-creator";
import { CreateOptions } from "@/components/views/application-policy-creator/_components/CreateOptions";

const YAML = require("yaml");

export const YamlLivePreview: FC = () => {
  const { data } = useSelector((state: RootState) => state.applicationConnection);

  return (
    <Wrapper title="YAML Preview" expand>
      <div className={styles.main}>
        <div style={{ flexGrow: 1 }}>
          <div className={styles.share}>
            <ShareButton/>
          </div>
          <AceEditor
            mode="yaml"
            theme="eclipse"
            name="YAML_PREVIEW"
            editorProps={{ $blockScrolling: true }}
            setOptions={{ useWorker: false }}
            value={stringOfYAML((data))}
            className="border shadow-sm"
            style={{ width: "100%", marginBottom: "15px" }}
            showPrintMargin={false}
          />
        </div>
        <CreateOptions/>
      </div>
    </Wrapper>
  );
};
