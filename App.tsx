import './gesture-handler';
import React from 'react';
import {useColorScheme, StyleSheet} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/Store/store';
import {lightTheme, darkTheme} from './src/theme/theme';
import AppLoaded from './AppLoaded';

function App(): React.JSX.Element {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={isDark ? darkTheme : lightTheme}>
          <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
              <AppLoaded />
            </SafeAreaView>
          </SafeAreaProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
