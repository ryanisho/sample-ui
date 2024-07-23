import { useState, useEffect } from "react";
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import ModalComponent from '../../components/Modal/VpcModal';
import '../../css/vpc.css';

// new 
import ProviderButtons from '@/components/ProviderRegion/ProviderRegionBar';
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useFetchVpcResourceClusters, useFetchVpcResourceSubnets, useFetchVpcResourceVms, useFetchVpcResourceSecurityGroups, useFetchVpcResourceRouteTables, useFetchVpcResourceACLs, useFetchVpcResourceVpcEndpoints, useFetchVpcResourceRouters, useFetchVpcResourceNATGateways, useFetchVpcResourceInternetGateways, useFetchVpcResourcePublicIPs, } from "@/common/hooks";



const MultiCloudInfra = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // new
    const { vpcs } = useSelector((state: RootState) => state.infraResources); // retrieve vpcs from api
    const [selectedVpc, setSelectedVpc] = useState(null); // track current vpc
    const [selectedVpcId, setSelectedVpcId] = useState<number | null>(null); // track current vpc id (for modal)

    // new views
    const [selectedView, setSelectedView] = useState('VPC');

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
        if (!isModalOpen) {
            setIsModalOpen(true);
        }
    };

    // search function, id/name
    const vpcSearch: typeof vpcData = vpcData.filter(vpc =>
        vpc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vpc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Provider, AccountID
    const { selectedProvider, selectedAccountId } = useSelector((state: RootState) => state.selectedResources);

    // VMs
    const { vpcResourceVms, fetchVpcResourcesVms } = useFetchVpcResourceVms(selectedProvider, '', '', selectedAccountId);

    // Subnets
    const { vpcResourceSubnets, fetchVpcResourcesSubnets } = useFetchVpcResourceSubnets(selectedProvider, '', '', selectedAccountId);

    // SGs
    const { vpcResourceSecurityGroups, fetchVpcResourceSecurityGroups } = useFetchVpcResourceSecurityGroups(selectedProvider, '', '', selectedAccountId);

    // ACL
    const { vpcResourceACLs, fetchVpcResourceACLs } = useFetchVpcResourceACLs(selectedProvider, '', '', selectedAccountId);

    // Route Table
    const { vpcResourceRouteTables, fetchVpcResourceRouteTables } = useFetchVpcResourceRouteTables(selectedProvider, '', '', selectedAccountId);

    // VPC Endpoints
    const { vpcResourceVpcEndpoints, fetchVpcResourceVPCEndpoints } = useFetchVpcResourceVpcEndpoints(selectedProvider, '', '', selectedAccountId);

    // NAT Gateways
    const { vpcResourceNATGateways, fetchVpcResourceNATGateways } = useFetchVpcResourceNATGateways(selectedProvider, '', '', selectedAccountId);

    // IGWs
    const { vpcResourceInternetGateways, fetchVpcResourceInternetGateways } = useFetchVpcResourceInternetGateways(selectedProvider, '', '', selectedAccountId);

    // Public IPs
    const { vpcResourcePublicIPs, fetchVpcResourcePublicIPs } = useFetchVpcResourcePublicIPs(selectedProvider, '', '', selectedAccountId);


    return (
        <DefaultLayout>
            <Breadcrumb pageName="Multi-cloud Infrastructure Resources" />
            <div className="flex justify-between">
                <div className="flex flex-col w-1/6">
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
                        { name: 'VPC', },
                        { name: 'VM', },
                        { name: 'Subnet', },
                        { name: 'SGs', },
                        { name: 'ACL', },
                        { name: 'Route Table', },
                        { name: 'VPC Endpoints', },
                        { name: 'NAT Gateways', },
                        { name: 'IGWs', },
                        { name: 'Public IPs', },
                    ].map((button) => (
                        <button
                            className={`dark:border-white dark:text-white button-blue text-sm py-1 whitespace-nowrap ${selectedView === button.name ? 'selected' : ''}`}
                            key={button.name}
                            onClick={() => {
                                setSelectedView(button.name);
                                if (button.name === 'SGs') {
                                    fetchVpcResourceSecurityGroups();
                                }
                                if (button.name === 'VM') {
                                    fetchVpcResourcesVms();
                                }
                                if (button.name === 'Subnet') {
                                    fetchVpcResourcesSubnets();
                                }
                                if (button.name === 'ACL') {
                                    fetchVpcResourceACLs();
                                }
                                if (button.name === 'Route Table') {
                                    fetchVpcResourceRouteTables();
                                }
                                if (button.name === 'VPC Endpoints') {
                                    fetchVpcResourceVPCEndpoints();
                                }
                                if (button.name === 'NAT Gateways') {
                                    fetchVpcResourceNATGateways();
                                }
                                if (button.name === 'IGWs') {
                                    fetchVpcResourceInternetGateways();
                                }
                                if (button.name === 'Public IPs') {
                                    fetchVpcResourcePublicIPs();
                                }
                            }}
                        >
                            {button.name}
                        </button>
                    ))}
                </div>
            </div>
            <div className="mt-3">
                {selectedView === 'SGs' ? (
                    // Render table for SGs
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
                ) : selectedView === 'VM' ? (
                    <div>
                        <div className="table-header flex justify-between text-left text-sm font-medium text-gray-700 rounded-lg">
                            <span className="w-1/4 px-4 py-2 text-center">Name</span>
                            <span className="w-1/4 px-4 py-2 text-center">ID</span>
                            <span className="w-1/4 px-2 py-2 text-center">Account ID</span>
                            <span className="w-1/4 px-2 py-2 text-center">Provider</span>
                            <span className="w-1/4 px-2 py-2 text-center">Owner</span>
                            <span className="w-1/4 px-2 py-2 text-center">Project</span>
                            <span className="w-1/4 px-2 py-2 text-center">Type</span>
                            <span className="w-1/4 px-2 py-2 text-center">Subnet ID</span>
                            <span className="w-1/4 px-2 py-2 text-center">Public IP</span>
                            <span className="w-1/4 px-2 py-2 text-center">State</span>
                            <span className="w-1/4 px-1 py-2 text-center">Compliancy</span>

                        </div>
                        <div>
                            {vpcResourceVms.map((group, idx) => (
                                <div
                                    key={idx}
                                    className="dark:bg-black dark:text-white flex items-center justify-between text-left text-sm font-medium text-gray-700 bg-white rounded-lg my-2 p-4 shadow"
                                >
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.name}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.id}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.accountId}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.provider}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.owner}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.project}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.type}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.subnetId}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.publicIp}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.state}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.compliant}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : selectedView === 'Subnet' ? (
                    <div>
                        <div className="table-header flex justify-between text-left text-sm font-medium text-gray-700 rounded-lg">
                            <span className="w-1/4 px-4 py-2 text-center">ID</span>
                            <span className="w-1/4 px-2 py-2 text-center">Name</span>
                            <span className="w-1/4 px-1 py-2 text-center">CIDR Block</span>
                            <span className="w-1/4 px-1 py-2 text-center">Provider</span>
                            <span className="w-1/4 px-1 py-2 text-center">Account ID</span>
                            <span className="w-1/4 px-1 py-2 text-center">Region</span>
                            <span className="w-1/4 px-1 py-2 text-center">VPC ID</span>
                            <span className="w-1/4 px-1 py-2 text-center">Zone</span>
                        </div>
                        <div>
                            {vpcResourceSubnets.map((group, idx) => (
                                <div
                                    key={idx}
                                    className={`dark:bg-black dark:text-white flex items-center justify-between text-left text-sm font-medium text-gray-700 bg-white rounded-lg my-2 p-4 shadow ${selectedVpcId === group.id ? 'bg-blue-100 dark:bg-gray-600' : 'dark:bg-gray-700'}`}
                                >
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.id}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.name}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.cidrblock}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.provider}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.accountId}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.region}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.vpcId}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.zone}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : selectedView === "ACL" ? (
                    <div>
                        <div className="table-header flex justify-between text-left text-sm font-medium text-gray-700 rounded-lg">
                            <span className="w-1/4 px-4 py-2 text-center">Name</span>
                            <span className="w-1/4 px-2 py-2 text-center">ID</span>
                            <span className="w-1/4 px-1 py-2 text-center">Provider</span>
                            <span className="w-1/4 px-1 py-2 text-center">Account ID</span>
                            <span className="w-1/4 px-1 py-2 text-center">Region</span>
                            <span className="w-1/4 px-1 py-2 text-center">VPC ID</span>
                        </div>
                        <div>
                            {vpcResourceACLs.map((group, idx) => (
                                <div
                                    key={idx}
                                    className={`dark:bg-black dark:text-white flex items-center justify-between text-left text-sm font-medium text-gray-700 bg-white rounded-lg my-2 p-4 shadow ${selectedVpcId === group.id ? 'bg-blue-100 dark:bg-gray-600' : 'dark:bg-gray-700'}`}
                                >
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.name}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.id}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.provider}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.accountId}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.region}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.vpcId}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : selectedView === "Route Table" ? (
                    <div>
                        <div className="table-header flex justify-between text-left text-sm font-medium text-gray-700 rounded-lg">
                            <span className="w-1/4 px-4 py-2 text-center">Name</span>
                            <span className="w-1/4 px-2 py-2 text-center">ID</span>
                            <span className="w-1/4 px-1 py-2 text-center">Provider</span>
                            <span className="w-1/4 px-1 py-2 text-center">Account ID</span>
                            <span className="w-1/4 px-1 py-2 text-center">Region</span>
                            <span className="w-1/4 px-1 py-2 text-center">VPC ID</span>
                        </div>
                        <div>
                            {vpcResourceRouteTables.map((group, idx) => (
                                <div
                                    key={idx}
                                    className={`dark:bg-black dark:text-white flex items-center justify-between text-left text-sm font-medium text-gray-700 bg-white rounded-lg my-2 p-4 shadow ${selectedVpcId === group.id ? 'bg-blue-100 dark:bg-gray-600' : 'dark:bg-gray-700'}`}
                                >
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.name}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.id}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.provider}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.accountId}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.region}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.vpcId}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : selectedView === "VPC Endpoints" ? (
                    <div>
                        <div className="table-header flex justify-between text-left text-sm font-medium text-gray-700 rounded-lg">
                            <span className="w-1/4 px-4 py-2 text-center">Name</span>
                            <span className="w-1/4 px-2 py-2 text-center">ID</span>
                            <span className="w-1/4 px-1 py-2 text-center">Provider</span>
                            <span className="w-1/4 px-1 py-2 text-center">Account ID</span>
                            <span className="w-1/4 px-1 py-2 text-center">Region</span>
                            <span className="w-1/4 px-1 py-2 text-center">VPC ID</span>
                            <span className="w-1/4 px-1 py-2 text-center">Route Table IDs</span>
                            <span className="w-1/4 px-1 py-2 text-center">Subnet IDs</span>
                            <span className="w-1/4 px-1 py-2 text-center">Service</span>
                        </div>
                        <div>
                            {vpcResourceVpcEndpoints.map((group, idx) => (
                                <div
                                    key={idx}
                                    className={`dark:bg-black dark:text-white flex items-center justify-between text-left text-sm font-medium text-gray-700 bg-white rounded-lg my-2 p-4 shadow ${selectedVpcId === group.id ? 'bg-blue-100 dark:bg-gray-600' : 'dark:bg-gray-700'}`}
                                >
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.name}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.id}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.provider}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.accountId}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.region}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.vpcId}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.routeTableIds}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.subnetIds}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.service}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : selectedView === 'NAT Gateways' ? (
                    <div>
                        <div className="table-header flex justify-between text-left text-sm font-medium text-gray-700 rounded-lg">
                            <span className="w-1/4 px-4 py-2 text-center">Name</span>
                            <span className="w-1/4 px-2 py-2 text-center">ID</span>
                            <span className="w-1/4 px-1 py-2 text-center">Account ID</span>
                            <span className="w-1/4 px-1 py-2 text-center">VPC ID</span>
                            <span className="w-1/4 px-1 py-2 text-center">Region</span>
                            <span className="w-1/4 px-1 py-2 text-center">State</span>
                            <span className="w-1/4 px-1 py-2 text-center">Public IP</span>
                            <span className="w-1/4 px-1 py-2 text-center">Private IP</span>
                            <span className="w-1/4 px-1 py-2 text-center">Subnet ID</span>
                        </div>
                        <div>
                            {vpcResourceNATGateways.map((group, idx) => (
                                <div
                                    key={idx}
                                    className={`dark:bg-black dark:text-white flex items-center justify-between text-left text-sm font-medium text-gray-700 bg-white rounded-lg my-2 p-4 shadow ${selectedVpcId === group.id ? 'bg-blue-100 dark:bg-gray-600' : 'dark:bg-gray-700'}`}
                                >
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.name}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.id}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.accountId}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.vpcId}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.region}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.state}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.publicIp}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.privateIp}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.subnetId}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : selectedView === 'IGWs' ? (
                    <div>
                        <div className="table-header flex justify-between text-left text-sm font-medium text-gray-700 rounded-lg">
                            <span className="w-1/4 px-4 py-2 text-center">Name</span>
                            <span className="w-1/4 px-2 py-2 text-center">ID</span>
                            <span className="w-1/4 px-1 py-2 text-center">Provider</span>
                            <span className="w-1/4 px-1 py-2 text-center">Account ID</span>
                            <span className="w-1/4 px-1 py-2 text-center">Region</span>
                            <span className="w-1/4 px-1 py-2 text-center">VPC ID</span>
                            <span className="w-1/4 px-1 py-2 text-center">State</span>
                        </div>
                        <div>
                            {vpcResourceInternetGateways.map((group, idx) => (
                                <div
                                    key={idx}
                                    className={`dark:bg-black dark:text-white flex items-center justify-between text-left text-sm font-medium text-gray-700 bg-white rounded-lg my-2 p-4 shadow ${selectedVpcId === group.id ? 'bg-blue-100 dark:bg-gray-600' : 'dark:bg-gray-700'}`}
                                >
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.name}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.id}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.provider}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.accountId}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.region}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.vpcId}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.state}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : selectedView === 'Public IPs' ? (
                    <div>
                        <div className="table-header flex justify-between text-left text-sm font-medium text-gray-700 rounded-lg">
                            <span className="w-1/4 px-4 py-2 text-center">Name</span>
                            <span className="w-1/4 px-2 py-2 text-center">ID</span>
                            <span className="w-1/4 px-1 py-2 text-center">Provider</span>
                            <span className="w-1/4 px-1 py-2 text-center">Account ID</span>
                            <span className="w-1/4 px-1 py-2 text-center">Region</span>
                            <span className="w-1/4 px-1 py-2 text-center">VPC ID</span>
                            <span className="w-1/4 px-1 py-2 text-center">State</span>
                        </div>
                        <div>
                            {vpcResourcePublicIPs.map((group, idx) => (
                                <div
                                    key={idx}
                                    className={`dark:bg-black dark:text-white flex items-center justify-between text-left text-sm font-medium text-gray-700 bg-white rounded-lg my-2 p-4 shadow ${selectedVpcId === group.id ? 'bg-blue-100 dark:bg-gray-600' : 'dark:bg-gray-700'}`}
                                >
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.name}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.id}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.provider}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.accountId}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.region}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.vpcId}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{group.state}</span>
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
                                    className={`dark:bg-black dark:text-white flex items-center justify-between text-left text-sm font-medium text-gray-700 rounded-lg my-2 p-4 shadow ${selectedVpcId === vpc.id ? 'bg-blue-100 dark:bg-gray-600' : 'bg-white dark:bg-gray-700'}`}
                                    onClick={() => {
                                        handleVpcSelect(vpc);
                                    }}>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{vpc.id}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{vpc.accountId}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{vpc.name}</span>
                                    <span className="w-1/4 px-4 py-2 flex text-center justify-center">{vpc.region}</span>
                                </div>
                            ))}
                            <ModalComponent
                                isModalOpen={isModalOpen}
                                onRequestClose={() => setIsModalOpen(false)}
                                selectedVpc={selectedVpc}
                            />
                        </div>
                    </div >
                )}
            </div >
        </DefaultLayout >
    );
};

export default MultiCloudInfra;
