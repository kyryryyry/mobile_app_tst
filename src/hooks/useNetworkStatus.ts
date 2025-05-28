import {useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {useAppStateStore, NetworkStatus} from '../store/appStateStore';
import {getNetworkStatus} from '../utils/networkUtils';

let unsubscribe: (() => void) | null = null;

const initNetworkMonitor = () => {
  if (!unsubscribe) {
    const setNetworkStatus = useAppStateStore.getState().setNetworkStatus;

    unsubscribe = NetInfo.addEventListener(state => {
      const status = getNetworkStatus(state.isConnected);
      setNetworkStatus(status);
    });

    NetInfo.fetch().then(state => {
      const status = getNetworkStatus(state.isConnected);
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
