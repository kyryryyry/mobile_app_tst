import {useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {useAppStateStore, NetworkStatus} from '../store/appStateStore';

let unsubscribe: (() => void) | null = null;

const initNetworkMonitor = () => {
  if (!unsubscribe) {
    const setNetworkStatus = useAppStateStore.getState().setNetworkStatus;

    unsubscribe = NetInfo.addEventListener(state => {
      const connected = state.isConnected;
      const status: NetworkStatus =
        connected === null
          ? 'unknown'
          : connected
          ? 'connected'
          : 'disconnected';
      setNetworkStatus(status);
    });

    NetInfo.fetch().then(state => {
      const connected = state.isConnected;
      const status: NetworkStatus =
        connected === null
          ? 'unknown'
          : connected
          ? 'connected'
          : 'disconnected';
      setNetworkStatus(status);
    });
  }
};

initNetworkMonitor();

export const useNetworkStatus = (): NetworkStatus => {
  const networkStatus = useAppStateStore(state => state.networkStatus);

  useEffect(() => {
    initNetworkMonitor();
  }, []);

  return networkStatus;
};
