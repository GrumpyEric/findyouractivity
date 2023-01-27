import React, {useRef, useState, useEffect} from "react";
import { Alert, Text, TextInput, View, StyleSheet, TouchableOpacity, PermissionsAndroid, NativeModules } from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from "react-native-maps";
import { getDistance } from 'geolib';
import { reverseGeocodeAsync } from "expo-location";
import Geocoder from 'react-native-geocoder';
import Icon from "react-native-vector-icons/FontAwesome";
import { hawRegion } from "../constants/TestCoords";
import * as Location from 'expo-location';
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

import { markersRef, userMarkerContext, applyFilters } from "../constants/MainFunctions";
import FloatingActionButton from "./FloatingActionButton";
import { latitudeContext, longitudeContext, mapRef, filterContext, userPosContext } from "./AppContext";

import 'intl'
import 'intl/locale-data/jsonp/de'
import { intlFormat } from 'date-fns'

const MapViewGoogle = (props) => {
  const [isUserPosLoaded, setIsUserPosLoaded] = useState(false)
  const [userPos, setUserPos] = useState([]);

  // get current Region
  const [region, setRegion] = useState(props.initialRegion);

  const [userMarker, setUserMarker] = useState([hawRegion]);

  let userMarkerLatitude = 0
  let userMarkerLongitude = 0

  const updateUserMarker = newInputRegion => {
    setUserMarker([newInputRegion])
    userMarkerLatitude = newInputRegion.latitude
    userMarkerLongitude = newInputRegion.longitude
    latitudeContext._currentValue = userMarkerLatitude
    longitudeContext._currentValue = userMarkerLongitude

    mapRef.current.animateToRegion({
      latitude: userMarkerLatitude,
      longitude: userMarkerLongitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    })
  }

  // get user position
  useEffect(() => {
    (async () => {      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        errorMsg('Permission to access location was denied');
        return;
      }

      let currentUserPos = await Location.getCurrentPositionAsync({});
      setUserPos(currentUserPos);
      userPosContext._currentValue = currentUserPos
      setIsUserPosLoaded(true)
    })();
  }, []);
  
  const [selectedMarker, onSelectMarker] = useState();

  const HighlightMarker = inputMarker => {
    onSelectMarker(inputMarker)
    //alert(inputMarker.startTime)
    //Alert.alert(selectedMarker.name.toString(), selectedMarker.description.toString() );
    //Alert.alert(selectedMarker.longitude.toString(), selectedMarker.latitude.toString() );
  }

  
  const geodude = async(eventLat,eventLng) => {
    let address = "";
    reverseGeocodeAsync({latitude:eventLat,longitude:eventLng})
    .then((value) =>{      
      address = `${value[0].name}, ${value[0].street}, ${value[0].postalCode}, ${value[0].city}`
      //alert(address)
      return address
    })
    .catch((error) => {
      alert(error)
    })
  }



  //const mapRef = useRef(null);
  
  const getCurrentPosition = () => {
    // if (isUserPosLoaded === true) {
    // console.log(userPos);
    if (userPos.coords != undefined) {
    mapRef.current.animateToRegion({
      latitude: userPos.coords.latitude,
      longitude: userPos.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    })
  }}

  return (
    <View style={{...StyleSheet.absoluteFillObject}}>
      <FloatingActionButton
        onPress={() => getCurrentPosition()}
        bottomPos={100}
        rightPos={10}
      />
    {/*
    <FloatingActionButton
        onPress={() => alert(filterContext._current_value)}
        bottomPos={250}
        rightPos={10}
      /> 
    */}


      <MapView
        provider = {PROVIDER_GOOGLE}
        region={region}
        onRegionChangeComplete={(region) => {setRegion(region)} }
        ref = {mapRef}
        style={props.style}
        initialRegion={props.initialRegion}
        showsUserLocation={true}
        followsUserLocation={true}
        onLongPress = {(e) => updateUserMarker(e.nativeEvent.coordinate)}
        //onRegionChangeComplete runs when the user stops dragging MapView        
      >
      {/* DB Markers */}
      {
        // markersRef.current.map((val, index) => 
        markersRef.map((val, index) => 
          {
            let distanceToUserPos = "?"//getDistance(val,props.userPos.coords) / 1000
            if (userPos.coords != undefined)
            {
              distanceToUserPos = getDistance(val, userPos.coords) / 1000
            }

            const displayTags = (val) => {
              if( (val.tags != undefined)) 
              {
                return <Text> Tags: {val.tags.toString()}</Text>
              }
            }

            const displayStartTime = (val) => {

              let startTimeRes = ""//val.startTime

              if( (val.startTime != undefined) ) 
              {
                //return <Text> Start-Zeit: {val.startTime.toDate().toString()} </Text>
                startTimeRes = val.startTime
              }
              else if ( !(val.startTime != undefined) ) 
              {
                //return <Text> Start-Zeit: unbekannt </Text>
                startTimeRes = "unbekannt"
              }
              return  <Text> Start-Zeit: {startTimeRes.toString()} </Text>
            }

            const displayEndTime = (val) => {

              let endTimeRes = ""//val.endTime

              if( (val.endTime != undefined) ) 
              {
                //return <Text> Start-Zeit: {val.startTime.toDate().toString()} </Text>
                endTimeRes = val.endTime
              }
              else if ( !(val.endTime != undefined) ) 
              {
                //return <Text> Start-Zeit: unbekannt </Text>
                endTimeRes = "unbekannt"
              }

              return  <Text> End-Zeit: {endTimeRes.toString()} </Text>
            }

            const displayAuthor = (val) => {
              if ( (val.user != undefined) )
              {
                return <Text> erstellt von: {val.user} </Text>
              }
            }

            return (
            <Marker key={index} coordinate={val} pinColor={val.color} tracksViewChanges={true} onPress={() => HighlightMarker(val)}>
              <Callout>
                <Text key={Math.random().toString()}> {val.name} </Text>
                <Text key={Math.random().toString()}> {val.description} </Text>
                { displayAuthor(val) }
                { displayStartTime(val) }
                { displayEndTime(val) }
                <Text> Distanz: {distanceToUserPos} km</Text>
                { displayTags(val) }
              </Callout>
          </Marker>); 
          }
        )
      }

        
      {/* User Marker */}
      {
        userMarker.map((val, index) => 
          {
            return (
            <Marker key={index} coordinate={val} pinColor='blue' draggable={false} tracksViewChanges={true}>
              <Callout >
                <Text key={Math.random().toString()}> {props.eventNameInput} </Text>
                <Text key={Math.random().toString()}> {props.eventDescInput} </Text>
              </Callout>
          </Marker>); 
          }
        )
      }
    </MapView>
  </View>
  )
}

export default MapViewGoogle