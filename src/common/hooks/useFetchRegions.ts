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

import { setRegionNames } from "@/store/infra-resources-slice/infraResourcesSlice";
import { openNotification } from "@/common/utils";
import { BACKEND_API_PREFIX } from "@/common/constants";

const { ListRegionsRequest } = require("@/_proto/infra-sdk/output/cloud_pb");
const { CloudProviderServiceClient } = require("@/_proto/infra-sdk/output/cloud_grpc_web_pb");

const infraSdkResourcesClient = new CloudProviderServiceClient(BACKEND_API_PREFIX, null, null);
const vpcRegionsListRequest = new ListRegionsRequest();

export const useFetchRegions = (provider: string) => {
  const [vpcRegions, setVpcRegions] = useState<any[]>([]);

  const dispatch = useDispatch();
  vpcRegionsListRequest.setProvider(provider);


  const fetchRegions = () => {
    try {
      infraSdkResourcesClient.listRegions(vpcRegionsListRequest, {}, (err: any, response: any) => {
        const data = response?.getRegionsList();
        if (data) {
          const regions = data.map((region: any) => {
            const regionName = region.getName();
            return { regionName };
          });
          setVpcRegions([...regions]);
        }
      });
    } catch (e: any) {
      console.log("error", e);
      openNotification.error("Fetching regions list failed. Please check error logs and try again later.");
    }
  };

  useEffect(() => {
    if (vpcRegions.length > 0) {
      dispatch(setRegionNames(vpcRegions));
    }
  }, [vpcRegions]);

  return { vpcRegions, fetchRegions };
};
