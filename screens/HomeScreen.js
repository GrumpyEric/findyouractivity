import { useNavigation } from '@react-navigation/core'
import React, {useState, useEffect, errorMsg } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';

import { hawRegion } from '../constants/TestCoords';

import { height, stylesGlobal } from '../constants/StylesGlobal'
import MapViewGoogle from '../components/MapView';
import FloatingBurgerMenu from '../components/FloatingBurgerMenu';
import { addMarkerToDB } from '../constants/MainFunctions';
import ButtonRegular from '../components/ButtonRegular';
import { auth } from '../firebase/firebase-config';
import Colors from '../constants/Colors';

const HomeScreen = ( {navigation} ) => {
  const [eventNameInput, onChangeEventInput] = useState("");
  const [eventDescInput, onChangeDescInput] = useState("");

  return (
    <View style={[stylesGlobal.screenContainer]}>
      <FloatingBurgerMenu
        onPress={() => navigation.openDrawer()}
      />

      <MapViewGoogle
        style={styles.map_container}
        initialRegion={hawRegion}
        eventNameInput={eventNameInput}
        eventDescInput={eventDescInput}
      />
      
      {/* MARKER ERSTELLEN */}
      {/* // TODO: make marker creation better - maybe just button with "create marker", then modal opens with marker creation formular */}
      {/* <TextInput style={styles.input} placeholder='EVENT NAME' value={eventNameInput} onChangeText={onChangeEventInput}></TextInput>
      <TextInput style={styles.input} placeholder='DESCRIPTION' value={eventDescInput} onChangeText={onChangeDescInput}></TextInput> */}
      <View style={styles.button}>
        <ButtonRegular
          text={'CREATE MARKER'}
          onPress={() => navigation.navigate('CreateMarkersScreen')}
          backgroundColor={Colors.findmyactivityYellow}
          // onPress={() => addMarkerToDB(auth, 'EVENTNAME', 'EVENTDESC', 53.6, 10.045)}
        /> 
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
   button: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    marginBottom: height * 0.05
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    margin: 1,
    borderWidth: 1,
    padding: 5,
  },

  map_container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },

})