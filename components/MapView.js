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

  // CalendarTest mit RNCalendarEvents
  const calendarTest2 = () => {

    let eventLat = selectedMarker.latitude
    let eventLng = selectedMarker.longitude
    //alert({eventLat,eventLng}.toString())
    //Alert.alert(eventLat.toString(),eventLng.toString())
    RNCalendarEvents.saveEvent("Find Your Activity Event", {
      description: selectedMarker.description,
      notes: selectedMarker.description,
      startDate:  '2023-6-2T15:46:40Z',
      endDate:  '2023-7-2T18:46:40Z',
      location: geodude(eventLat,eventLng),
    }).then((value)=> {

    }).catch((error)=> {
      console.log(error)
    })
  }


  // CalendarTest mit AddCalendarEvent
  const calendarTest = async() =>{
    let eventLat = selectedMarker.latitude
    let eventLng = selectedMarker.longitude
    const eventConfig = {
      title: selectedMarker.name.toString(),
      notes: selectedMarker.description.toString(),
      location: geodude(eventLat,eventLng),
      startDate:  '2023-6-2T15:46:40Z',
      endDate:  '2023-7-2T18:46:40Z'};

      AddCalendarEvent.presentNewCalendarEventDialog(eventConfig)
      .then(eventId => {
        //handle success (receives event id) or dismissing the modal (receives false)
        if (eventId) {
          console.warn(eventId);
        } else {
          console.warn('dismissed');
        }
      })
      .catch((error) => {
        // handle error such as when user rejected permissions
        console.warn(error);
      });

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

<FloatingActionButton
        onPress={() => alert(filterContext._current_value)}
        bottomPos={250}
        rightPos={10}
      />

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

            const displayTags = () => {
              if( (val.tags != undefined)) 
              {
                return <Text> Tags: {val.tags.toString()}</Text>
              }
            }

            const displayTime = (val) => {
              if( (val.startTime != undefined) ) 
              {
                return <Text> Start-Zeit: {intlFormat(val.startTime, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                  }, 
                    {locale: 'de-DE',}
                  )} </Text>
              }
              else
              {
                return <Text> Start-Zeit: {val.startTime} </Text>
              }
            }

            return (
            <Marker key={index} coordinate={val} pinColor={val.color} tracksViewChanges={true} onPress={() => HighlightMarker(val)}>
              <Callout>
                <Text key={Math.random().toString()}> {val.name} </Text>
                <Text key={Math.random().toString()}> {val.description} </Text>
                { displayTime(val) }
                <Text> Distanz: {distanceToUserPos} km</Text>
                { displayTags() }
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