import React from 'react';
import {QueryClientProvider} from '@tanstack/react-query';
import AppNavigator from './src/navigation/AppNavigator';
import {queryClient} from './src/config/queryClient';

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigator />
    </QueryClientProvider>
  );
}

export default App;
