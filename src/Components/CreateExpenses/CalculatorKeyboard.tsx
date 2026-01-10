import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {ColorMethods} from '../../theme/color.methods';

interface CalculatorKeyboardProps {
  onKeyPress: (key: string) => void;
}

const CalculatorKeyboard: React.FC<CalculatorKeyboardProps> = ({
  onKeyPress,
}) => {
  const keys = [
    '/',
    '7',
    '8',
    '9',
    '*',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '+',
    '.',
    '0',
    '✓',
  ];

  return (
    <View style={Styles.keyboard}>
      {keys.map(key => (
        <TouchableOpacity
          key={key}
          style={Styles.keyButton}
          onPress={() => onKeyPress(key)}>
          <Text style={Styles.keyText}>{key}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Styles = StyleSheet.create({
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: ColorMethods.GetColorFromColorCode('purple_900'),
    marginBottom: 0,
  },
  keyButton: {
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1%',
    height: 80,
  },
  keyText: {
    fontSize: 30,
    color: ColorMethods.GetColorFromColorCode('slate_20'),
    fontFamily: 'Roboto-Regular',
  },
});

export default CalculatorKeyboard;
