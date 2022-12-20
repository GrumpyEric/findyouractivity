import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import BurgerMenuContent from './components/Drawer/BurgerMenuContent'

const Stack = createNativeStackNavigator();
const DrawerBurgerMenu = createDrawerNavigator();

function BurgerMenuScreen() {
  return (
    // return left drawer navigator
    <DrawerBurgerMenu.Navigator
      id="BurgerMenu"
      initialRouteName="HomeScreen"
      backBehavior='history'
      // Customize drawer
      screenOptions={({ navigation }) => ({
        drawerType: 'front',
        headerShown: false, 
      })}
      // Define drawer content; custom content in BurgerMenuContent.js
      drawerContent={(props) => <BurgerMenuContent {...props}/>}
    >
      <DrawerBurgerMenu.Screen name="HomeScreen" component={HomeScreen}/>
      
    </DrawerBurgerMenu.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        translucent={true}
        backgroundColor='transparent'
        barStyle={'dark-content'}
        // hidden={hidden} 
      />
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Group>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={BurgerMenuScreen} />
          <Stack.Screen name="ForgotPW" component={ForgotPasswordScreen} />
        </Stack.Group>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}