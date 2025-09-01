import { StatusBar, StyleSheet } from 'react-native';
import { ApiDataProvider } from './api/StartUp/context';
import AppStartUpScreen from './api/StartUp/getData';
import ReviewInApp from './utils/reviewPlayStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import Orientation from 'react-native-orientation-locker';
export default function App() {
  Orientation.lockToPortrait();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <ApiDataProvider>
        <AppStartUpScreen />
      </ApiDataProvider>
      <ReviewInApp />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
