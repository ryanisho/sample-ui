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

import axios, { AxiosRequestConfig } from "axios";

import { TEST_API_URL } from "@/common/constants";

export const fetchDataClient = async (endpoint: string, options?: AxiosRequestConfig) => {
  const { ...customConfig } = options ?? {};

  const headers = {
    "Content-Type": "application/json",
  };

  const config: AxiosRequestConfig = {
    url: TEST_API_URL + endpoint,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
    ...customConfig,
  };

  try {
    console.log (config)
    const response = await axios(config);

    return response.data;
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Promise.reject(error);
  }
};
