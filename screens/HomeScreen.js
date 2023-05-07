import React, { useState } from "react";
import { View, StyleSheet } from 'react-native';

import { hawRegion } from '../constants/TestCoords';

import { height, stylesGlobal } from '../constants/StylesGlobal'
import MapViewGoogle from '../components/MapView';
import FloatingBurgerMenu from '../components/FloatingBurgerMenu';
import { mapRef } from '../components/AppContext';
import { DrawerActions } from "@react-navigation/native";

const HomeScreen = ( {navigation} ) => {
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
    flex: 1
  },

})