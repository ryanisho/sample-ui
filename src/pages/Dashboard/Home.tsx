import React, { useState } from 'react';
import CardMedium from '../../components/Cards/CardMedium';
import CardLarge from '../../components/Cards/CardLarge';
import PieChart from '../../components/Charts/PieChart';
import DefaultLayout from '../../layout/DefaultLayout';

const Home: React.FC = () => {
    const [selectedButton, setSelectedButton] = useState('AWS');

    const handleButtonClick = (buttonName: string) => {
        setSelectedButton(buttonName);
    };


    return (
        <DefaultLayout>
            <div className="flex justify-end">
                {['AWS', 'GCP', 'Azure', 'Cisco', 'All'].map((buttonName) => (
                    <button
                        className={`button-blue ${selectedButton === buttonName ? 'selected' : ''}`}
                        key={buttonName}
                        onClick={() => handleButtonClick(buttonName)}
                    >
                        {buttonName}
                    </button>
                ))}
            </div>
            {/* TODO: perform conditional rendering depending on service */}


            <div className="gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mb-4">
                {/* api calls */}
                <CardLarge title="Cloud Resources" data={[
                    { label: 'VPC', value: '3.456' },
                    { label: 'VM', value: '45' },
                    { label: 'Subnets', value: '2.450' },
                    { label: 'Route Tables', value: '3.456' },
                    { label: 'ACL', value: '3.456K' },
                    { label: 'Security Groups', value: '45' },
                    { label: 'NAT Gateways', value: '2.450' },
                    { label: 'Internet Gateways', value: '3.456' },
                    { label: 'Cloud Routers', value: '3.456' },
                    { label: 'VPC Endpoints', value: '17' },
                    { label: 'Public IP Addresses', value: '2.450' }
                ]} />
            </div>

            <div className="flex gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mb-4 items-stretch">
                {/* api calls */}
                <CardMedium title="Kubernetes Resources" data={[
                    { label: 'Clusters', value: '0' },
                    { label: 'Services', value: '0' },
                    { label: 'Pods', value: '0' },
                    { label: 'Namespaces', value: '0' },
                    { label: 'Clusters', value: '0' },
                ]} />
                <CardMedium title="Enterprise Resources [DC | Campus | Edge | User] " data={[
                    { label: 'SGT', value: '20' },
                    { label: 'VRF', value: '5' },
                    { label: 'VLAN', value: '32' }
                ]} />
            </div>

            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <PieChart series={[65, 32, 12]} title="VM States" />
                <PieChart series={[65, 32, 12]} title="Pod States" />
            </div>
        </DefaultLayout >
    );
};

export default Home;
