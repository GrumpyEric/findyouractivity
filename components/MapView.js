import React, {useRef, useState, useEffect} from "react";
import { Alert, Text, TextInput, View, StyleSheet, TouchableOpacity, PermissionsAndroid, NativeModules } from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from "react-native-maps";
import { getDistance } from 'geolib';
import { reverseGeocodeAsync } from "expo-location";
import { hawRegion } from "../constants/TestCoords";
import * as Location from 'expo-location';

import { markersRef, userMarkerContext, applyFilters, manualReadMarkerFromDB, getUserInfoFromDB } from "../constants/MainFunctions";
import FloatingActionButton from "./FloatingActionButton";
import { latitudeContext, longitudeContext, mapRef, filterContext, userPosContext, rangeContext, selectedAuthor } from "./AppContext";

import 'intl'
import 'intl/locale-data/jsonp/de'
import { format } from 'date-fns'
import { useNavigation } from "@react-navigation/native";

const MapViewGoogle = (props) => {
  
  const navigation = useNavigation()
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
      //console.log(userPosContext._currentValue);
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
      //console.log(),
    mapRef.current.animateToRegion({
      latitude: userPos.coords.latitude,
      longitude: userPos.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    })
  }}

  useEffect(() => {
    //console.log(markersRef);
  }, [markersRef])
  

  return (
    <View style={{...StyleSheet.absoluteFillObject}}>
      <FloatingActionButton
        onPress={() => getCurrentPosition()}
        bottomPos={100}
        rightPos={10}
        icon={'location-arrow'}
      />

      <FloatingActionButton
        onPress={() => navigation.navigate("FilterScreen")}
        bottomPos={200}
        rightPos={10}
        icon={'filter'}
      />

      <FloatingActionButton
        onPress={() => manualReadMarkerFromDB()}
        bottomPos={300}
        rightPos={10}
        icon={'database'}
      />
      
      <MapView
        zoomControlEnabled = {true}
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
                startTimeRes = format(val.startTime.toDate(), 'dd.MM.yyyy, HH:mm') + ' Uhr'
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
                endTimeRes = format(val.endTime.toDate(), 'dd.MM.yyyy, HH:mm') + ' Uhr'
              }
              else if ( !(val.endTime != undefined) ) 
              {
                //return <Text> Start-Zeit: unbekannt </Text>
                endTimeRes = "unbekannt"
              }

              return  <Text> End-Zeit: {endTimeRes.toString()} </Text>
            }

            return (
              <View key={index}>
                <Marker key={index} coordinate={val} pinColor={val.color} tracksViewChanges={true} onPress={() => getUserInfoFromDB(val.user)}>
                  <Callout onPress={ () => navigation.navigate('ViewMarkerScreen', { creationDate:val.creation_date, eventName: val.name, eventDescription: val.description,  eventAuthorUsername: selectedAuthor._current_value.markers.username, eventAuthorDescription: selectedAuthor._current_value.markers.description, eventAuthorID: val.user, eventStartTime: displayStartTime(val), eventEndTime:displayEndTime(val), eventTags: displayTags(val), eventMaxParticipants: val.numberParticipants, eventLocationDescription: val.locationDescription, eventParticipantList: val.participantList } ) }>
                      <Text key={Math.random().toString()}> Name:  {val.name} </Text>
                      <Text key={Math.random().toString()}> Beschreibung:  {val.description} </Text>
                      <Text> Distanz: {distanceToUserPos} km</Text>
                      <Text> Hier klicken für mehr Infos! </Text>
                  </Callout>
                </Marker>
                {/* : null} */}
              </View>); 
          }
        )
      }

        
      {/* User Marker */}
      {
        userMarker.map((val, index) => 
          {
            return (
            <Marker key={index} coordinate={val} pinColor='blue' draggable={false} tracksViewChanges={true}>
          </Marker>); 
          }
        )
      }
    </MapView>
  </View>
  )
}

export default MapViewGoogle