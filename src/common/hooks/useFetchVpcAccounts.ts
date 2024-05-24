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

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { setAccountIds } from "@/store/infra-resources-slice/infraResourcesSlice";
import { openNotification } from "@/common/utils";
import { BACKEND_API_PREFIX } from "@/common/constants";

const { ListAccountsRequest } = require("@/_proto/infra-sdk/output/cloud_pb");
const { CloudProviderServiceClient } = require("@/_proto/infra-sdk/output/cloud_grpc_web_pb");

const infraSdkResourcesClient = new CloudProviderServiceClient(BACKEND_API_PREFIX, null, null);
const vpcAccountsListRequest = new ListAccountsRequest();

export const useFetchVpcAccounts = (provider: string) => {
  const [vpcAccounts, setVpcAccounts] = useState<any[]>([]);

  const dispatch = useDispatch();

  vpcAccountsListRequest.setProvider(provider);

  const fetchAccounts = () => {
    try {
      infraSdkResourcesClient.listAccounts(vpcAccountsListRequest, {}, (err: any, response: any) => {
        const data = response?.getAccountsList();
        if (data) {
          const accounts = data.map((account: any) => {
            const accountId = account.getId();

            return { accountId };
          });

          setVpcAccounts([...accounts]);
        }
      });
    } catch (e: any) {
      console.log("error", e);
      openNotification.error("Fetching accounts list failed. Please check error logs and try again later.");
    }
  };

  useEffect(() => {
    if (vpcAccounts.length > 0) {
      dispatch(setAccountIds(vpcAccounts));
    }
  }, [vpcAccounts]);

  return { vpcAccounts, fetchAccounts };
};
