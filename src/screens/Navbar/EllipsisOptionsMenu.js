import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './TopNavBarStyles'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEllipsisOptions } from '../../context/EllipsisContext';
import { useUser } from '../../context/userContext';
const EllipsisOptionsMenu = ({ navigateAndCloseDropdown }) => {
  const navigation = useNavigation();
  const {  hideEllipsisOptions } = useEllipsisOptions();
  const { clearUser } = useUser();
    const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); 
      clearUser();
    } catch (error) {
      console.error('AsyncStorage error during logout:', error);
    }
    hideEllipsisOptions();
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.ellipsisOptionsContainer}>
      <TouchableOpacity onPress={() => navigateAndCloseDropdown('About')}>
        <Text style={styles.ellipsisOptionText}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateAndCloseDropdown('Profile')}>
        <Text style={styles.ellipsisOptionText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={ handleLogout}>
        <Text style={styles.ellipsisOptionText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EllipsisOptionsMenu;
