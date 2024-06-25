import React, { useState, useEffect } from 'react';
import { InfraResourceProvider } from "@/common/enum";

// new imports
import { useFormContext } from "react-hook-form";
import { useFetchVpcAccounts, useFetchRegions, useFetchVpcsResources } from "@/common/hooks";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setInfraVpcs } from "@/store/infra-resources-slice/infraResourcesSlice";


const ProviderRegionBar = () => {

    // accounts + regions
    const { accounts } = useSelector((state: RootState) => state.infraResources);
    const { regions } = useSelector((state: RootState) => state.infraResources);

    const dispatch = useDispatch<AppDispatch>();
    // account id and region?
    const [selectedAccountId, setSelectedAccountId] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');

    const [selectedButton, setLastClickedProvider] = useState<InfraResourceProvider>(InfraResourceProvider.ALL_PROVIDERS);

    // api calls 
    const { fetchAccounts } = useFetchVpcAccounts(selectedButton);
    const { fetchVpcs } = useFetchVpcsResources(selectedButton, selectedAccountId, selectedRegion); // optional params.
    const { fetchRegions } = useFetchRegions(selectedButton);

    useEffect(() => {
        fetchAccounts();
    }, []);

    // display all accountIds and regionNames, ignore for now.

    // const accountIds: any[] = accounts.reduce((uniqueIds: any[], account: any, index: number) => {
    //     const accountId = account.accountId;
    //     if (!uniqueIds.some((item: any) => item.value === accountId)) {
    //         uniqueIds.push({
    //             label: accountId,
    //             value: accountId,
    //             key: accountId + index,
    //         });
    //     }
    //     return uniqueIds;
    // }, []);

    // const regionNames: any[] = regions.reduce((uniqueIds: any[], region: any, index: number) => {
    //     const regionName = region.regionName;
    //     if (!uniqueIds.some((item: any) => item.value === regionName)) {
    //         uniqueIds.push({
    //             label: regionName,
    //             value: regionName,
    //             key: regionName + index,
    //         });
    //     }
    //     return uniqueIds;
    // }, []);

    const handleAccountIdChange = (value: string) => {
        setSelectedAccountId(value)
        handleProviderSelect(selectedButton)
    };

    const handleRegionChange = (value: string) => {
        setSelectedRegion(value)
        handleProviderSelect(selectedButton)
    };

    const handleProviderSelect = (value: any) => {
        if (!value) {
            dispatch(setInfraVpcs([]));
        } else {
            switch (value) {
                case InfraResourceProvider.AWS:
                    console.log('AWS');
                    dispatch(setInfraVpcs([]));
                    setLastClickedProvider(InfraResourceProvider.AWS);
                    setTimeout(() => {
                        fetchAccounts()
                        fetchVpcs();
                        fetchRegions();
                    }, 1000);
                    break;
                case InfraResourceProvider.GCP:
                    console.log('GCP');
                    dispatch(setInfraVpcs([]));
                    setLastClickedProvider(InfraResourceProvider.GCP);
                    setTimeout(() => {
                        fetchAccounts()
                        fetchVpcs();
                        fetchRegions();
                    }, 1000);
                    break;
                case InfraResourceProvider.AZURE:
                    console.log('Azure');
                    dispatch(setInfraVpcs([]));
                    setLastClickedProvider(InfraResourceProvider.AZURE);
                    setTimeout(() => {
                        fetchAccounts()
                        fetchVpcs();
                        fetchRegions();
                    }, 1000);
                    break;

                case InfraResourceProvider.CISCO_ISE:
                    console.log('Cisco');
                    dispatch(setInfraVpcs([]));
                    setLastClickedProvider(InfraResourceProvider.CISCO_ISE);
                    break;

                case InfraResourceProvider.ALL_PROVIDERS:
                    console.log('All');
                    dispatch(setInfraVpcs([]));
                    setLastClickedProvider(InfraResourceProvider.ALL_PROVIDERS);
                    break;

                default:
                    console.log(`Unhandled exception, value is ${value}`);
                    break;
            }
        }
    };

    return (
        <>
            <div style={{ marginBottom: "10px", justifyContent: "space-between" }}>

                <div className="flex justify-end">
                    {[
                        { name: 'AWS', enum: InfraResourceProvider.AWS },
                        { name: 'GCP', enum: InfraResourceProvider.GCP },
                        { name: 'Azure', enum: InfraResourceProvider.AZURE },
                        { name: 'Cisco', enum: InfraResourceProvider.CISCO_ISE },
                        { name: 'All', enum: InfraResourceProvider.ALL_PROVIDERS },
                    ].map((button) => (
                        <button
                            className={`button-blue ${selectedButton === button.name ? 'selected' : ''}`}
                            key={button.name}
                            onClick={() => handleProviderSelect(button.enum)}
                        >
                            {button.name}
                        </button>
                    ))}
                </div>

            </div>
            {/* <div className="flex flex-col w-1/6">
                <select
                    value={selectedAccountId}
                    onChange={e => handleAccountIdChange(e.target.value)}
                    className="select-field"
                >
                    <option value="">Select Account ID</option>
                    {accounts.map(id => <option key={id} value={id}>{id}</option>)}
                </select>

                <select
                    value={selectedRegion}
                    onChange={e => handleRegionChange(e.target.value)}
                    className="select-field"
                >
                    <option value="">Select Region</option>
                    {regions.map(region => <option key={region} value={region}>{region}</option>)}
                </select>
            </div> */}
        </>
    );
};

export default ProviderRegionBar;