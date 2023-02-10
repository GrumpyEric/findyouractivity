import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from "react-native-maps";
import { getDistance } from 'geolib';
import { reverseGeocodeAsync } from "expo-location";
import { hawRegion } from "../constants/TestCoords";
import * as Location from 'expo-location';

import { markersRef, userMarkerContext, refreshMap, saveNewMarkerLocation, manualReadMarkerFromDB, getUserInfoFromDB, applyFilters } from "../constants/MainFunctions";
import FloatingActionButton from "./FloatingActionButton";
import { latitudeContext, longitudeContext, mapRef, filterContext, userPosContext, rangeContext, selectedAuthor, editMarkerMode, mapRefEdit, refreshContext } from "./AppContext";

import 'intl'
import 'intl/locale-data/jsonp/de'
import { format } from 'date-fns'
import { useNavigation } from "@react-navigation/native";
import ButtonRegular from "./ButtonRegular";

import PropTypes from 'prop-types'
import Colors from "../constants/Colors";
import { width, height } from "../constants/StylesGlobal";

const MapViewGoogle = (props) => {
  const navigation = useNavigation()
  const [isUserPosLoaded, setIsUserPosLoaded] = useState(false)
  const [userPos, setUserPos] = useState([]);
  const [markerButtonVisible, setMarkerButtonVisible] = useState(false);

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
    setMarkerButtonVisible(true)

    editMarkerMode._currentValue === true

    ? mapRefEdit.current.animateToRegion({
        latitude: userMarkerLatitude,
        longitude: userMarkerLongitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      })

    : mapRef.current.animateToRegion({
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
      refreshMap()
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

  const getCurrentPosition = () => {
    // if (isUserPosLoaded === true) {
    // console.log(userPos);
    if (userPos.coords != undefined) {
      console.log(),

      editMarkerMode._currentValue === true
      ? mapRefEdit.current.animateToRegion({
          latitude: userPos.coords.latitude,
          longitude: userPos.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        })

      : mapRef.current.animateToRegion({
          latitude: userPos.coords.latitude,
          longitude: userPos.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        })
  }}

  useEffect(() => {
    //console.log(markersRef);
  }, [markersRef])

  useEffect(() => {
    console.log('MAPVIEW RANGE:', rangeContext._currentValue);
  }, [region])
  
  return (
    <View style={{...StyleSheet.absoluteFillObject}}>
      <FloatingActionButton
        onPress={() => getCurrentPosition()}
        bottomPos={height * 0.15}
        rightPos={width * 0.025}
        icon={'location-arrow'}
      />

      <FloatingActionButton
        onPress={() => navigation.navigate("FilterScreen")}
        bottomPos={height * 0.25}
        rightPos={width * 0.025}
        icon={'filter'}
      />

      {/* Hilfescreen? */}
      <FloatingActionButton
        onPress={() => refreshMap()}
        bottomPos={height * 0.35}
        rightPos={10}
        icon={'question'}
      />

      {markerButtonVisible && editMarkerMode._currentValue === false ?
      <View style={{
        position: 'absolute',
        bottom: height * 0.1,
        right: width * 0.25,
        // borderWidth: StyleSheet.hairlineWidth,
        // borderColor: 'black',
        elevation: 3,
        alignItems: 'center',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        // borderRadius: 30,
        zIndex: 5,
        // width: 60,
        }}> 
        <ButtonRegular
          text={'Marker erstellen'}
          onPress={() => { editMarkerMode._currentValue = false; navigation.navigate('CreateMarkersScreen') }}
          backgroundColor={Colors.findmyactivityYellow}
          // onPress={() => addMarkerToDB(auth, 'EVENTNAME', 'EVENTDESC', 53.6, 10.045)}
        /> 
      </View>

      : markerButtonVisible && editMarkerMode._currentValue === true ?

      <View style={{
        position: 'absolute',
        bottom: height * 0.1,
        right: width * 0.25,
        // borderWidth: StyleSheet.hairlineWidth,
        // borderColor: 'black',
        elevation: 3,
        alignItems: 'center',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        // borderRadius: 30,
        zIndex: 5,
        // width: 60,
        }}> 
        <ButtonRegular
          text={'Markerposition aktualisieren'}
          onPress={() => { navigation.goBack(); saveNewMarkerLocation() }}
          backgroundColor={Colors.findmyactivityYellow}
          // onPress={() => addMarkerToDB(auth, 'EVENTNAME', 'EVENTDESC', 53.6, 10.045)}
        /> 
      </View>
    
      : null}
      
      <MapView
        key={refreshContext._currentValue}
        provider={PROVIDER_GOOGLE}
        region={region}
        // onRegionChange={(region) => { setRegion(region); } }
        onRegionChangeComplete={(region) => { setRegion(region); } }
        ref={props.mapRef}
        style={props.style}
        initialRegion={props.initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={false}
        // customMapStyle={}
        onMapLoaded={props.onMapLoaded}
        toolbarEnabled={editMarkerMode._currentValue === true ? false : true}
        zoomControlEnabled={true}
        onLongPress = {(e) => updateUserMarker(e.nativeEvent.coordinate)}
        onPanDrag={() => setMarkerButtonVisible(false)}
        // onTouchCancel={() => (region) => { setRegion(region); } }
        // onMarkerPress={() => setMarkerButtonVisible(true)}
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
                {rangeContext._currentValue != null && distanceToUserPos != '?' && rangeContext._currentValue >= distanceToUserPos || rangeContext._currentValue === 21 ?
                <Marker key={index} coordinate={val} pinColor={val.color} tracksViewChanges={true} onPress={() => { HighlightMarker(val); getUserInfoFromDB(val.user) }}>
                  <Callout onPress={ () => navigation.navigate('ViewMarkerScreen', { creationDate:val.creation_date, eventName: val.name, eventDescription: val.description,  eventAuthorUsername: selectedAuthor._current_value.markers.username, eventAuthorDescription: selectedAuthor._current_value.markers.description, eventAuthorID: val.user, eventStartTime: displayStartTime(val), eventEndTime:displayEndTime(val), eventTags: displayTags(val), eventMaxParticipants: val.numberParticipants, eventLocationDescription: val.locationDescription, eventParticipantList: val.participantList } ) }>
                      <Text key={Math.random().toString()}> Name:  {val.name} </Text>
                      <Text key={Math.random().toString()}> Beschreibung:  {val.description} </Text>
                      <Text> Distanz: {distanceToUserPos} km</Text>
                      <Text> Hier klicken für mehr Infos! </Text>
                  </Callout>
                </Marker>
                : null}
              </View>); 
          }
        )
      }

        
      {/* User Marker */}
      {
        userMarker.map((val, index) => 
          {
            return (
              <Marker key={index} coordinate={val} pinColor='blue' draggable={false} tracksViewChanges={true} onPress={() => setMarkerButtonVisible(true)}></Marker>
            ); 

          }
        )
      }
    </MapView>
  </View>
  )
}

MapViewGoogle.propTypes = { initialRegion: PropTypes.object, style: PropTypes.any, onMapLoaded: PropTypes.func, mapRef: PropTypes.any.isRequired }

export default MapViewGoogle