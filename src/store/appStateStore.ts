import {create} from 'zustand';

export type NetworkStatus = 'connected' | 'disconnected' | 'unknown';

interface State {
  networkStatus: NetworkStatus;
}

interface Actions {
  setNetworkStatus: (status: NetworkStatus) => void;
}

type AppState = State & Actions;

export const useAppStateStore = create<AppState>(set => ({
  networkStatus: 'unknown',
  setNetworkStatus: status => set({networkStatus: status}),
}));
