import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import RNFS from 'react-native-fs';
import { RootState } from '../../Store/store'; 
import { setExpenseHistory } from '../CreateExpenses/expensesSlice'; 

const ProfileScreen: React.FC = () => {
  const [hasData, setHasData] = useState(false);
  const dispatch = useDispatch();
  const expenseHistory = useSelector((state: RootState) => state.expenses.expenseHistory);

  useEffect(() => {
    if (expenseHistory.length > 0) {
      setHasData(true);
    }
  }, [expenseHistory]);

  const exportData = async () => {
    try {
      const path = RNFS.DocumentDirectoryPath + '/expenseData.json';
      await RNFS.writeFile(path, JSON.stringify(expenseHistory), 'utf8');
      Alert.alert('Exported successfully!', `File saved to ${path}`);
    } catch (error) {
      console.error('Error exporting data: ', error);
      Alert.alert('Failed to export data');
    }
  };

  const importData = async () => {
    try {
      const path = RNFS.DocumentDirectoryPath + '/expenseData.json';
      const fileExists = await RNFS.exists(path);

      if (!fileExists) {
        Alert.alert('No file found to import!');
        return;
      }

      const fileData = await RNFS.readFile(path);
      const parsedData = JSON.parse(fileData);

      const mergedData = [...expenseHistory, ...parsedData];

      dispatch(setExpenseHistory(mergedData));
      Alert.alert('Data imported successfully!');
    } catch (error) {
      console.error('Error importing data: ', error);
      Alert.alert('Failed to import data.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile Screen</Text>

      {hasData && (
        <Button title="Export Data" onPress={exportData} />
      )}

      <Button title="Import Data" onPress={importData} style={styles.importButton} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  importButton: {
    marginTop: 20,
  },
});

export default ProfileScreen;
