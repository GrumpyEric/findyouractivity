
import Colors from "./Colors";
import { StyleSheet, Platform, PixelRatio, Dimensions } from "react-native";
import * as Device from 'expo-device';

const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height

const isTablet = (width > 450) ? true : false
const isIOS = Platform.OS === 'ios'
const isAndroid = Platform.OS === 'android'
const deviceName = Device.modelName
const paddingBetweenItems = 10
const paddingBetweenViews = 20

const stylesGlobal = StyleSheet.create({
  //----- Text -----//
  standardText: {
    fontWeight: '400',
    fontSize: 16,
    color: Colors.findmyactivityText
  },
  
  ueberschriftText: {
    fontWeight: 'bold',
    fontSize: 28,
    color: Colors.findmyactivityText
  },

  ueberschriftText2: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.findmyactivityText
  },

  buttonTextBlack: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.findmyactivityText
  },

  buttonTextWhite: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.findmyactivityWhite
  },

  marginsAndPadding: {
    paddingBetweenItems: paddingBetweenItems,
    paddingBetweenViews: paddingBetweenViews
  },

  //----- Screenviews -----//
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '10%',
    paddingVertical: '5%',
  },

  contentContainerMainScreens: {
    marginTop: '20%',
    width: '100%'
  },

  spacingBetweenText: {
    marginBottom: paddingBetweenItems
  },

  textCenterStyle: {
    textAlign: 'left'
  },

})

export { stylesGlobal, width, height, isAndroid, isIOS, isTablet, paddingBetweenItems, paddingBetweenViews }