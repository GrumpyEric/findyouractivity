import Colors from "./Colors";
import { StyleSheet, Platform, PixelRatio, Dimensions } from "react-native";
import * as Device from 'expo-device';

const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height

const isTablet = (width > 450) ? true : false
const isIOS = Platform.OS === 'ios'
const isAndroid = Platform.OS === 'android'
const deviceName = Device.modelName

const stylesGlobal = StyleSheet.create({
  //----- Text -----//
  standardText: {
    fontWeight: '700',
    fontSize: 16,
    color: 'white'
  },

  //----- Screenviews -----//
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10%',
    backgroundColor: Colors.findmyactivityBackground
  },

  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },


})

export { stylesGlobal, width, height, isAndroid, isIOS, isTablet }