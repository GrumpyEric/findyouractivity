import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

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
      // screenOptions={ ({ navigation }) => ({
      //   drawerType: 'front',
      //   drawerPosition: 'right',
      //   drawerStyle: {
      //     width: burgerMenuWidth,
      //     maxWidth: burgerMenuMaxWidth,
      //     start: burgerMenuWidth > burgerMenuMaxWidth ? burgerMenuWidth - burgerMenuMaxWidth : 0
      //   },
      //   swipeEdgeWidth: swipeEdgeWidth,

      //   // Passing through the style for drawer labels (font, size, color) and position
      //   drawerLabelStyle: {
      //     start: stylesGlobal.constants.drawerLabelStart,
      //     fontFamily: stylesGlobal.navigationText.fontFamily, 
      //     fontSize: stylesGlobal.navigationText.fontSize,
      //   },

      //   // Customize header
      //   headerStyle: {
      //     height: headerHeight,
      //     borderBottomWidth: headerborderBottomWidth,
      //     borderBottomColor: headerBorderColor
      //   },
      //   headerTitleAlign: headerTitleAlign,
      //   headerTitleStyle: {
      //     fontFamily: headerFontFamily,
      //     fontSize: headerFontSize,
      //     color: headerFontColor,
      //   },
      // })}
      // // Define drawer content; custom content in BurgerMenuContent.js
      // drawerContent={(props) => <BurgerMenuContent {...props}/>
      // }
    >

      {/* Define screen elements inside left drawer for navigation */}

      {/* Dashboard */}
      <DrawerBurgerMenu.Screen name="HomeScreen" component={HomeScreen}/>
      
    </DrawerBurgerMenu.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
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