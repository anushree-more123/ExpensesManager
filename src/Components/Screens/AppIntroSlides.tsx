import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import SLIDEONEIMG from '../../../assets/SlideOne.png';
import SLIDTWOIMG from '../../../assets/SlideTwo.png';
import SLIDETHREEIMG from '../../../assets/SlideThree.png';
import {ColorMethods} from '../../theme/color.methods';

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

console.log('ColorMethods', ColorMethods);

const AppIntroSlides: React.FC<AppIntroSlidesProps> = ({onDone}) => {
  const renderItem = ({item}: {item: SlideItem}) => (
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

const Styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: ColorMethods.GetColorFromColorCode('slate_100'),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  title: {
    color: ColorMethods.GeSecondarytColorFromColorCode('primaryFontColor'),
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Roboto-Bold',
  },
  text: {
    color: ColorMethods.GeSecondarytColorFromColorCode('secondaryFontColor'),
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
  dot: {
    backgroundColor: ColorMethods.GetColorFromColorCode('slate_300'),
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: ColorMethods.GetColorFromColorCode('purple_200'),
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  button: {
    backgroundColor: ColorMethods.GetColorFromColorCode('purple_300'),
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: ColorMethods.GetColorFromColorCode('slate_20'),
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
  },
});

export default AppIntroSlides;
