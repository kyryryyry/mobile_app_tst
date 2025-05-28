import {NetworkStatus} from '../store/appStateStore';

export const getNetworkStatus = (isConnected: boolean | null): NetworkStatus => {
  if (isConnected === null) return 'unknown';
  return isConnected ? 'connected' : 'disconnected';
};