import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootState} from './src/Store/store';
import AppIntroSlides from './src/Components/Screens/AppIntroSlides';
import Navigator from './src/Components/Navigation/Navigator';

const AppLoaded = () => {
  const [isDone, setIsDone] = useState(false);
  const {expenseHistory} = useSelector((state: RootState) => state.expenses);

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

  return !isDone && expenseHistory.length === 0 ? (
    <AppIntroSlides onDone={handleDone} />
  ) : (
    <Navigator />
  );
};

export default AppLoaded;
