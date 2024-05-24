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

import { FormProvider, useForm } from "react-hook-form";

import { Clusters } from ".";
import { Wrapper } from "@/components/views/wrapper";
import { useState } from "react";
import { ClusterProviderAndAccount } from "../list-infra-resources/_components/clusters/_components/ClusterProviderAndAccount";

export const ListClusterResources = () => {
  const methods = useForm();
  const [isClusterDrawerVisible, setIsClusterDrawerVisible] = useState(false);

  return (
    <Wrapper title="Kubernetes Clusters Across All Providers">
      <FormProvider {...methods}>
        <ClusterProviderAndAccount />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Clusters isClusterDrawerVisible={isClusterDrawerVisible} setIsClusterDrawerVisible={setIsClusterDrawerVisible} />
        </div>
      </FormProvider>
    </Wrapper>
  );
};

