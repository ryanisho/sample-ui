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

import React, { FC, useState } from 'react';
import { CreateAppConnectionPolicyRequest } from "@/_proto/grpc-service/ts/app_connection";
import { cleanAppConnection } from "@/components/views/application-policy-creator";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { createChannel, createClient } from "nice-grpc-web";
import { AppConnectionControllerDefinition } from "@/_proto/grpc-service/ts/app_connection_controller";
import { Modal } from "antd";
import { TagPolicy } from "@/components/views/application-policy-creator/_components/tag";
import { RoutePaths } from "@/common/enum";
import { useNavigate } from "react-router-dom";
import { setPolicy } from "@/store/application-connection-deployer-slice/applicationConnectionDeployerSlice";
import { capitalizeStrings } from "@/common/utils";
import { useFetchAppConnectionPolicies } from "@/common/hooks";
import { BACKEND_API_PREFIX } from "@/common/constants";

export const CreateOptions: FC = () => {
  const [modalState, setModalState] = useState<"save" | "deploy" | undefined>(undefined);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { data } = useSelector((state: RootState) => state.applicationConnection);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const { fetchAppConnectionPolicies } = useFetchAppConnectionPolicies()

  const appConnectionClient = createClient(AppConnectionControllerDefinition, createChannel(BACKEND_API_PREFIX))

  const buttonRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "100%"
  };

  const buttonStyle = {
    // Button styles here
    padding: "10px 20px",
    backgroundColor: "DarkGray",
    color: "white",
    borderRadius: "5px",
  };

  const handleSave = () => {
    setModalState("save");
  };

  const handleAttach = () => {
    setModalState("deploy");
  };

  const handleSaveOk = () => {
    setConfirmLoading(true);
    const request = CreateAppConnectionPolicyRequest.create({ appConnection: cleanAppConnection(data.spec.appConnection) })
    appConnectionClient.createAppConnectionPolicy(request).then(response => {
      setTimeout(() => {
        setConfirmLoading(false)
        if (modalState === "deploy") {
          fetchAppConnectionPolicies()
          dispatch(setPolicy(response.id))
          navigate(RoutePaths.APPLICATION_CONNECTION_ATTACHMENT)
        }
        setModalState(undefined)
        console.log(response)
      }, 500)
    }).catch(error => {
      setConfirmLoading(false)
      console.log(error, "Static response");
    })
  }

  return (
    <>
      <Modal
        title="Tag your policy before saving [Optional]"
        open={modalState !== undefined}
        onOk={handleSaveOk}
        okText={capitalizeStrings(modalState ?? "")}
        confirmLoading={confirmLoading}
        onCancel={() => setModalState(undefined)}
        destroyOnClose
      >
        <TagPolicy></TagPolicy>
      </Modal>
      <div style={buttonRowStyle}>
        <button style={buttonStyle} onClick={handleSave}>
          Save
        </button>
        <button style={buttonStyle} onClick={handleAttach}>
          Deploy
        </button>
      </div>
    </>
  )
    ;
}