import React, { useState } from "react";
import { View, StyleSheet } from 'react-native';

import { hawRegion } from '../constants/TestCoords';

import { height, stylesGlobal } from '../constants/StylesGlobal'
import MapViewGoogle from '../components/MapView';
import ButtonRegular from '../components/ButtonRegular';
import Colors from '../constants/Colors';

const EditMarkerLocationScreen = ( {navigation} ) => {
  const [eventNameInput, onChangeEventInput] = useState("");
  const [eventDescInput, onChangeDescInput] = useState("");

  function saveNewMarker() {

  }

  return (
    <View style={[stylesGlobal.screenContainer]}>
      <MapViewGoogle
        style={styles.map_container}
        initialRegion={hawRegion}
        // eventNameInput={eventNameInput}
        // eventDescInput={eventDescInput}
      />

      <View style={styles.button}>
        {/* if new marker has been set, then show button */}
        <ButtonRegular
          text={'ORT AKTUALISIEREN'}
          onPress={() => { navigation.goBack(); saveNewMarker() }}
          backgroundColor={Colors.findmyactivityYellow}
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