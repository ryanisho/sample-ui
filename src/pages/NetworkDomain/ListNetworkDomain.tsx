import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import '../../css/vpc.css';

// new
import { useFetchNetworkDomains } from "@/common/hooks";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import ProviderRegionBar from '@/components/ProviderRegion/ProviderRegionBar';

const ListNetworkDomain = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAccountId, setSelectedAccountId] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

    // new
    const { fetchAllNetworkDomains } = useFetchNetworkDomains();
    const { grpcData } = useSelector((state: RootState) => state.grpcNetworkDomains);


    useEffect(() => {
        fetchAllNetworkDomains()
    }, []);


    const data = grpcData.map((item: any) => ({
        name: item.name,
        type: item.type,
        provider: item.provider,
        region: item.region,
        id: item.id,
    }));


    const filteredData: typeof data = data.filter(row =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.type.toLowerCase().includes(searchTerm.toLowerCase())
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
                        placeholder="Search by anything"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="input-field"
                    />
                    <ProviderRegionBar></ProviderRegionBar>
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
                                <td className="table-cell">{row.name}</td>
                                <td className="table-cell">{row.type.toUpperCase()}</td>
                                <td className="table-cell">{row.provider}</td>
                                <td className="table-cell">{row.region}</td>
                                <td className="table-cell">{row.id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DefaultLayout>
    );
};

export default ListNetworkDomain;
