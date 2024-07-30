import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import ProviderButtons from '@/components/ProviderRegion/ProviderRegionBar';
import DefaultLayout from '../../layout/DefaultLayout';
import ModalComponent from '../../components/Modal/VpcModal';
import {
    useFetchVpcResourceSubnets,
    useFetchVpcResourceVms,
    useFetchVpcResourceSecurityGroups,
    useFetchVpcResourceRouteTables,
    useFetchVpcResourceACLs,
    useFetchVpcResourceVpcEndpoints,
    useFetchVpcResourceNATGateways,
    useFetchVpcResourceInternetGateways,
    useFetchVpcResourcePublicIPs,
} from "@/common/hooks";
import '../../css/vpc.css';

const MultiCloudInfra = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVpc, setSelectedVpc] = useState(null); // track current vpc
    const [selectedVpcId, setSelectedVpcId] = useState<number | null>(null); // track current vpc id (for modal)
    const [selectedView, setSelectedView] = useState('VPC');

    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [timeSinceUpdate, setTimeSinceUpdate] = useState<string>('just now');

    // api
    const { vpcs } = useSelector((state: RootState) => state.infraResources); // retrieve vpcs from api
    const { selectedProvider, selectedAccountId } = useSelector((state: RootState) => state.selectedResources);
    const { vpcResourceVms, fetchVpcResourcesVms } = useFetchVpcResourceVms(selectedProvider, '', '', selectedAccountId);
    const { vpcResourceSubnets, fetchVpcResourcesSubnets } = useFetchVpcResourceSubnets(selectedProvider, '', '', selectedAccountId);
    const { vpcResourceSecurityGroups, fetchVpcResourceSecurityGroups } = useFetchVpcResourceSecurityGroups(selectedProvider, '', '', selectedAccountId);
    const { vpcResourceACLs, fetchVpcResourceACLs } = useFetchVpcResourceACLs(selectedProvider, '', '', selectedAccountId);
    const { vpcResourceRouteTables, fetchVpcResourceRouteTables } = useFetchVpcResourceRouteTables(selectedProvider, '', '', selectedAccountId);
    const { vpcResourceVpcEndpoints, fetchVpcResourceVPCEndpoints } = useFetchVpcResourceVpcEndpoints(selectedProvider, '', '', selectedAccountId);
    const { vpcResourceNATGateways, fetchVpcResourceNATGateways } = useFetchVpcResourceNATGateways(selectedProvider, '', '', selectedAccountId);
    const { vpcResourceInternetGateways, fetchVpcResourceInternetGateways } = useFetchVpcResourceInternetGateways(selectedProvider, '', '', selectedAccountId);
    const { vpcResourcePublicIPs, fetchVpcResourcePublicIPs } = useFetchVpcResourcePublicIPs(selectedProvider, '', '', selectedAccountId);

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

    // search function
    const search = (data: any[], searchTerm: string, keys: string[]) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return data.filter(item =>
            keys.some(key => item[key]?.toLowerCase().includes(lowerCaseSearchTerm))
        );
    };

    // search keys
    const vpcKeys = ['id', 'name', 'accountId', 'region'];
    const sgKeys = ['id', 'name', 'accountId', 'region', 'vpcId'];
    const vmKeys = ['id', 'name', 'accountId', 'provider', 'owner', 'project', 'type', 'subnetId', 'publicIp', 'state', 'compliant'];
    const subnetKeys = ['id', 'name', 'cidrblock', 'provider', 'accountId', 'region', 'vpcId', 'zone'];
    const aclKeys = ['id', 'name', 'provider', 'accountId', 'region', 'vpcId'];
    const routeTableKeys = ['id', 'name', 'provider', 'accountId', 'region', 'vpcId'];
    const vpcEndpointKeys = ['id', 'name', 'provider', 'accountId', 'region', 'vpcId', 'routeTableIds', 'subnetIds', 'service'];
    const natGatewaysKeys = ['id', 'name', 'accountId', 'vpcId', 'region', 'state', 'publicIp', 'privateIp', 'subnetId'];
    const igsKeys = ['id', 'name', 'provider', 'accountId', 'region', 'vpcId', 'state'];
    const publicIPsKeys = ['id', 'name', 'provider', 'accountId', 'region', 'vpcId', 'state'];

    // serach functions
    const vpcSearch = search(vpcData, searchTerm, vpcKeys);
    const sgSearch = search(vpcResourceSecurityGroups, searchTerm, sgKeys);
    const vmSearch = search(vpcResourceVms, searchTerm, vmKeys);
    const subnetSearch = search(vpcResourceSubnets, searchTerm, subnetKeys);
    const aclSearch = search(vpcResourceACLs, searchTerm, aclKeys);
    const routeTableSearch = search(vpcResourceRouteTables, searchTerm, routeTableKeys);
    const vpcEndpointSearch = search(vpcResourceVpcEndpoints, searchTerm, vpcEndpointKeys);
    const natGatewaysSearch = search(vpcResourceNATGateways, searchTerm, natGatewaysKeys);
    const igsSearch = search(vpcResourceInternetGateways, searchTerm, igsKeys);
    const publicIPsSearch = search(vpcResourcePublicIPs, searchTerm, publicIPsKeys);

    // timer counter
    useEffect(() => {
        if (lastUpdated) {
            const interval = setInterval(() => {
                const now = new Date();
                const minutes = Math.floor((now.getTime() - lastUpdated.getTime()) / 60000);
                setTimeSinceUpdate(`${minutes} minute${minutes === 1 ? '' : 's'} ago`);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [lastUpdated]);

    const buttonData = [
        // { name: 'VPC', fetchFunction: null },
        { name: 'VM', fetchFunction: fetchVpcResourcesVms },
        { name: 'Subnet', fetchFunction: fetchVpcResourcesSubnets },
        { name: 'SGs', fetchFunction: fetchVpcResourceSecurityGroups },
        { name: 'ACL', fetchFunction: fetchVpcResourceACLs },
        { name: 'Route Table', fetchFunction: fetchVpcResourceRouteTables },
        { name: 'VPC Endpoints', fetchFunction: fetchVpcResourceVPCEndpoints },
        { name: 'NAT Gateways', fetchFunction: fetchVpcResourceNATGateways },
        { name: 'IGWs', fetchFunction: fetchVpcResourceInternetGateways },
        { name: 'Public IPs', fetchFunction: fetchVpcResourcePublicIPs },
    ];

    const handleButtonClick = async (name, fetchFunction) => {
        setSelectedView(name);
        setLastUpdated(new Date());
        if (fetchFunction) {
            await fetchFunction();
        }
    };

    const handleVpcSelect = (vpc) => {
        setSelectedVpcId(vpc.id); // row select css
        setSelectedVpc(vpc); // modal data
        setIsModalOpen(true); // open modal
        if (!isModalOpen) {
            setIsModalOpen(true);
        }
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Multi-cloud Infrastructure Resources" />
            <div className="flex justify-between">
                <div className="flex flex-col w-1/6">
                    <input
                        type="text"
                        placeholder="Search by id, name, etc."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="input-field dark:bg-black"
                    />
                </div>
                <ProviderButtons></ProviderButtons>
            </div>
            <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="flex justify-begin">
                    {buttonData.map((button) => (
                        <button
                            className={`dark:border-white dark:text-white button-blue text-sm py-1 whitespace-nowrap ${selectedView === button.name ? 'selected' : ''}`}
                            key={button.name}
                            onClick={() => handleButtonClick(button.name, button.fetchFunction)}
                        >
                            {button.name}
                        </button>
                    ))}
                </div>
                <div>
                    <p>Last updated {timeSinceUpdate}</p>
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
                            {sgSearch.map((group, idx) => (
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
                            {vmSearch.map((group, idx) => (
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
                            {subnetSearch.map((group, idx) => (
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
                            {aclSearch.map((group, idx) => (
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
                            {routeTableSearch.map((group, idx) => (
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
                            {vpcEndpointSearch.map((group, idx) => (
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
                            {natGatewaysSearch.map((group, idx) => (
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
                            {igsSearch.map((group, idx) => (
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
                            {publicIPsSearch.map((group, idx) => (
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
