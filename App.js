import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import LoginScreen from './src/screens/loginscreen/LoginScreen'
import HomeScreen from './src/screens/HomeScreen/HomeScreen/HomeScreen';
import TopNavBar from './src/screens/Navbar/TopNavBar';
import About from './src/screens/HomeScreen/DotsMenu/About/About';
import Profile from './src/screens/HomeScreen/DotsMenu/Profile/Profile';
import { DeviceProvider } from './src/context/DeviceContext';
import { EllipsisOptionsProvider } from './src/context/EllipsisContext';
import { OptionsProvider } from './src/context/OptionsContext';
import { UserProvider } from './src/context/userContext';
import OnDetails from './src/screens/HomeScreen/OnDetails/OnDetails';
import ConsumptionDetails from './src/screens/HomeScreen/ConsumptionDetails/ConsumptionDetails';
import LocationDetails from './src/screens/HomeScreen/LocationDetails/LocationDetails';
import MotorControl from './src/screens/HomeScreen/OnDetails/MotorControl';
const Stack = createStackNavigator();

const App = () => {
  return (
    <UserProvider>
    <OptionsProvider>
    <EllipsisOptionsProvider>
    <DeviceProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="OnDetails" component={OnDetails} />
        <Stack.Screen name="ConsumptionDetails" component={ConsumptionDetails} />
        <Stack.Screen name="LocationDetails" component={LocationDetails} />
        <Stack.Screen name="MotorControl" component={MotorControl} />
        <Stack.Screen name="TopNavBar" component={TopNavBar}/>
        <Stack.Screen name="About" component={About}/>
        <Stack.Screen name="Profile" component={Profile}/>
      </Stack.Navigator>
    </NavigationContainer>
    </DeviceProvider>
    </EllipsisOptionsProvider>
    </OptionsProvider>
    </UserProvider>
  );
};

export default App;
