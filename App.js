import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet} from 'react-native';
import BottomTabNavigation from './src/components/BottomNavigation';
export default function App() {
  return (
    <SafeAreaView>
      <StatusBar style='auto' />
      <BottomTabNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
