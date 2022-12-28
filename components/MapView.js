import React, {useRef, useState, useEffect} from "react";
import { Alert, Text, TextInput, View, StyleSheet, TouchableOpacity, PermissionsAndroid, NativeModules } from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from "react-native-maps";
import { getDistance } from 'geolib';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import RNCalendarEvents from 'react-native-calendar-events';
import { reverseGeocodeAsync } from "expo-location";
import Geocoder from 'react-native-geocoder';
import Icon from "react-native-vector-icons/FontAwesome";
import { hawRegion } from "../constants/TestCoords";
import * as Location from 'expo-location';
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const MapViewGoogle = (props) => {
  const [userPos, setUserPos] = useState([]);

  // get current Region
  const [region, setRegion] = useState(props.initialRegion);

  const [userMarker, setUserMarker] = useState([hawRegion]);

  const markersRef = useRef([])
  let userMarkerLatitude = 0
  let userMarkerLongitude = 0

  const q = query(collection(db, "markers"));
  const readMarkerFromDB = onSnapshot(q, (QuerySnapshot) => {
    const db_markers = [];
    QuerySnapshot.forEach( (doc) => {
      db_markers.push(doc.data().markers);
    } );
    markersRef.current = db_markers
  })

  // IMPORTANT!: MARKER von DB ablesen
  // useEffect(() => {
  //   readMarkerFromDB()
  //   // console.log("after: " + markers);
  // }, [region])

  const updateUserMarker = newInputRegion => {
    setUserMarker([newInputRegion])
    userMarkerLatitude = newInputRegion.latitude
    userMarkerLongitude = newInputRegion.longitude
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
      // console.log(userPos);

    })();
  }, [region]);
  
  const [selectedMarker, onSelectMarker] = useState();

  const HighlightMarker = inputMarker => {
    onSelectMarker(inputMarker)
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

  const mapRef = useRef(null);

  const [latitude, setLatitude] = useState(hawRegion.latitude)
  const [longitude, setLongitude] = useState(hawRegion.longitude)
  const [error, setError] = useState()
  const [isListingSelected, setIsListingSelected] = useState()

  // useEffect(() => {
  //   getCurrentPosition()
  // }, [])
  

  const getCurrentPosition = () => {
    mapRef.current.animateToRegion({
      latitude: userPos.coords.latitude,
      longitude: userPos.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    })
  }

  // const LocationButton = () => {
  //   if (!isListingSelected) {
  //     return (
  //       <TouchableOpacity
  //         style={{
  //           backgroundColor: 'white',
  //           position: 'absolute',
  //           bottom: 10,
  //           right: 10,
  //           padding: 15,
  //           elevation: 3,
  //           alignItems: 'center',
  //           alignSelf: 'flex-end',
  //           justifyContent: 'center',
  //           borderRadius: 50
  //         }}
  //         onPress={() => getCurrentPosition()}
  //       >
  //         <Icon 
  //           name='navicon'
  //           size={35}
  //           color='white'
  //         />
  //       </TouchableOpacity>
  //     )
  //   }
  //   return
  // }

  return (
    <View style={{...StyleSheet.absoluteFillObject}}>
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 20,
          right: 10,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: 'black',
          // padding: 20,
          elevation: 3,
          alignItems: 'center',
          alignSelf: 'flex-end',
          justifyContent: 'center',
          borderRadius: 30,
          zIndex: 5,
          width: 60,
          height: 60
        }}
        onPress={() => getCurrentPosition()}
      >
        <Icon 
          name='location-arrow'
          size={35}
          color='black'
        />
      </TouchableOpacity>

      <MapView
        provider = {PROVIDER_GOOGLE}
        region={region}
        onRegionChangeComplete={(region) => setRegion(region)}
        ref = {mapRef}
        style={props.style}
        initialRegion={props.initialRegion}
        showsUserLocation={true}
        followsUserLocation={true}
        onPress = {(e) => updateUserMarker(e.nativeEvent.coordinate)}
        //onRegionChangeComplete runs when the user stops dragging MapView        
      >
      {/* DB Markers */}
      {
        markersRef.current.map((val, index) => 
          {
            let distanceToUserPos = "?"//getDistance(val,props.userPos.coords) / 1000
            if (userPos.coords != undefined)
            {
              distanceToUserPos = getDistance(val, userPos.coords) / 1000
            }
            return (
            <Marker key={index} coordinate={val} pinColor={val.color} tracksViewChanges={true} onPress={() => HighlightMarker(val)}>
              <Callout>
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