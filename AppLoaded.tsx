import React, { useEffect, useState } from 'react';
import AppIntroSlides from './src/components/app-intro-slides/AppIntroSlides';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native';

const AppLoaded = () => {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const checkIntroStatus = async () => {
      try {
        const introStatus = await AsyncStorage.getItem('intro_done');
        setIsDone(introStatus === 'true');
      } catch (error) {
        console.error('Error reading intro status from AsyncStorage:', error);
        setIsDone(false);
      }
    };

    checkIntroStatus();
  }, []);

  const handleDone = async () => {
    try {
      await AsyncStorage.setItem('intro_done', 'true');
      setIsDone(true);
    } catch (error) {
      console.error('Error saving intro status to AsyncStorage:', error);
    }
  };

  return !isDone ? <AppIntroSlides onDone={handleDone} /> : <Text>hiii</Text>;
};

export default AppLoaded;
