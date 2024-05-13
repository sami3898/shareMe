import HomeScreen from './src/screens/HomeScreen';
import { useFonts } from 'expo-font'

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  })

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <HomeScreen />
}

