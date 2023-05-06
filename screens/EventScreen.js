import { auth } from "../firebase/firebase-config";
import { deleteMarkerToDB, markersRef } from '../constants/MainFunctions';
import { editMarkerMode, editMarkerObject, editMarkerValues, mapRef } from '../components/AppContext';
import { getDistance } from 'geolib';
import { userPosContext } from '../components/AppContext';
import Colors from '../constants/Colors';
import TextButton from '../components/TextButton';
import Slider from '@react-native-community/slider';

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Switch,
  ScrollView,
  TouchableOpacity
} from "react-native";
import EventHeader from "../components/EventHeader";
import FooterEvents from "../components/FooterEvents";

const EventScreen = ( {navigation} ) => {

    const [value, setValue] = useState()

    useEffect(() => {
        console.log(value);
    }, [value])

    const moveToMarker = (inputMarker) => {
        mapRef.current.animateToRegion({
        latitude: inputMarker.latitude,
        longitude: inputMarker.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
        })
        navigation.pop()
    }

    function editMarkerHandler(val) {
        navigation.navigate('CreateMarkersScreen'); editMarker(val)
    }

    function deleteMarkerHandler(val) {
        Alert.alert(
        'Löschen des Markers',
        'Wollen Sie den Marker wirklich löschen?',
        [
            {
            text: 'Löschen',
            onPress: () => { deleteMarkerToDB(auth, val.creation_date) }
            },
            {
            text: 'Abbrechen',
            onPress: () => {  }
            }
        ]
        )
    }

    const editMarker = (markerValues) => {
        editMarkerMode._currentValue = true

        // editMarkerValues._currentValue.creationDate = ((markerValues.creation_date.nanoseconds / 1000000000 + markerValues.creation_date.seconds) * 1000)
        // editMarkerValues._currentValue.creationDate = Timestamp.fromMillis( (markerValues.creation_date.nanoseconds / 10000000 + markerValues.creation_date.seconds) * 1000 )
        editMarkerValues._currentValue.creationDate = markerValues.creation_date
        editMarkerValues._currentValue.name = markerValues.name
        editMarkerValues._currentValue.description = markerValues.description
        editMarkerValues._currentValue.locationDescription = markerValues.locationDescription
        editMarkerValues._currentValue.startDate = new Date(markerValues.startTime.seconds*1000)
        editMarkerValues._currentValue.endDate = new Date(markerValues.endTime.seconds*1000)
        editMarkerValues._currentValue.numberParticipants = markerValues.numberParticipants
        editMarkerValues._currentValue.tags = markerValues.tags
        editMarkerValues._currentValue.latitude = markerValues.latitude
        editMarkerValues._currentValue.longitude = markerValues.longitude

        editMarkerObject._currentValue = markerValues
        console.log('MY VALUES', markerValues);

        // Timestamp creation date:
        // console.log('creation date:', (markerValues.creation_date.nanoseconds / 1000000000 + markerValues.creation_date.seconds) * 1000 );
        // important for update marker: db, "markers", userID_timestampcreationdate (in seconds)

        console.log('create date:', editMarkerValues._currentValue.creationDate );
    }

    const [showMyMarkers, setShowMyMarkers] = useState(true)
    const myUserID = auth.currentUser.uid
    const [radiusMarkers, setRadiusMarkers] = useState(5)
    const [radiusMarkersVisual, setRadiusMarkersVisual] = useState(5)
    // console.log(myUserID);

    let myMarkersRef = markersRef.filter(function (arr) {
        return arr.user === myUserID
    })

    // console.log(myMarkersRef);

    useEffect(() => {
        //console.log(radiusMarkers);
    }, [radiusMarkers])

  return (
    <View style={styles.container}>
      <View style={styles.headerColumn}>
        <EventHeader style={styles.header}></EventHeader>
        <View style={{alignItems: 'center'}}>
          <Text style={{color: Colors.findmyactivityText}}>Ansicht umstellen auf:</Text>
          <View style={{flexDirection: 'row'}}> 
            <Text style={{color: showMyMarkers ? '#CAD6E0' : Colors.findmyactivityText, alignSelf: 'center'}}>Alle Marker</Text>
            <Switch
              value={showMyMarkers}
              disabled={false}
              onValueChange={() => setShowMyMarkers(!showMyMarkers)}
              trackColor={{ false: "#237076", true: "#FBB900" }}
              thumbColor={showMyMarkers ? "#237076" : "#FBB900"}
              ios_backgroundColor="#3e3e3e"
              style={styles.switch}
            ></Switch>
            <Text style={{color: showMyMarkers ? Colors.findmyactivityText : '#CAD6E0', marginLeft: 20, alignSelf: 'center'}}>Meine Marker</Text>
          </View>
        </View>
        <View style={styles.sliderStack}>
          <Slider 
            value={radiusMarkers}
            minimumValue={0}
            maximumValue={21}
            onSlidingComplete={(value) => value < 21 ? setRadiusMarkers(value) : setRadiusMarkers('alle')}
            step={1}
            disabled={false}
            onValueChange={(value) => value < 21 ? setRadiusMarkersVisual(value) : setRadiusMarkersVisual('alle')}
            minimumTrackTintColor="rgba(251,185,0,1)"
            maximumTrackTintColor="rgba(35,112,118,1)"
            thumbTintColor="rgba(35,112,118,1)"
            style={styles.slider}></Slider>
          <Text style={styles.radius}>Radius:</Text>
          <Text style={styles.radius1}>{radiusMarkersVisual === 'alle' ? radiusMarkersVisual : radiusMarkersVisual + ' km'}</Text>
        </View>
        <View style={styles.scrollArea}>
          <ScrollView
            contentContainerStyle={styles.scrollArea_contentContainerStyle}
          >
            <View>
            {
          showMyMarkers ?
          myMarkersRef.map((val, index) => 
            {
              let distanceToUserPos = "?"//getDistance(val,props.userPosContext.coords) / 1000
              // console.log(userPosContext._currentValue.coords);
              if (userPosContext._currentValue.coords != undefined)
              {
                distanceToUserPos = getDistance(val, userPosContext._currentValue.coords) / 1000
              }

              if (distanceToUserPos < radiusMarkers || radiusMarkers === 'alle') {
                // console.log(distanceToUserPos);
                return (
                  <View key={index} style={{backgroundColor: 'rgba(35, 112, 118, 0.2)', marginBottom: 10, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 10}}>
                    <TouchableOpacity onPress={() => moveToMarker(val)}>
                      <Text key={Math.random().toString()}> {"Eventname: " + val.name} </Text>
                      <Text key={Math.random().toString()}> {"Beschreibung: " + val.description} </Text>
                      <Text> Distanz: {distanceToUserPos} km</Text>
                    </TouchableOpacity>
                    <TextButton
                      onPress={() => editMarkerHandler(val)}
                      text={'Marker bearbeiten'}
                      textColor={Colors.findmyactivityBlue}
                    />
                    <TextButton
                      onPress={() => deleteMarkerHandler(val)}
                      text={'Marker löschen'}
                      textColor={Colors.findmyactivityBlue}
                    />
                    {/* <Text> Distanz: {distanceToUserPos} km</Text> */}
                  </View>
                )
              }
            }
          )
          :
          markersRef.map((val, index) => 
            {
              let distanceToUserPos = "?"//getDistance(val,props.userPosContext.coords) / 1000
              if (userPosContext._currentValue.coords != undefined)
              {
                distanceToUserPos = getDistance(val, userPosContext._currentValue.coords) / 1000
              }
              if (distanceToUserPos < radiusMarkers || radiusMarkers === 'alle') {
                return (
                  <View key={index} style={{backgroundColor: 'rgba(35, 112, 118, 0.2)', marginBottom: 10, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 10}}>
                    <TouchableOpacity onPress={() => moveToMarker(val)}>
                      <Text key={Math.random().toString()}> {"Eventname: " + val.name} </Text>
                      <Text key={Math.random().toString()}> {"Beschreibung: " + val.description} </Text>
                      <Text> Distanz: {distanceToUserPos} km</Text>
                    </TouchableOpacity>
                    {val.user === myUserID 
                    ?
                    <View>
                    <TextButton
                      onPress={() => editMarkerHandler(val)}
                      text={'Marker bearbeiten'}
                      textColor={Colors.findmyactivityBlue}
                    />
                    <TextButton
                      onPress={() => deleteMarkerHandler(val)}
                      text={'Marker löschen'}
                      textColor={Colors.findmyactivityBlue}
                    />
                    </View>
                    :
                    null
                    }
                    {/* <Text> Distanz: {distanceToUserPos} km</Text> */}
                  </View>
                )
              }
            }
          )
        }
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={styles.headerColumnFiller}></View>
      <FooterEvents style={styles.footer}></FooterEvents>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(223,242,242,1)"
  },
  header: {
    height: 40
  },
  alleMarkerAnzeigen: {
    color: "#121212"
  },
  switch: {
    marginLeft: 20
  },
  alleMarkerAnzeigenRow: {
    height: 20,
    flexDirection: "row"
  },
  alleMarkerAnzeigen1: {
    color: "#121212",
    flex: 1,
    marginLeft: 20
  },
  alleMarkerAnzeigenRowRow: {
    height: 20,
    flexDirection: "row",
    marginTop: 26,
    marginLeft: 75,
    marginRight: 10
  },
  slider: {
    position: "absolute",
    top: 15,
    height: 44,
    width: 365,
    left: 0,
    color: "#237076"
  },
  radius: {
    top: 0,
    left: 16,
    position: "absolute",
    color: "#121212"
  },
  radius1: {
    top: 0,
    left: 65,
    position: "absolute",
    color: "#121212"
  },
  sliderStack: {
    width: 340,
    height: 59,
    marginTop: 37,
    marginLeft: 10
  },
  scrollArea: {
    width: 340,
    height: 460,
    backgroundColor: "rgba(223,242,242,1)",
    borderWidth: 1,
    borderColor: "rgba(35,112,118,1)",
    borderRadius: 10,
    marginTop: 4,
    alignSelf: "center"
  },
  scrollArea_contentContainerStyle: {
    width: 340,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  headerColumn: {
    marginTop: 24
  },
  headerColumnFiller: {
    flex: 1
  },
  footer: {
    height: 56
  }
});

export default EventScreen;
