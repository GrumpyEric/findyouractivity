import React, {useRef, useState, useEffect} from "react";
import { Alert, Text, TextInput, View, StyleSheet, TouchableOpacity, PermissionsAndroid, NativeModules } from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from "react-native-maps";
import { getDistance } from 'geolib';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import RNCalendarEvents from 'react-native-calendar-events';
import { reverseGeocodeAsync } from "expo-location";
import Geocoder from 'react-native-geocoder';





// TODO: make it class component
const MapViewGoogle = (props) => {


  const [selectedMarker, onSelectMarker] = useState();

  const HighlightMarker = inputMarker => {
    onSelectMarker(inputMarker)
  }

  // CalendarTest mit RNCalendarEvents
  const calendarTest2 = () => {

    let eventLat = selectedMarker.latitude
    let eventLng = selectedMarker.longitude
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

  const mapRef = useRef(null);



  return (
    <MapView
      provider = {PROVIDER_GOOGLE}
      ref= {mapRef}
      style={props.style}
      initialRegion={props.initialRegion}
      showsUserLocation={true}
      followsUserLocation={true}
      onPress = {props.onPress}
      //onRegionChangeComplete runs when the user stops dragging MapView
      onRegionChangeComplete={props.onRegionChangeComplete}

    >
    {/* DB Markers */}
    {
      props.markers.map((val, index) => 
        {
          let distanceToUserPos = "?"//getDistance(val,props.userPos.coords) / 1000
          if (props.userPos.coords != undefined)
          {
            distanceToUserPos = getDistance(val,props.userPos.coords) / 1000
          }
          return (
          <Marker key={index} coordinate={val} pinColor={val.color} tracksViewChanges={true} onPress={() => HighlightMarker(val)}>
            <Callout onPress={() => calendarTest()}>
              <Text key={Math.random().toString()}> {val.name} </Text>
              <Text key={Math.random().toString()}> {val.description} </Text>
              <Text> Distanz: {distanceToUserPos} km</Text>
            </Callout>
        </Marker>); 
        }
      )
    }

      
    {/* User Marker */}
    {
      props.userMarker.map((val, index) => 
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
  )
}

export default MapViewGoogle