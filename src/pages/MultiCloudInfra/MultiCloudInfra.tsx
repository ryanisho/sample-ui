import { useState, useEffect } from "react";
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import ModalComponent from '../../components/Modal/VpcModal';
import '../../css/vpc.css';

// new 
import ProviderButtons from '@/components/ProviderRegion/ProviderRegionBar';
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useFetchVpcResourceSecurityGroups } from "@/common/hooks";


const MultiCloudInfra = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // new
    const { vpcs } = useSelector((state: RootState) => state.infraResources); // retrieve vpcs from api
    const [selectedVpc, setSelectedVpc] = useState(null); // track current vpc
    const [selectedVpcId, setSelectedVpcId] = useState<number | null>(null); // track current vpc id (for modal)

    // new views
    const [selectedView, setSelectedView] = useState('');

    const vpcData = vpcs.map(vpc => ({
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
    const vpcSearch: typeof vpcData = vpcData.filter(vpc =>
        vpc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vpc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRowClick = (selectedVpc) => {
        setSelectedVpc(selectedVpc);
        if (!isModalOpen) {
            setIsModalOpen(true);
        }
    }


    // Security Groups
    const { selectedProvider, selectedAccountId } = useSelector((state: RootState) => state.selectedResources);
    const { vpcResourceSecurityGroups, fetchVpcResourceSecurityGroups } = useFetchVpcResourceSecurityGroups(selectedProvider, '', '', selectedAccountId);


    console.log("INFO: " + vpcResourceSecurityGroups);

    // const info = vpcResourceSecurityGroups.map(sg => ({
    //     provider: sg.provider,
    //     accountId: sg.accountId,
    //     name: sg.name || '',
    //     region: sg.region,
    //     vpcId: sg.vpcId,
    //     labels: sg["labels"],
    // }));

    // console.log("INFO 2: " + info);

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
            <div style={{ marginBottom: "10px", justifyContent: "space-between" }}>
                <div className="flex justify-begin">
                    {[
                        { name: 'VM', },
                        { name: 'Subnet', },
                        { name: 'Security Groups', },
                        { name: 'ACL', },
                        { name: 'Route Table', },
                        { name: 'VPC Endpoints', },
                        { name: 'NAT Gateways', },
                        { name: 'Internet Gateways', },
                        { name: 'Public IP Addresses', },
                        { name: 'Overlapping IP CIDR', },
                    ].map((button) => (
                        <button
                            className={`dark:border-white dark:text-white button-blue ${selectedView === button.name ? 'selected' : ''}`}
                            key={button.name}
                            onClick={() => {
                                setSelectedView(button.name);
                                if (button.name === 'Security Groups') {
                                    fetchVpcResourceSecurityGroups();
                                }
                            }}
                        >
                            {button.name}
                        </button>
                    ))}
                </div>
            </div>
            <div className="mt-3">
                {selectedView === 'Security Groups' ? (
                    // Render table for security groups
                    <div>
                        <div className="table-header flex justify-between text-left text-sm font-medium text-gray-700 rounded-lg">
                            <span className="w-1/4 px-4 py-2 text-center">Name</span>
                            <span className="w-1/4 px-2 py-2 text-center">Account ID</span>
                            <span className="w-1/4 px-2 py-2 text-center">ID</span>
                            <span className="w-1/4 px-1 py-2 text-center">Region</span>
                            <span className="w-1/4 px-1 py-2 text-center">VPC ID</span>
                            {/* <span className="w-1/4 px-1 py-2 text-center">Labels</span> */}

                        </div>
                        <div>
                            {vpcResourceSecurityGroups.map((group, idx) => (
                                <div
                                    key={idx}
                                    className="dark:bg-black dark:text-white flex items-center justify-between text-left text-sm font-medium text-gray-700 bg-white rounded-lg my-2 p-4 shadow"
                                >
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.name}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.accountId}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.id}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.region}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.vpcId}</span>
                                    {/* <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.labels}</span> */}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    // Render default vpcSearch table
                    <div>
                        <div className="table-header flex justify-between text-left text-sm font-medium text-gray-700 rounded-lg">
                            <span className="w-1/4 px-4 py-2 text-center">ID</span>
                            <span className="w-1/4 px-2 py-2 text-center">Account ID</span>
                            <span className="w-1/4 px-1 py-2 text-center">Name</span>
                            <span className="w-1/4 px-1 py-2 text-center">Region</span>
                        </div>
                        <div>
                            {vpcSearch.map((vpc, idx) => (
                                <div
                                    key={idx}
                                    className={`dark:bg-black dark:text-white flex items-center justify-between text-left text-sm font-medium text-gray-700 bg-white rounded-lg my-2 p-4 shadow ${selectedVpcId === vpc.id ? 'bg-blue-100 dark:bg-gray-600' : 'dark:bg-gray-700'}`}
                                >
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{vpc.id}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{vpc.accountId}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{vpc.name}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{vpc.region}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
};

export default MultiCloudInfra;
