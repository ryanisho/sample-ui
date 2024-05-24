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
import { setSubResourceFetchedEntities } from "@/store/infra-resources-slice/infraResourcesSlice";
import { BACKEND_API_PREFIX } from "@/common/constants";

const { KubernetesServiceClient } = require("@/_proto/infra-sdk/output/kubernetes_grpc_web_pb");
const { ListNodesRequest,ListPodsRequest, ListServicesRequest } = require("@/_proto/infra-sdk/output/kubernetes_pb");

const infraSdkKubernetesClient = new KubernetesServiceClient(BACKEND_API_PREFIX, null, null);
const listNodesRequest = new ListNodesRequest();
const listPodsRequest = new ListPodsRequest();
const listServicesRequest = new ListServicesRequest();

export const useFetchClustersPods = (name: string) => {
  //console.log("fire useFetchClusterPods");
  const [clusterPods, setClusterPods] = useState<any[]>([]);

  const dispatch = useDispatch();

  listPodsRequest.setClusterName(name);
  listServicesRequest.setClusterName(name);
  listNodesRequest.setClusterName(name);

  const fetchClusterNodes = () => {
    console.log("fetching nodes...");
    try {
      infraSdkKubernetesClient.listNodes(listNodesRequest, {}, (error: any, response: any) => {
        const data = response?.getNodesList();
        console.log("nodes:", data);
        console.log("error:", error);
        if (data) {
          console.log("nodes:", data);
          const nodes = data.map((node: any) => {
            const cluster = node.getCluster();
            const name = node.getName();
            const namespace = node.getNamespace();
            //const ip = node.getIp();
            //const labelsMap = node.getLabelsMap();
            const labels: any = {};

            //labelsMap.forEach((value: string, key: string) => {
            //  labels[key] = value;
            //});

            return {
              cluster,
              name,
              namespace
              //ip,
              //labels,
            };
          });

          setClusterPods([...nodes]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const fetchClusterPods = () => {
    console.log("fetching pods...");
    try {
      infraSdkKubernetesClient.listPods(listPodsRequest, {}, (error: any, response: any) => {
        const data = response?.getPodsList();
        console.log("pods:", data);
        console.log("error:", error);
        if (data) {
          console.log("pods:", data);
          const pods = data.map((pod: any) => {
            // const cluster = pod.getCluster();
            const name = pod.getName();
            const namespace = pod.getNamespace();
            const ip = pod.getIp();
            const labelsMap = pod.getLabelsMap();
            const labels: any = {};

            labelsMap.forEach((value: string, key: string) => {
              labels[key] = value;
            });

            return {
              // cluster,
              name,
              namespace,
              ip,
              labels,
            };
          });

          setClusterPods([...pods]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchClusterServices = () => {
    console.log("fetching services...");
    try {
      infraSdkKubernetesClient.listServices(listServicesRequest, {}, (error: any, response: any) => {
        const data = response?.getServicesList();

        if (data) {
          const services = data.map((service: any) => {
            const name = service.getName();
            const cluster = service.getCluster();
            const namespace = service.getNamespace();
            const ingressesList = service.getIngressesList();
            const type = service.getType();

            const labelsMap = service.getLabelsMap();
            const labels: any = {};

            labelsMap.forEach((value: string, key: string) => {
              labels[key] = value;
            });

            console.log({ name, cluster, namespace, ingressesList, labels, type });

            return {
              name,
              cluster,
              namespace,
              // ingressesList,
            };
          });

          setClusterPods([...services]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (clusterPods.length) {
      dispatch(setSubResourceFetchedEntities(clusterPods));
    }
  }, [clusterPods]);

  return { clusterPods, fetchClusterNodes, fetchClusterPods, fetchClusterServices };
};
