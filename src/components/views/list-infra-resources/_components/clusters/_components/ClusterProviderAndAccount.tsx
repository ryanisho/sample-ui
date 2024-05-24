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

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import { useFormContext } from "react-hook-form";

import { ComboBox, Tooltip } from "@/components";

import { muiButtonColorHandler } from "@/common/utils";
import { AppDispatch, RootState } from "@/store/store";
import { useFetchVpcAccounts, useFetchRegions, useFetchVpcResourceClusters } from "@/common/hooks";
import { ComboBoxVariants, InfraResourceType, Tooltips } from "@/common/enum";
import { setInfraClusterSelectedRow, setInfraVpcs, setResourceFetchedEntities, setResourceType } from "@/store/infra-resources-slice/infraResourcesSlice";
import { InfraResourceProvider } from "@/common/enum";
import { DataGrid } from "@mui/x-data-grid/DataGrid";

export const ClusterProviderAndAccount = () => {
  const { accounts } = useSelector((state: RootState) => state.infraResources);
  const { regions } = useSelector((state: RootState) => state.infraResources);

  const { watch } = useFormContext();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedAccountId, setSelectedAccountId] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const selectedProvider = watch("provider");
  const [lastClickedProvider, setLastClickedProvider] = useState('');
  const { fetchAccounts } = useFetchVpcAccounts(lastClickedProvider);


  const { setValue } = useFormContext();


  const { fetchVpcResourcesClusters } = useFetchVpcResourceClusters(selectedProvider, selectedRegion, "", selectedAccountId);
  const { fetchRegions } = useFetchRegions(lastClickedProvider);

  const accountIds: any[] = accounts.reduce((uniqueIds: any[], account: any, index: number) => {
    const accountId = account.accountId;
    if (!uniqueIds.some((item: any) => item.value === accountId)) {
      uniqueIds.push({
        label: accountId,
        value: accountId,
        key: accountId + index,
      });
    }
    return uniqueIds;
  }, []);

  const regionNames: any[] = regions.reduce((uniqueIds: any[], region: any, index: number) => {
    const regionName = region.regionName;
    if (!uniqueIds.some((item: any) => item.value === regionName)) {
      uniqueIds.push({
        label: regionName,
        value: regionName,
        key: regionName + index,
      });
    }
    return uniqueIds;
  }, []);

  const handleAccountIdChange = (value: string) => {
    setSelectedAccountId(value)
    handleProviderSelect(selectedProvider)
  };

  const handleRegionChange = (value: string) => {
    setSelectedRegion(value)
    handleProviderSelect(selectedProvider)
  };

  const handleProviderSelect = (value: any) => {
    if (!value) {
      dispatch(setInfraVpcs([]));
    } else {
      switch (value) {
        case InfraResourceProvider.AWS:
          setValue("provider", value);
          setLastClickedProvider("aws");
          setTimeout(() => {
            fetchAccounts()
            dispatch(setResourceFetchedEntities([]));
            dispatch(setResourceType(InfraResourceType.CLUSTERS));
            fetchVpcResourcesClusters();
            fetchRegions();

          }, 1000);
          break;
        case InfraResourceProvider.GCP:
          dispatch(setInfraVpcs([]));
          setValue("provider", value);
          setLastClickedProvider("gcp");
          setTimeout(() => {
            fetchAccounts()
            dispatch(setResourceFetchedEntities([]));
            dispatch(setResourceType(InfraResourceType.CLUSTERS));
            fetchVpcResourcesClusters();
            fetchRegions();
          }, 1000);
          break;
        case InfraResourceProvider.AZURE:
          dispatch(setInfraVpcs([]));
          setValue("provider", value);
          setLastClickedProvider("azure");
          setTimeout(() => {
            fetchAccounts()
            dispatch(setResourceFetchedEntities([]));
            dispatch(setResourceType(InfraResourceType.CLUSTERS));
            fetchVpcResourcesClusters();
            fetchRegions();
          }, 1000);
          break;
        default:
          console.log(`Unhandled exception, value is ${value}`);
          setValue("provider", value);
          break;
      }
    }
  };

  return (
    <div style={{ padding: "5px", display: "flex", justifyContent: "space-between" }}>
      <ButtonGroup variant="contained" aria-label="contained button group" size="large">
        <Button
          sx={muiButtonColorHandler(lastClickedProvider, InfraResourceProvider.AWS)}
          onClick={() => handleProviderSelect(InfraResourceProvider.AWS)}
        >
          AWS
        </Button>
        <Button
          sx={muiButtonColorHandler(lastClickedProvider, InfraResourceProvider.GCP)}
          onClick={() => handleProviderSelect(InfraResourceProvider.GCP)}
        >
          GCP
        </Button>
        <Button
          sx={muiButtonColorHandler(lastClickedProvider, InfraResourceProvider.AZURE)}
          onClick={() => handleProviderSelect(InfraResourceProvider.AZURE)}
        >
          Azure
        </Button>

      </ButtonGroup>
      <div>
        <ComboBox
          formName="accountId"
          variant={ComboBoxVariants.SELECT}
          label="Account ID"
          //placeholder="Select Account"
          selectOptions={accountIds}
          onChange={handleAccountIdChange}
          tooltip={<Tooltip title={Tooltips.ACCOUNT_ID} />}
        />
        <ComboBox
          formName="region"
          variant={ComboBoxVariants.SELECT}
          label="Region"
          //placeholder="Select Region"
          selectOptions={regionNames}
          onChange={handleRegionChange}
          tooltip={<Tooltip title={Tooltips.REGION} />}
        />
      </div>

    </div>

  );
};

