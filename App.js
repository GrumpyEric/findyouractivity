import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import FilterScreen from './screens/FilterScreen';
import CreateMarkersScreen from './screens/modals/CreateMarkersScreen';
import BurgerMenuContent from './components/Drawer/BurgerMenuContent';
import ProfileScreen from './screens/ProfileScreen';
import { isIOS, isTablet } from './constants/StylesGlobal';
import EditMarkerLocationScreen from './screens/EditMarkerLocationScreen';
import ViewMarkerScreen from './screens/modals/ViewMarkerScreen';
import ViewAuthorScreen from './screens/modals/ViewAuthorScreen';
import ViewParticipantScreen from './screens/modals/ViewParticipantScreen';
import EventScreen from './screens/EventScreen';

const Stack = createStackNavigator();
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
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="EventScreen" component={EventScreen} />
        </Stack.Group>

        <Stack.Group screenOptions={ () => ({
          presentation: 'transparentModal',
          gestureEnabled: false, 
          ...TransitionPresets.ScaleFromCenterAndroid,
          cardStyle: {
            top: isTablet ? '20%' : '15%',
            left: isTablet ? '20%' : null,
            maxHeight: isTablet ? '60%' : '70%',
            width: isTablet ? '60%' : '100%',
            elevation: 10,
            overflow: isIOS ? 'visible' : 'hidden',
            backgroundColor: 'white',
            borderRadius: 15,
            shadowColor: "black",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
          },

          })}>
          <Stack.Screen name='CreateMarkersScreen' component={CreateMarkersScreen}/>
          <Stack.Screen name='EditMarkerLocationScreen' component={EditMarkerLocationScreen}/>
          {/* <Stack.Screen name="MyMarkersScreen" component={MyMarkersScreen}/> */}
          <Stack.Screen name="FilterScreen" component={FilterScreen}/>          
          <Stack.Screen name="ViewMarkerScreen" component={ViewMarkerScreen}/>
          <Stack.Screen name="ViewAuthorScreen" component={ViewAuthorScreen}/>          
          <Stack.Screen name="ViewParticipantScreen" component={ViewParticipantScreen}/>
        </Stack.Group>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}