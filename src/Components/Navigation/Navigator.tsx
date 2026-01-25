import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AddUpdateExpenseScreen from '../Screens/AddUpdateExpenseScreen';
import CategoriesScreen from '../Categories/CategoriesScreen';
import ManageCategoryScreen from '../Categories/ManageCategoryScreen';
import {RootStackParamList} from './RootStackParamList';
import MainTabNavigator from './MainTabNavigator';

const Stack = createStackNavigator<RootStackParamList>();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={MainTabNavigator} />
        <Stack.Screen name="AddExpenses" component={AddUpdateExpenseScreen} />
        <Stack.Screen
          name="UpdateExpenses"
          component={AddUpdateExpenseScreen}
        />
        <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
        <Stack.Screen name="ManageCategory" component={ManageCategoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
