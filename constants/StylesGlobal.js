import { StyleSheet } from "react-native";

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
    paddingHorizontal: '10%'
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

export default stylesGlobal