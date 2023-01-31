import { collection, onSnapshot, query, Timestamp } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { stylesGlobal } from '../constants/StylesGlobal'
import { auth, db } from "../firebase/firebase-config";
import { deleteMarkerToDB, markersRef } from '../constants/MainFunctions';
import { editMarkerMode, editMarkerObject, editMarkerValues, mapRef } from '../components/AppContext';
import { getDistance } from 'geolib';
import { userPosContext } from '../components/AppContext';
import Colors from '../constants/Colors';
import TextButton from '../components/TextButton';
import Slider from '@react-native-community/slider';
import { formatISO, formatRFC3339 } from 'date-fns';

const MyMarkersScreen = ( {navigation} ) => {
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
    console.log(radiusMarkers);
  }, [radiusMarkers])

  return (
    <ScrollView >
      <View style={stylesGlobal.screenContainer}>

        <View style={{alignItems: 'center', width: '100%'}}>
          <View style={{flexDirection: 'row', }}>
            <Text style={{color: showMyMarkers ? Colors.findmyactivityText : Colors.findmyactivityBlue}}>Alle Marker anzeigen</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={showMyMarkers ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setShowMyMarkers(!showMyMarkers)}
              value={showMyMarkers}
            />
            <Text style={{color: showMyMarkers ? Colors.findmyactivityBlue : Colors.findmyactivityText}}>Nur meine Marker anzeigen</Text>
          </View>

          <View style={{width: '100%'}}>
            <Text>Radius der anzuzeigenden Marker</Text>
            <Text>{radiusMarkersVisual === 'alle' ? radiusMarkersVisual : radiusMarkersVisual + ' km'}</Text>
            <Slider
              minimumValue={0}
              maximumValue={21}
              onSlidingComplete={(value) => value < 21 ? setRadiusMarkers(value) : setRadiusMarkers('alle')}
              step={1}
              value={radiusMarkers}
              onValueChange={(value) => value < 21 ? setRadiusMarkersVisual(value) : setRadiusMarkersVisual('alle')}
            />
          </View>
        </View>
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
                  <View key={index} style={{backgroundColor: '#DDDDDD', marginBottom: 10}}>
                    <TouchableOpacity onPress={() => moveToMarker(val)}>
                      <Text key={Math.random().toString()}> {"MARKERNAME: " + val.name} </Text>
                      <Text key={Math.random().toString()}> {"BESCHREIBUNG: " + val.description} </Text>
                      <Text> Distanz: {distanceToUserPos} km</Text>
                    </TouchableOpacity>
                    <TextButton
                      onPress={() => editMarkerHandler(val)}
                      text={'bearbeiten'}
                      textColor={Colors.findmyactivityBlue}
                    />
                    <TextButton
                      onPress={() => deleteMarkerHandler(val)}
                      text={'löschen'}
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
                  <View style={{backgroundColor: '#DDDDDD', marginBottom: 10}}>
                    <TouchableOpacity onPress={() => console.log(val)}>
                      <Text key={Math.random().toString()}> {"MARKERNAME: " + val.name} </Text>
                      <Text key={Math.random().toString()}> {"BESCHREIBUNG: " + val.description} </Text>
                      <Text> Distanz: {distanceToUserPos} km</Text>
                    </TouchableOpacity>
                    {val.user === myUserID 
                    ?
                    <View>
                    <TextButton
                      onPress={() => editMarkerHandler(val)}
                      text={'bearbeiten'}
                      textColor={Colors.findmyactivityBlue}
                    />
                    <TextButton
                      onPress={() => deleteMarkerHandler(val)}
                      text={'löschen'}
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