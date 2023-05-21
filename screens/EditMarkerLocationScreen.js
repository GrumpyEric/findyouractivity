import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from 'react-native';
import { height, stylesGlobal, width } from '../constants/StylesGlobal'
import MapViewGoogle from '../components/MapView';
import ButtonVariable from '../components/ButtonVariable';
import Colors from '../constants/Colors';
import { editMarkerValues, mapRefEdit } from "../components/AppContext";

const EditMarkerLocationScreen = ( {navigation} ) => {
  const markerToEdit = {
    name: editMarkerValues._currentValue.name,
    description: editMarkerValues._currentValue.description,
    color: Colors.findmyactivityYellow,
    latitude: editMarkerValues._currentValue.latitude,
    longitude: editMarkerValues._currentValue.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  }

  return (
    <ScrollView accessibilityViewIsModal={true} style={[stylesGlobal.screenContainer]} contentContainerStyle={stylesGlobal.contentContainer}>
      <MapViewGoogle
        style={styles.map_container}
        initialRegion={markerToEdit}
        mapRef={mapRefEdit}
      />

      <View style={styles.button}>
        <ButtonVariable
          text={'Abbrechen'}
          onPress={() => navigation.goBack()}
          backgroundColor={Colors.findmyactivityError}
          borderColor={Colors.findmyactivityText}
          textColor={Colors.findmyactivityWhite}
          width={150}
          accessibilityHint={'Bearbeiten der Markerposition abbrechen'}
        /> 
      </View>
    </ScrollView>
  )
}

export default EditMarkerLocationScreen

const styles = StyleSheet.create({
   button: {
    alignItems: 'center',
    // justifyContent: "flex-end",
    justifyContent: "center",
    position: 'absolute',
    bottom: 0,
    marginBottom: height * 0.025,
    left: width * 0.25 + 25
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  input: {
    backgroundColor: Colors.findmyactivityWhite,
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