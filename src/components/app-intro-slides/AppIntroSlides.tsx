import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import SLIDEONEIMG from '../../../assets/images/SlideOne.png';
import SLIDTWOIMG from '../../../assets/images/SlideTwo.png';
import SLIDETHREEIMG from '../../../assets/images/SlideThree.png';
import Styles from './AppIntroSlidesStyles';
type AppIntroSlidesProps = {
  onDone: () => void;
};

type SlideItem = {
  key: string;
  title: string;
  text: string;
  image?: any;
};

const slides: SlideItem[] = [
  {
    key: '1',
    title: 'Track Your Expenses',
    text: 'Effortlessly track your expenses and manage your finances',
    image: SLIDEONEIMG,
  },
  {
    key: '2',
    title: 'Categorize Spending',
    text: 'Organize your expenses by category for better tracking',
    image: SLIDTWOIMG,
  },
  {
    key: '3',
    title: 'Set Budgets',
    text: 'Get insights into your spending habits with a detailed category-wise analysis',
    image: SLIDETHREEIMG,
  },
];

const AppIntroSlides: React.FC<AppIntroSlidesProps> = ({ onDone }) => {
  const renderItem = ({ item }: { item: SlideItem }) => (
    <View style={Styles.slide}>
      <Image source={item.image} style={Styles.image} />
      <Text style={Styles.title}>{item.title}</Text>
      <Text style={Styles.text}>{item.text}</Text>
    </View>
  );

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      onDone={onDone}
      dotStyle={Styles.dot}
      activeDotStyle={Styles.activeDot}
      bottomButton
      renderNextButton={() => (
        <View style={Styles.button}>
          <Text style={Styles.buttonText}>Next</Text>
        </View>
      )}
      renderDoneButton={() => (
        <View style={Styles.button}>
          <Text style={Styles.buttonText}>Done</Text>
        </View>
      )}
    />
  );
};

export default AppIntroSlides;
