import React, { useState } from "react";
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import ModalComponent from '../../components/Modal/VpcModal';
import '../../css/vpc.css';

// new 
import ProviderButtons from '@/components/ProviderRegion/ProviderRegionBar';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

const vpc = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // new
    const { vpcs } = useSelector((state: RootState) => state.infraResources); // retrieve vpcs from api
    const [selectedVpc, setSelectedVpc] = useState(null); // track current vpc
    const [selectedVpcId, setSelectedVpcId] = useState<number | null>(null); // track current vpc id (for modal)

    const info = vpcs.map(vpc => ({
        id: vpc.id,
        accountId: vpc.accountId,
        name: vpc.name || '',
        region: vpc.region,
        ipv4: vpc.ipv4_cidr,
        ipv6: vpc.ipv6_cidr,
        labels: vpc["labels"],
        compliant: vpc.compliant,
        // selfLink: vpc.selfLink,
        project: vpc.project,
    }));

    const handleVpcSelect = (vpc) => {
        setSelectedVpcId(vpc.id); // row select css
        setSelectedVpc(vpc); // modal data
        setIsModalOpen(true); // open modal
    };

    // search function, id/name
    const vpcSearch: typeof info = info.filter(vpc =>
        vpc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vpc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRowClick = (selectedVpc) => {
        setSelectedVpc(selectedVpc);
        if (!isModalOpen) {
            setIsModalOpen(true);
        }
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Multi-cloud Infrastructure Resources" />
            <div className="flex justify-between">
                <div className="flex flex-col w-1/4">
                    <input
                        type="text"
                        placeholder="Search by name or ID"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="input-field dark:bg-black"
                    />
                </div>
                <ProviderButtons></ProviderButtons>
            </div>
            <div className="mt-3">
                <table className="data-table">
                    <thead className="dark:bg-gray-700">
                        <tr className="table-header dark:bg-black dark:text-white">
                            <th className="table-cell dark:text-gray-300">ID</th>
                            <th className="table-cell dark:text-gray-300">Account ID</th>
                            <th className="table-cell dark:text-gray-300">Name</th>
                            <th className="table-cell dark:text-gray-300">Region</th>
                        </tr>
                    </thead>
                    <tbody className="table-body dark:bg-black dark:text-white">
                        {vpcSearch.map((vpc, index) => (
                            <tr
                                key={vpc.id}
                                className={`table-row ${selectedVpcId === vpc.id ? 'selected-row dark:bg-gray-600' : 'dark:bg-gray-700'} ${index === vpcSearch.length - 1 ? '' : 'border-b border-gray-100'}`}
                                onClick={() => {
                                    handleRowClick(vpc);
                                    handleVpcSelect(vpc);
                                }}
                            >
                                <td className="table-cell">{vpc.id}</td>
                                <td className="table-cell">{vpc.accountId}</td>
                                <td className="table-cell">{vpc.name}</td>
                                <td className="table-cell">{vpc.region}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ModalComponent
                    isModalOpen={isModalOpen}
                    onRequestClose={() => { setIsModalOpen(false); setSelectedVpcId(null) }}
                    selectedVpc={selectedVpc}
                />
            </div>
        </DefaultLayout>
    );
};

export default vpc;
