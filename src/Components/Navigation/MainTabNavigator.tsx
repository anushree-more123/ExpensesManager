import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useTheme, Surface} from 'react-native-paper';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
import HexagonFAB from '../Common/HexagonFab';
import WelcomeScreen from '../Screens/WelcomeScreen';
import {useSelector} from 'react-redux';
import {RootState} from '../../Store/store';
import ExpenseHistoryScreen from '../Screens/ExpenseHistoryScreen';
import ReportScreen from '../Screens/ReportScreen';
import ProfileScreen from '../Screens/ProfileScreen';

const tabs = [
  {key: 'overview', icon: 'house'},
  {key: 'analytics', icon: 'chart-bar'},
  {key: 'center', icon: 'plus'},
  {key: 'report', icon: 'chart-simple'},
  {key: 'profile', icon: 'user'},
];

const OverviewScreen = () => <Text>Overview Screen</Text>;
const AnalyticsScreen = () => <Text>Analytics Screen</Text>;
interface MainTabNavigatorProps {
  navigation: any;
  route: any;
}

const MainTabNavigator: React.FC<MainTabNavigatorProps> = ({
  navigation,
  route,
}) => {
  const {colors} = useTheme();
  const {expenseHistory} = useSelector((state: RootState) => state.expenses);
  const [activeTab, setActiveTab] = useState('overview');

  const renderScreen = () => {
    switch (activeTab) {
      case 'overview':
        if (expenseHistory.length > 0) {
          return <ExpenseHistoryScreen />;
        } else {
          return <WelcomeScreen />;
        }
      case 'analytics':
        return <AnalyticsScreen />;
      case 'report':
        return <ReportScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <OverviewScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.screen}>{renderScreen()}</View>

      <Surface style={[styles.bottomBar, {backgroundColor: colors.surface}]}>
        {tabs.map(tab =>
          tab.key === 'center' ? (
            <HexagonFAB
              key="fab"
              onPress={() => navigation.navigate('AddExpenses')}
            />
          ) : (
            <TouchableOpacity
              key={tab.key}
              style={styles.tab}
              onPress={() => setActiveTab(tab.key)}>
              <Icon
                name={tab.icon}
                size={20}
                color={activeTab === tab.key ? colors.primary : '#A1A0B2'}
              />
            </TouchableOpacity>
          ),
        )}
      </Surface>
    </View>
  );
};

export default MainTabNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 65,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10,
    paddingBottom: 10,
    elevation: 12,
    backgroundColor: '#0B0F2B',
    position: 'relative',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 5,
  },
});
