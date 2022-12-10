import { useNavigation } from '@react-navigation/core'
import { auth, db } from '../firebase/firebase-config'

import { collection, query, onSnapshot } from "firebase/firestore";
import * as Location from 'expo-location';
import { getDistance } from 'geolib';

import React, {useState, useRef, useEffect, errorMsg } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';

import { hawRegion } from '../constants/TestCoords';
import { handleSignOut, addMarkerToDB } from '../constants/MainFunctions';
import stylesGlobal from '../constants/StylesGlobal'
import MapViewGoogle from '../components/MapView';

let userMarkerLatitude = 0
let userMarkerLongitude = 0
let markers = [];

// const user = auth.currentUser;

const HomeScreen = () => {
  const [userMarker, setUserMarker] = useState([hawRegion]);
  const [userPos, setUserPos] = useState();

  const [eventNameInput, onChangeEventInput] = useState("");
  const [eventDescInput, onChangeDescInput] = useState("");
  // const [eventLongInput, onChangeLongInput] = useState("");
  // const [eventLatInput, onChangeLatInput] = useState("");

  const navigation = useNavigation()

  // get current Region
  const [region, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,

  });

  // IMPORTANT!: MARKER von DB ablesen
  const q = query(collection(db,"markers"));
  const readMarkerFromDB = onSnapshot(q, (QuerySnapshot) => {
    const db_markers = [];  
    QuerySnapshot.forEach( (doc) => {
      db_markers.push(doc.data().markers);
    } );    
    markers = db_markers;
  })

  const updateUserMarker = newInputRegion => {
    setUserMarker([newInputRegion])
    userMarkerLatitude = newInputRegion.latitude
    userMarkerLongitude = newInputRegion.longitude
  }

  // get user position
  useEffect(() => {
    (async () => {      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        errorMsg('Permission to access location was denied');
        return;
      }

      let bnuuy = await Location.getCurrentPositionAsync({});
      setUserPos(bnuuy);
    })();
  }, []);

  return (
    <View style={[stylesGlobal.screenContainer]}>
      <MapViewGoogle
        style={styles.map}
        initialRegion={hawRegion}
        onPress = {(e) => updateUserMarker(e.nativeEvent.coordinate)}
        onRegionChangeComplete={(region) => setRegion(region)}
        markers={markers}
        userPos={userPos}
        userMarker={userMarker}
        eventNameInput={eventNameInput}
        eventDescInput={eventDescInput}
      />
      
      {/* MARKER ERSTELLEN */}
      {/* // TODO: make marker creation better - maybe just button with "create marker", then modal opens with marker creation formular */}
      <TextInput style={styles.input} placeholder='EVENT NAME' value={eventNameInput} onChangeText={onChangeEventInput}></TextInput>
      <TextInput style={styles.input} placeholder='DESCRIPTION' value={eventDescInput} onChangeText={onChangeDescInput}></TextInput>
      <TouchableOpacity
        onPress={() => addMarkerToDB(auth, markers, eventNameInput, eventDescInput, userMarkerLatitude, userMarkerLongitude, setRegion, userMarker)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>CREATE MARKER</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleSignOut(auth, navigation)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>

      
      
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
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
})