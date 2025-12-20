import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from 'react-native-paper';

const NoDataCard = () => {
  const {colors} = useTheme();

  const styles = getStyles(colors);

  return (
    <View style={styles.card}>
      <Text style={styles.noDataText}>No Data Found!</Text>
    </View>
  );
};

export default NoDataCard;

const getStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 300,
      borderRadius: 16,
      padding: 20,
      backgroundColor: colors.surface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.outline,
    },
    noDataText: {
      fontSize: 20,
    },
  });
