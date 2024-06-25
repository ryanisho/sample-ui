import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import '../../css/vpc.css';

// new
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useFetchVpcAccounts, useFetchRegions, useFetchVpcsResources } from "@/common/hooks";
import { setInfraVpcs } from "@/store/infra-resources-slice/infraResourcesSlice";
import { InfraResourceProvider, InfraResourceType, Tooltips } from "@/common/enum";
import { Clusters, NetworkDomains, ProviderAndAccountId } from "../../components/views/list-infra-resources/_components";
import { useFetchVpcResourceClusters, useFetchVpcResourceSubnets, useFetchVpcResourceVms, useFetchVpcResourceSecurityGroups, useFetchVpcResourceRouteTables, useFetchVpcResourceACLs, useFetchVpcResourceVpcEndpoints, useFetchVpcResourceRouters, useFetchVpcResourceNATGateways, useFetchVpcResourceInternetGateways, useFetchVpcResourcePublicIPs, } from "@/common/hooks";
import {
    setInfraSelectedRow,
    setResourceFetchedEntities,
    setResourceType,
    setInfraClusterSelectedRow,
} from "@/store/infra-resources-slice/infraResourcesSlice";



const ListNetworkDomain = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAccountId, setSelectedAccountId] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

    // new
    const { count, status } = useSelector((state: RootState) => state.summary);

    const { selectedRow } = useSelector((state: RootState) => state.infraResources);


    const { fetchVpcResourcesVms } = useFetchVpcResourceVms(
        selectedRow.provider,
        selectedRow.region,
        selectedRow.id,
        selectedRow.accountId
    );

    const { fetchVpcResourcesSubnets } = useFetchVpcResourceSubnets(
        selectedRow.provider,
        selectedRow.region,
        selectedRow.id,
        selectedRow.accountId
    );

    const { fetchVpcResourceSecurityGroups } = useFetchVpcResourceSecurityGroups(
        selectedRow.provider,
        selectedRow.region,
        selectedRow.id,
        selectedRow.accountId
    );

    const { fetchVpcResourceRouteTables } = useFetchVpcResourceRouteTables(
        selectedRow.provider,
        selectedRow.region,
        selectedRow.id,
        selectedRow.accountId
    );

    const { fetchVpcResourceVPCEndpoints } = useFetchVpcResourceVpcEndpoints(
        selectedRow.provider,
        selectedRow.region,
        selectedRow.id,
        selectedRow.accountId
    );

    const { fetchVpcResourceRouters } = useFetchVpcResourceRouters(
        selectedRow.provider,
        selectedRow.region,
        selectedRow.id,
        selectedRow.accountId
    );

    const { fetchVpcResourceNATGateways } = useFetchVpcResourceNATGateways(
        selectedRow.provider,
        selectedRow.region,
        selectedRow.id,
        selectedRow.accountId
    );

    const { fetchVpcResourceInternetGateways } = useFetchVpcResourceInternetGateways(
        selectedRow.provider,
        selectedRow.region,
        selectedRow.id,
        selectedRow.accountId
    );

    const { fetchVpcResourcePublicIPs } = useFetchVpcResourcePublicIPs(
        selectedRow.provider,
        selectedRow.region,
        selectedRow.id,
        selectedRow.accountId
    );

    const { fetchVpcResourceACLs } = useFetchVpcResourceACLs(
        selectedRow.provider,
        selectedRow.region,
        selectedRow.id,
        selectedRow.accountId
    );


    const { fetchVpcResourcesClusters } = useFetchVpcResourceClusters(
        selectedRow.provider,
        selectedRow.region,
        selectedRow.id,
        selectedRow.accountId
    );

    const handleResourceChange = (value: InfraResourceType) => {
        const [isDrawerVisible, setIsDrawerVisible] = useState(false);
        const [selectedResourceType, setSelectedResourceType] = useState<string>();
        const dispatch = useDispatch<AppDispatch>();

        dispatch(setResourceType(value));
        switch (value) {
            case InfraResourceType.VMS:
                dispatch(setResourceFetchedEntities([]));
                fetchVpcResourcesVms();
                setIsDrawerVisible(true);
                // setIsClusterDrawerVisible(false);
                setSelectedResourceType(InfraResourceType.VMS);
                break;
            case InfraResourceType.SUBNETS:
                dispatch(setResourceFetchedEntities([]));
                fetchVpcResourcesSubnets();
                setIsDrawerVisible(true);
                // setIsClusterDrawerVisible(false);
                setSelectedResourceType(InfraResourceType.SUBNETS);
                break;
            case InfraResourceType.CLUSTERS:
                dispatch(setResourceFetchedEntities([]));
                fetchVpcResourcesClusters();
                //setIsDrawerVisible(false);
                // setIsClusterDrawerVisible(false);
                setSelectedResourceType(InfraResourceType.CLUSTERS);
                break;
            case InfraResourceType.SECURITY_GROUPS:
                dispatch(setResourceFetchedEntities([]));
                fetchVpcResourceSecurityGroups();
                setIsDrawerVisible(true);
                // setIsClusterDrawerVisible(false);
                setSelectedResourceType(InfraResourceType.SECURITY_GROUPS);
                break;
            case InfraResourceType.ACLS:
                dispatch(setResourceFetchedEntities([]));
                fetchVpcResourceACLs();
                setIsDrawerVisible(true);
                // setIsClusterDrawerVisible(false);
                setSelectedResourceType(InfraResourceType.ACLS);
                break;
            case InfraResourceType.ROUTE_TABLES:
                dispatch(setResourceFetchedEntities([]));
                fetchVpcResourceRouteTables();
                setIsDrawerVisible(true);
                // setIsClusterDrawerVisible(false);
                setSelectedResourceType(InfraResourceType.ROUTE_TABLES);
                break;
            case InfraResourceType.VPC_ENDPOINTS:
                dispatch(setResourceFetchedEntities([]));
                fetchVpcResourceVPCEndpoints();
                setIsDrawerVisible(true);
                // setIsClusterDrawerVisible(false);
                setSelectedResourceType(InfraResourceType.VPC_ENDPOINTS);
                break;
            case InfraResourceType.CLOUD_ROUTERS:
                dispatch(setResourceFetchedEntities([]));
                fetchVpcResourceRouters();
                setIsDrawerVisible(true);
                // setIsClusterDrawerVisible(false);
                setSelectedResourceType(InfraResourceType.CLOUD_ROUTERS);
                break;
            case InfraResourceType.NAT_GATEWAYS:
                dispatch(setResourceFetchedEntities([]));
                fetchVpcResourceNATGateways();
                setIsDrawerVisible(true);
                // setIsClusterDrawerVisible(false);
                setSelectedResourceType(InfraResourceType.NAT_GATEWAYS);
                break;
            case InfraResourceType.INTERNET_GATEWAYS:
                dispatch(setResourceFetchedEntities([]));
                fetchVpcResourceInternetGateways();
                setIsDrawerVisible(true);
                // setIsClusterDrawerVisible(false);
                setSelectedResourceType(InfraResourceType.INTERNET_GATEWAYS);
                break;
            case InfraResourceType.PUBLIC_IPS:
                dispatch(setResourceFetchedEntities([]));
                fetchVpcResourcePublicIPs();
                setIsDrawerVisible(true);
                // setIsClusterDrawerVisible(false);
                setSelectedResourceType(InfraResourceType.PUBLIC_IPS);
                break;
        }
    };

    const data = [
        {
            id: 1,
            name: 'Resource-1',
            type: 'EC2',
            provider: 'AWS',
            region: 'us-west-1',
            accountId: '123456789012',
        },
        {
            id: 2,
            name: 'Resource-2',
            type: 'S3',
            provider: 'AWS',
            region: 'us-west-2',
            accountId: '123456789012',
        },
        {
            id: 3,
            name: 'Resource-3',
            type: 'RDS',
            provider: 'AWS',
            region: 'us-east-1',
            accountId: '2374723784234',
        },
    ]

    const accountIds = Array.from(new Set(data.map(item => item.accountId)));
    const regions = Array.from(new Set(data.map(item => item.region)));

    const filteredData: typeof data = data.filter(row =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedAccountId ? row.accountId === selectedAccountId : true) &&
        (selectedRegion ? row.region === selectedRegion : true)
    );

    const [selectedButton, setSelectedButton] = useState('All');

    const handleButtonClick = (buttonName: string) => {
        setSelectedButton(buttonName);
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="List Network Domains" />

            <div className="flex justify-between">
                <div className="flex flex-col w-1/4">
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="input-field"
                    />

                    <div className="flex">
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
                </div>
            </div>

            <div className="mt-3">
                <table className="data-table">
                    <thead>
                        <tr className="table-header">
                            <th className="table-cell">Name</th>
                            <th className="table-cell">Type</th>
                            <th className="table-cell">Provider</th>
                            <th className="table-cell">Region</th>
                            <th className="table-cell">ID</th>

                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {filteredData.map(row => (
                            <tr
                                key={row.id}
                                className={`table-row ${row.id === selectedRowId ? 'selected-row' : ''}`}
                                onClick={(e) => {
                                    if (row.id === selectedRowId) {
                                        setSelectedRowId(null);
                                    } else {
                                        setSelectedRowId(row.id);
                                    }
                                }}
                            >
                                <td className="table-cell">{row.id}</td>
                                <td className="table-cell">{row.name}</td>
                                <td className="table-cell">{row.type}</td>
                                <td className="table-cell">{row.provider}</td>
                                <td className="table-cell">{row.region}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DefaultLayout>
    );
};

export default ListNetworkDomain;
