import { useState } from "react";
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import '../../css/vpc.css';

// new 
import ProviderButtons from '@/components/ProviderRegion/ProviderRegionBar';
import { useSelector } from "react-redux";
import { useFetchVpcResourceSecurityGroups } from "@/common/hooks";
import { RootState } from "@/store/store";

const SecurityGroups = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // new
    const { vpcs } = useSelector((state: RootState) => state.infraResources); // retrieve vpcs from api
    const accounts = useSelector((state: RootState) => state.infraResources.accounts);


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


    // pass in through state
    const { fetchVpcResourceSecurityGroups } = useFetchVpcResourceSecurityGroups(
        "aws",
        "",
        "",
        "accountId"
    );

    const securityGroups = fetchVpcResourceSecurityGroups();
    console.log(securityGroups);

    // search function, id/name
    const sgSearch: typeof info = info.filter(sg =>
        sg.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sg.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Security Groups View - Infrastructure Resources" />
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
            {/* table start */}
            <div className="mt-3">
                {/* header */}
                <div className="table-header flex justify-between text-left text-sm font-medium text-gray-700 rounded-lg">
                    <span className="w-1/4 px-4 py-2 text-center">Name</span>
                    <span className="w-1/4 px-2 py-2 text-center">ID</span>
                    <span className="w-1/4 px-1 py-2 text-center">Provider</span>
                    <span className="w-1/4 px-1 py-2 text-center">Account ID</span>
                    <span className="w-1/4 px-1 py-2 text-center">Region</span>
                    <span className="w-1/4 px-1 py-2 text-center">VPC ID</span>
                    <span className="w-1/4 px-1 py-2 text-center">Labels</span>
                </div>
                {/* table body */}
                <div>
                    {sgSearch.map((sg, idx) => (
                        <div
                            key={idx}
                            className={`dark:bg-black dark:text-white flex items-center justify-between text-left text-sm font-medium text-gray-700 bg-white rounded-lg my-2 p-4 shadow`}
                        >
                            <span className="w-1/4 px-4 py-2 flex text-center justify-center">{sg.id}</span>
                            <span className="w-1/4 px-4 py-2 flex text-center justify-center">{sg.accountId}</span>
                            <span className="w-1/4 px-4 py-2 flex text-center justify-center">{sg.name}</span>
                            <span className="w-1/4 px-4 py-2 flex text-center justify-center">{sg.region}</span>
                        </div>
                    ))}
                </div>
            </div>
            {/* table end */}
        </DefaultLayout>
    );
};

export default SecurityGroups;
