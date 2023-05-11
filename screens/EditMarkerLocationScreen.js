import React, { useState } from "react";
import { View, StyleSheet } from 'react-native';
import { height, stylesGlobal } from '../constants/StylesGlobal'
import MapViewGoogle from '../components/MapView';
import ButtonVariable from '../components/ButtonVariable';
import Colors from '../constants/Colors';
import { editMarkerValues, mapRefEdit } from "../components/AppContext";

const EditMarkerLocationScreen = ( {navigation} ) => {
  const [eventNameInput, onChangeEventInput] = useState("");
  const [eventDescInput, onChangeDescInput] = useState("");

  const markerToEdit = {
    name: editMarkerValues._currentValue.name,
    description: editMarkerValues._currentValue.description,
    color: Colors.findmyactivityGreen,
    latitude: editMarkerValues._currentValue.latitude,
    longitude: editMarkerValues._currentValue.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  }

  return (
    <View style={[stylesGlobal.screenContainer]}>
      <MapViewGoogle
        style={styles.map_container}
        initialRegion={markerToEdit}
        mapRef={mapRefEdit}
      />

      <View style={styles.button}>
        <ButtonVariable
          text={'ABBRECHEN'}
          onPress={() => navigation.goBack()}
          backgroundColor={'red'}
          borderColor={Colors.findmyactivityText}
          width={200}
        /> 
      </View>
    </View>
  )
}

export default EditMarkerLocationScreen

const styles = StyleSheet.create({
   button: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    marginBottom: height * 0.025
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