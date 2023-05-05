import React, { useState } from "react";
import { View, StyleSheet } from 'react-native';

import { hawRegion } from '../constants/TestCoords';

import { height, stylesGlobal } from '../constants/StylesGlobal'
import MapViewGoogle from '../components/MapView';
import FloatingBurgerMenu from '../components/FloatingBurgerMenu';
import { mapRef } from '../components/AppContext';

import { collection, query, onSnapshot, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase/firebase-config';

const HomeScreen = ( {navigation} ) => {
  const [eventNameInput, onChangeEventInput] = useState("");
  const [eventDescInput, onChangeDescInput] = useState("");

  return (
    <View style={[stylesGlobal.screenContainer]}>
      <FloatingBurgerMenu
        onPress={() => navigation.openDrawer()}
        icon={'navicon'}
      />

      <MapViewGoogle
        style={styles.map_container}
        initialRegion={hawRegion}
        mapRef={mapRef}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
   button: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
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
    // ...StyleSheet.absoluteFillObject,
    // flex: 1,
    height: '93.75%'
    // justifyContent: "flex-end",
    // alignItems: "center",
  },

})