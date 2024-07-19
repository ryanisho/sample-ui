import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedResourcesState {
    selectedAccountId: string;
    selectedRegion: string;
    selectedProvider: string;
}

const initialState: SelectedResourcesState = {
    selectedAccountId: '',
    selectedRegion: '',
    selectedProvider: '',
};

export const selectedResourcesSlice = createSlice({
    name: 'selectedResources',
    initialState,
    reducers: {
        setSelectedProvider: (state, action: PayloadAction<string>) => {
            state.selectedProvider = action.payload;
        },
        setSelectedAccountId: (state, action: PayloadAction<string>) => {
            state.selectedAccountId = action.payload;
        },
        setSelectedRegion: (state, action: PayloadAction<string>) => {
            state.selectedRegion = action.payload;
        },
    },
});

export const { setSelectedAccountId, setSelectedRegion, setSelectedProvider } = selectedResourcesSlice.actions;

export default selectedResourcesSlice.reducer;