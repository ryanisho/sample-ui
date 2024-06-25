import React, { useState, useEffect } from 'react';
import CardMedium from '../../components/Cards/CardMedium';
import CardLarge from '../../components/Cards/CardLarge';
import PieChart from '../../components/Charts/PieChart';
import DefaultLayout from '../../layout/DefaultLayout';

import { Source } from "@/store/summary-slice/summarySlice";
import { useFetchSummary } from "@/common/hooks/useFetchSummary";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

/**
 * Home Page Component
 * 
 * This component renders the dashboard home page, including general cloud and Kubernetes resources statistics.
 * Utilizes Redux for state management.
 */

const Home: React.FC = () => {
    // State
    const [selectedProvider, setSelectedProvider] = useState<Source>('All Providers');
    const { fetchSummary } = useFetchSummary()
    const { count, status } = useSelector((state: RootState) => state.summary);

    // Effect
    useEffect(() => {
        fetchSummary()
    }, []);

    const handleSelect = (provider: Source) => {
        fetchSummary()
        setSelectedProvider(provider);
    };

    const cloudResources = [
        { label: 'VPC', value: count[selectedProvider].VPC },
        { label: 'VM', value: count[selectedProvider].VM },
        { label: 'Subnets', value: count[selectedProvider].Subnets },
        { label: 'Route Tables', value: count[selectedProvider].RouteTables },
        { label: 'ACL', value: count[selectedProvider].ACL },
        { label: 'Security Groups', value: count[selectedProvider].SecurityGroups },
        { label: 'NAT Gateways', value: count[selectedProvider].NATGateways },
        { label: 'Internet Gateways', value: count[selectedProvider].InternetGateways },
        { label: 'Cloud Routers', value: count[selectedProvider].CloudRouters },
        { label: 'VPC Endpoints', value: count[selectedProvider].VPCEndpoints },
        { label: 'Public IP Addresses', value: count[selectedProvider].PublicIPAddresses }
    ];

    const kubernetesResources = [
        { label: 'Clusters', value: count[selectedProvider].Clusters },
        { label: 'Services', value: count[selectedProvider].Services },
        { label: 'Pods', value: count[selectedProvider].Pods },
        { label: 'Namespaces', value: count[selectedProvider].Namespaces }
    ];

    const enterpriseResources = [
        { label: 'SGT', value: count[selectedProvider].SGT },
        { label: 'VRF', value: count[selectedProvider].VRF },
        { label: 'VLAN', value: count[selectedProvider].VLAN }
    ];

    // pie chart data
    const statusData = status[selectedProvider]


    return (
        <DefaultLayout>
            <div style={{ marginBottom: "10px", justifyContent: "space-between" }}>
                <div className="flex justify-end">
                    {['AWS', 'GCP', 'Azure', 'Enterprise', 'All Providers'].map((buttonName) => (
                        <button
                            className={`button-blue ${selectedProvider === buttonName ? 'selected' : ''}`}
                            key={buttonName}
                            onClick={() => handleSelect(buttonName as Source)}
                        >
                            {buttonName}
                        </button>
                    ))}
                </div>
            </div>
            <div className="gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mb-4">
                <CardLarge title="Cloud Resources" data={cloudResources} />
            </div>

            <div className="flex gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mb-4 items-stretch">
                <CardMedium title="Kubernetes Resources" data={kubernetesResources} />
                <CardMedium title="Enterprise Resources [DC | Campus | Edge | User] " data={enterpriseResources} />
            </div>

            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <PieChart series={[statusData.pod.running, statusData.pod.pending, statusData.pod.crash]} title="Pod States" />
                <PieChart series={[statusData.vm.running, statusData.vm.stopped, statusData.vm.terminated]} title="VM States" />
            </div>
        </DefaultLayout >
    );
};

export default React.memo(Home);
