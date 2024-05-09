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

import AceEditor from "react-ace";
import { ShareButton, stringOfYAML } from "@/components";
import { Button, Drawer } from "antd";
import React, { FC } from "react";
import styles from "./yaml-side-drawer.module.scss"
import download from "@/assets/icons/download.svg";
import { saveAs } from "file-saver";

export interface YAMLSideDrawerProps {
  open: boolean,
  onClose: () => void
  yamlSource: object,
  width: number | string;
}

export const YAMLSideDrawer: FC<YAMLSideDrawerProps> = ({ open, onClose, yamlSource, width }) => {
  const handleDownload = () => {
    const blob = new Blob([stringOfYAML(yamlSource)], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "downloaded-yaml.yaml");
  }

  return <Drawer
    open={open}
    onClose={onClose}
    mask={false}
    placement="right"
    destroyOnClose
    title={"YAML Preview"}
    width={width}
    bodyStyle={{ padding: 0 }}
  >
    <div className={styles.container}>
      <div className={styles.share}>
        <Button icon={<img alt={"download"} style={{ maxWidth: "100%", maxHeight: "100%", padding: "1px", }}
                           src={download} onClick={handleDownload}></img>}></Button>
        <ShareButton/>
      </div>
      <AceEditor
        mode="yaml"
        theme="eclipse"
        name="YAML_PREVIEW"
        wrapEnabled
        setOptions={{ useWorker: false }}
        value={stringOfYAML(yamlSource)}
        className="border shadow-sm"
        style={{ width: "100%", flexGrow: 1 }}
        showPrintMargin={false}
        readOnly
      />
    </div>
  </Drawer>
}