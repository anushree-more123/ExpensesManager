import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {ColorMethods} from '../../theme/color.methods';

interface AmountDisplayProps {
  amount: string;
  showDetails: boolean;
  onBackspace: () => void;
}

const AmountDisplay: React.FC<AmountDisplayProps> = ({
  amount,
  showDetails,
  onBackspace,
}) => {
  return (
    <View style={Styles.amountMainContainer}>
      <View style={Styles.amountContainer}>
        <Text style={Styles.currencySymbol}>₹</Text>
        <Text
          style={Styles.amountText}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.3}>
          {amount || '0.00'}
        </Text>
      </View>
      {!showDetails && amount !== '' && (
        <TouchableOpacity
          onPress={onBackspace}
          style={{paddingHorizontal: 10, paddingVertical: 5}}>
          <Icon
            name="delete-left"
            size={24}
            color={ColorMethods.GetColorFromColorCode('slate_500')}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const Styles = StyleSheet.create({
  amountMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  amountContainer: {flex: 1, flexDirection: 'row', alignItems: 'flex-end'},
  currencySymbol: {
    fontSize: 20,
    color: ColorMethods.GeSecondarytColorFromColorCode('secondaryFontColor'),
    marginRight: 4,
    fontFamily: 'Roboto-Regular',
  },
  amountText: {
    fontSize: 48,
    color: ColorMethods.GeSecondarytColorFromColorCode('primaryFontColor'),
    fontFamily: 'Roboto-Medium',
  },
});

export default AmountDisplay;
