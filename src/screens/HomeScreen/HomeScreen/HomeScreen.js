import React, { useState,useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import RIcon from 'react-native-remix-icon';
import styles from './HomeStyles';
import TopNavBar from '../../Navbar/TopNavBar';
import OnDetails from '../OnDetails/OnDetails';
import ConsumptionDetails from '../ConsumptionDetails/ConsumptionDetails';
import LocationDetails from '../LocationDetails/LocationDetails';
import { useOptionsContext } from '../../../context/OptionsContext';
import { useEllipsisOptions } from '../../../context/EllipsisContext';
import { useUser } from '../../../context/userContext';
const BottomNavbar = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('OnDetails');
  const {  hideOptions } = useOptionsContext();
  const {  hideEllipsisOptions } = useEllipsisOptions();
 const {user} = useUser();
 useEffect(() => {
  
  if (!user.email || !user.phone) {
    navigation.navigate('LoginScreen');
  }
}, [user, navigation]);
  const navigateToScreen = (screenName) => {
    setActiveTab(screenName);
    hideOptions();
    hideEllipsisOptions();
  };

  return (
    <>
      <TopNavBar email={user.email} phone={user.phone} />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigateToScreen('OnDetails')}
        >
          <RIcon
            name="ri-global-line"
            size={28}
            color={activeTab === 'OnDetails' ? 'white' : 'black'}
          />
          <Text
            style={[
              styles.label,
              activeTab === 'OnDetails' && { color: 'white' },
            ]}
          >
            ON DETAILS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigateToScreen('ConsumptionDetails')}
        >
          <RIcon
            name="ri-bar-chart-fill"
            size={28}
            color={activeTab === 'ConsumptionDetails' ? 'white' : 'black'}
          />
          <Text
            style={[
              styles.label,
              activeTab === 'ConsumptionDetails' && { color: 'white' },
            ]}
          >
            CONSUMPTION
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigateToScreen('LocationDetails')}
        >
          <RIcon
            name="ri-map-pin-line"
            size={28}
            color={activeTab === 'LocationDetails' ? 'white' : 'black'}
          />
          <Text
            style={[
              styles.label,
              activeTab === 'LocationDetails' && { color: 'white' },
            ]}
          >
            LOCATION
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'OnDetails' && <OnDetails />}
      {activeTab === 'ConsumptionDetails' && <ConsumptionDetails />}
      {activeTab === 'LocationDetails' && <LocationDetails />}
    </>
  );
};

export default BottomNavbar;
