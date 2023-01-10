import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { stylesGlobal } from '../constants/StylesGlobal'
import { db } from "../firebase/firebase-config";
import { markersRef } from '../constants/MainFunctions';
import { mapRef } from '../components/AppContext';
import { getDistance } from 'geolib';

const MyMarkersScreen = ( {navigation} ) => {

const moveToMarker = (inputMarker) => {
  mapRef.current.animateToRegion({
    latitude: inputMarker.latitude,
    longitude: inputMarker.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  })
  navigation.pop()
}

  return (
    <ScrollView >
      <View style={stylesGlobal.screenContainer}>
      <Text>MARKERS</Text>

      {
        markersRef.map((val, index) => 
          {
            /*
            let distanceToUserPos = "?"//getDistance(val,props.userPos.coords) / 1000
            if (userPos.coords != undefined)
            {
              distanceToUserPos = getDistance(val, userPos.coords) / 1000
            }*/
            return (
              <View  key={index} style={{backgroundColor: '#DDDDDD', marginBottom: 10}}>
                <TouchableOpacity onPress={() => moveToMarker(val)}>
                  <Text key={Math.random().toString()}> {"MARKERNAME: " + val.name} </Text>
                  <Text key={Math.random().toString()}> {"BESCHREIBUNG: " + val.description} </Text>                  
                  <Text> Tags: {val.tags} </Text>
                  {/*<Text> Distanz: {distanceToUserPos} km</Text>*/}
                </TouchableOpacity>
                {/* <Text> Distanz: {distanceToUserPos} km</Text> */}
              </View>
            )
          }
        )
      }

      <TouchableOpacity onPress={() => navigation.pop()}>
        <Text>Close</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default MyMarkersScreen

// const styles = StyleSheet.create({

// })