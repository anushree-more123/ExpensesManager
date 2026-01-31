import React from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import { DatabaseProvider } from '@nozbe/watermelondb/DatabaseProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { store } from './src/store';
import { database } from './src/db';
import AppLoaded from './AppLoaded';

export default function App() {
  return (
    <Provider store={store}>
      <DatabaseProvider database={database}>
        <SafeAreaProvider>
          <AppLoaded />
        </SafeAreaProvider>
      </DatabaseProvider>
    </Provider>
  );
}
