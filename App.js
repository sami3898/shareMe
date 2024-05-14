import HomeScreen from './src/screens/HomeScreen';
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { COLORS } from './src/utils/Constant';

SplashScreen.preventAutoHideAsync();

export default function App() {


  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  })

  useEffect(() => {

    async function loaded() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }

    loaded()
    
  }, [fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (<HomeScreen />)
}

