import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import '../../css/vpc.css';
import { useFetchNetworkDomains } from "@/common/hooks";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const ListNetworkDomain = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
    const { fetchAllNetworkDomains } = useFetchNetworkDomains();
    const { grpcData } = useSelector((state: RootState) => state.grpcNetworkDomains);
    const [sortColumn, setSortColumn] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');

    const handleSort = (columnName) => {
        if (sortColumn === columnName) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(columnName);
            setSortDirection('asc');
        }
    };

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

    // Sorting function
    const sortData = (data) => {
        return data.sort((a, b) => {
            if (a[sortColumn] < b[sortColumn]) {
                return sortDirection === 'asc' ? -1 : 1;
            }
            if (a[sortColumn] > b[sortColumn]) {
                return sortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        });
    };

    // Apply sorting
    const sortedData = sortColumn ? sortData([...filteredData]) : filteredData;

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
                        className="dark:bg-black input-field h-10"
                    />
                </div>
            </div>
            <div className="mt-3">
                <table className="data-table">
                    <thead>
                        <tr className="table-header dark:bg-black dark:text-white">
                            <th className="table-cell" onClick={() => handleSort('name')}>
                                Name {sortColumn === 'name' ? (sortDirection === 'asc' ? '↑' : '↓') : '↑↓'}
                            </th>
                            <th className="table-cell" onClick={() => handleSort('type')}>
                                Type {sortColumn === 'type' ? (sortDirection === 'asc' ? '↑' : '↓') : '↑↓'}
                            </th>
                            <th className="table-cell" onClick={() => handleSort('provider')}>
                                Provider {sortColumn === 'provider' ? (sortDirection === 'asc' ? '↑' : '↓') : '↑↓'}
                            </th>
                            <th className="table-cell" onClick={() => handleSort('region')}>
                                Region {sortColumn === 'region' ? (sortDirection === 'asc' ? '↑' : '↓') : '↑↓'}
                            </th>
                            <th className="table-cell" onClick={() => handleSort('id')}>
                                ID {sortColumn === 'id' ? (sortDirection === 'asc' ? '↑' : '↓') : '↑↓'}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="table-body dark:bg-black dark:text-white">
                        {sortedData.map(row => (
                            <tr
                                key={row.id}
                                className={`table-row ${row.id === selectedRowId ? 'selected-row' : ''}`}
                                onClick={() => setSelectedRowId(row.id === selectedRowId ? null : row.id)}
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