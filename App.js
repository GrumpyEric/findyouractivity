import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { auth } from './firebase/firebase-config';

import { StatusBar } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import FilterScreen from './screens/FilterScreen';
import CreateMarkersScreen from './screens/modals/CreateMarkersScreen';
import BurgerMenuContent from './components/Drawer/BurgerMenuContent';
import ProfileScreen from './screens/ProfileScreen';
import { isIOS, isTablet, stylesGlobal, width } from './constants/StylesGlobal';
import EditMarkerLocationScreen from './screens/EditMarkerLocationScreen';
import ViewMarkerScreen from './screens/modals/ViewMarkerScreen';
import EventScreen from './screens/EventScreen';
import Colors from './constants/Colors';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { handleSignOut } from './constants/MainFunctions';
import { editMarkerMode, saveProfileChangesFunctionContext } from './components/AppContext';
import RegisterScreen from './screens/RegisterScreen';
import HilfeScreen from './screens/modals/HilfeScreen';

const options = (navigation, route, props) => {
  return (
    {
      headerTitle: '', 
      headerLeft: () => 
        route.name === 'Profil'
        ? null 
        : headerLeft(navigation, route), 
      headerRight: () => 
        route.name === 'CreateMarkersScreen' ||
        route.name === 'EditMarkerLocationScreen' ||
        route.name === 'FilterScreen' ||
        route.name === 'ViewMarkerScreen' ||
        route.name === 'Passwort zurücksetzen' ||
        route.name === 'RegisterScreen'
        ? null
        : headerRight(), 
      headerStyle: {
        backgroundColor: Colors.findmyactivityBackground,
      },
      props
    }
  )
}

const headerLeft = (navigation, route) => {
  return (
    <TouchableOpacity
      onPress={() => 
        {
          navigation.goBack()
          if (route.name === 'CreateMarkersScreen') {
            editMarkerMode._currentValue === true ? editMarkerMode._currentValue = false : null
          }
        }
      }
      style={styles.headerLeftStyle}
    >
      <Icon
        name='arrow-left'
        size={25}
      />
      <Text style={[stylesGlobal.standardText, {marginLeft: 5}]}>Zurück</Text>
    </TouchableOpacity>
  )
}

const headerRight = () => {
  return (
    <TouchableOpacity
      onPress={() => saveProfileChangesFunctionContext._currentValue()}
      style={styles.headerRightStyle}
    >
      <Icon 
        name="content-save"
        size={25}
        style={{marginRight: 5}}
      />
      <Text style={stylesGlobal.standardText}>Speichern</Text>

    </TouchableOpacity>
  )
}

const optionsNoHeader = () => {
  return (
    {
      headerShown: false
    }
  )
}

const LoginStack = createStackNavigator();
function LoginStackScreen() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen options={optionsNoHeader} name="LoginScreen" component={LoginScreen}/>
      <LoginStack.Screen options={({ navigation, route }) => options(navigation, route)} name="RegisterScreen" component={RegisterScreen}/>
      <LoginStack.Screen options={({ navigation, route }) => options(navigation, route)} name="Passwort zurücksetzen" component={ForgotPasswordScreen}/>
    </LoginStack.Navigator>
  )
}

const LogoutTabNullComponent = () => {
  return null
}

const Tab = createBottomTabNavigator();
function TabBarScreen({ navigation }) {
  return (
    <Tab.Navigator 
      initialRouteName='Karte'
      backBehavior='initialRoute'  
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Profil') {
            iconName = focused
              ? 'account'
              : 'account-outline';
          } else if (route.name === 'Karte') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Events') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Logout') {
            iconName = 'logout';
          }
          
          return <Icon name={iconName} size={size} color={route.name === 'Logout' ? '#FF0000' : color} />;
        },
        tabBarActiveTintColor: Colors.findmyactivityYellow,
        tabBarInactiveTintColor: Colors.findmyactivityWhite,
        tabBarActiveBackgroundColor: Colors.findmyactivityText,
        tabBarInactiveBackgroundColor: Colors.findmyactivityText,
        
      })}
    >
      <Tab.Screen options={({ navigation, route }) => options(navigation, route)} name="Profil" component={ProfileScreen}/>
      <Tab.Screen options={optionsNoHeader} name="Karte" component={HomeScreen}/>
      <Tab.Screen options={optionsNoHeader} name="Events" component={EventScreen}/>
      <Tab.Screen name="Logout" component={LogoutTabNullComponent} options={{tabBarButton: (props) => (
        <TouchableOpacity {...props} onPress={() => handleSignOut(auth, navigation)}/>
        )}}/>
    </Tab.Navigator>
  )
}

const DrawerBurgerMenu = createDrawerNavigator();
function BurgerMenuScreen() {
  return (
    // return left drawer navigator
    <DrawerBurgerMenu.Navigator
      id="BurgerMenu"
      initialRouteName="HomeScreen"
      backBehavior='history'
      // Customize drawer
      screenOptions={() => ({
        drawerType: 'front',
        headerShown: false, 
      })}
      // Define drawer content; custom content in BurgerMenuContent.js
      drawerContent={(props) => <BurgerMenuContent {...props}/>}
    >
      <DrawerBurgerMenu.Screen name="Home" component={TabBarScreen}/>
      
    </DrawerBurgerMenu.Navigator>
  )
}

const HomeStack = createStackNavigator()
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen options={optionsNoHeader} name='MainScreen' component={BurgerMenuScreen}/>
      <HomeStack.Group screenOptions={ () => ({
        animationEnabled: false,
        presentation: 'transparentModal',
        gestureEnabled: false, 
        cardStyle: {
          top: isTablet ? '20%' : '10%',
          left: isTablet ? '20%' : null,
          maxHeight: isTablet ? '60%' : '80%',
          width: isTablet ? '60%' : '100%',
          elevation: 10,
          overflow: isIOS ? 'visible' : 'hidden',
          backgroundColor: 'white',
          borderRadius: 15,
          shadowColor: "black",
          borderWidth: 2,
          borderColor: Colors.findmyactivityText,
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
        },

        })}>
        <HomeStack.Screen options={({ navigation, route }) => options(navigation, route)} name='CreateMarkersScreen' component={CreateMarkersScreen}/>
        <HomeStack.Screen options={({ navigation, route }) => options(navigation, route)} name='HilfeScreen' component={HilfeScreen}/>
        <HomeStack.Screen options={optionsNoHeader} name='EditMarkerLocationScreen' component={EditMarkerLocationScreen}/>
        <HomeStack.Screen options={({ navigation, route }) => options(navigation, route)} name="FilterScreen" component={FilterScreen}/>          
        <HomeStack.Screen options={({ navigation, route }) => options(navigation, route)} name="ViewMarkerScreen" component={ViewMarkerScreen}/>
      </HomeStack.Group>
    </HomeStack.Navigator>
  )
}

const Stack = createStackNavigator()
export default function App() {

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={Colors.findmyactivityText}
      />

      <Stack.Navigator screenOptions={{
        animation: 'none'
      }}>
        <Stack.Screen options={optionsNoHeader} name='Login' component={LoginStackScreen}/>
        <Stack.Screen options={optionsNoHeader} name='Home' component={HomeStackScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerLeftStyle: {
    paddingLeft: width * 0.03, 
    flexDirection: 'row', 
    alignItems: 'center',
    position: 'absolute'
  },

  headerRightStyle: {
    paddingRight: width * 0.03, 
    flexDirection: 'row', 
    alignItems: 'center',
    position: 'absolute'
  },
})