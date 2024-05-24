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

