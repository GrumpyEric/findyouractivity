import React from "react";
import { View, StyleSheet } from 'react-native';

import { hawRegion } from '../constants/TestCoords';

import { stylesGlobal } from '../constants/StylesGlobal'
import MapViewGoogle from '../components/MapView';
import FloatingBurgerMenu from '../components/FloatingBurgerMenu';
import { mapRef } from '../components/AppContext';

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
  map_container: {
    flex: 1
  },

})