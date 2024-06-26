import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import ModalComponent from '../../components/Modal/KubernetesModal';
import ProviderRegionBar from '@/components/ProviderRegion/ProviderRegionBar';

const clusters = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAccountId, setSelectedAccountId] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<typeof data[number] | null>(null);

    const data = [
        {
            id: 1,
            name: 'Cluster-1',
            fullName: 'Full Cluster-1',
            arn: 'arn:aws:eks:us-west-1:123456789012:cluster/Cluster-1',
            region: 'us-west-1',
            vpcId: 'vpc-0abcd1234efgh5678',
            provider: 'AWS',
            accountId: '123456789012',
            labels: 'Label1'
        },
        {
            id: 2,
            name: 'Cluster-2',
            fullName: 'Full Cluster-2',
            arn: 'arn:aws:eks:us-west-2:123456789012:cluster/Cluster-2',
            region: 'us-west-2',
            vpcId: 'vpc-0abcd1234efgh5678',
            provider: 'AWS',
            accountId: '123456789012',
            labels: 'Label2'
        },
        {
            id: 3,
            name: 'Cluster-3',
            fullName: 'Full Cluster-3',
            arn: 'arn:aws:eks:us-east-1:123456789012:cluster/Cluster-3',
            region: 'us-east-1',
            vpcId: 'vpc-0abcd1234efgh5678',
            provider: 'AWS',
            accountId: '123456789012',
            labels: 'Label3'
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
            <Breadcrumb pageName="Kubernetes Clusters Across All Providers" />

            <div className="flex justify-between">
                <div className="flex flex-col w-1/4">
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="dark:bg-black input-field"
                    />
                </div>
                <ProviderRegionBar></ProviderRegionBar>
            </div>

            <div className="mt-3">
                <table className="data-table">
                    <thead>
                        <tr className="table-header dark:bg-black dark:text-white">
                            <th className="table-cell">Account ID</th>
                            <th className="table-cell">Name</th>
                            <th className="table-cell">Fullname</th>
                            <th className="table-cell">ARN</th>
                            <th className="table-cell">Region</th>
                            <th className="table-cell">VPC ID</th>
                            <th className="table-cell">Provider</th>
                            <th className="table-cell">Labels</th>
                        </tr>
                    </thead>
                    <tbody className="table-body dark:bg-black dark:text-white">
                        {filteredData.map(row => (
                            <tr
                                key={row.id}
                                className={`table-row ${row.id === selectedRowId ? 'selected-row' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (row.id === selectedRowId) {
                                        setSelectedRowId(null);
                                        setIsModalOpen(false);
                                    } else {
                                        setSelectedRowId(row.id);
                                        setSelectedRow(row);
                                        setIsModalOpen(true);

                                    }
                                }}
                            >
                                <td className="table-cell">{row.id}</td>
                                <td className="table-cell">{row.name}</td>
                                <td className="table-cell">{row.fullName}</td>
                                <td className="table-cell">{row.arn}</td>
                                <td className="table-cell">{row.region}</td>
                                <td className="table-cell">{row.vpcId}</td>
                                <td className="table-cell">{row.provider}</td>
                                <td className="table-cell">{row.labels}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ModalComponent
                    isModalOpen={isModalOpen}
                    onRequestClose={() => { setIsModalOpen(false); setSelectedRowId(null) }}
                    selectedRow={selectedRow}
                />
            </div>
        </DefaultLayout>
    );
};

export default clusters;
