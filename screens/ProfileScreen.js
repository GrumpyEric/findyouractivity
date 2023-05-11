import { updateUserFromDB, readUserFromDB, markersRef, readMarkerFromDB } from '../constants/MainFunctions';
import { selectedUserContext, loggedInUser, userPosContext, mapRef, saveProfileChangesFunctionContext } from '../components/AppContext';
import { getDistance } from 'geolib';
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";
import { height, stylesGlobal } from '../constants/StylesGlobal';
import TextInputField from '../components/TextInputField';
import FloatingBurgerMenu from '../components/FloatingBurgerMenu';
import Colors from '../constants/Colors';
import ButtonBack from '../components/ButtonBack';
import { format, isSameDay, isTomorrow } from 'date-fns';

const Profile = ( {navigation} ) => {
  navigation.setOptions({
    headerTransparent: true
  })

  let eventArray = markersRef.filter(function (arr) {
    return arr.user === selectedUserContext._current_value.markers.uid
  })

  // const [eventArray, setEventArray] = useState([])

  useEffect(() => {
    console.log('rerender');
    readMarkerFromDB()

    // setEventArray(markersRef.filter(function (arr) {
    //   if (selectedUserContext._current_value.markers.uid) {
    //     return arr.user === selectedUserContext._current_value.markers.uid
    //   } else {
    //     null
    //   }
    // }))
  }, [])
  
  
  // Zustand der Text-Ausgaben
  const [displayUsername, setDisplayUsername] = useState(selectedUserContext._current_value.markers.username)
  const [displayDescription, setDisplayDescription] = useState(selectedUserContext._current_value.markers.description)

  const onSaveButton = () => {
    updateUserFromDB(selectedUserContext._current_value.markers.uid, displayUsername, displayDescription)
    readUserFromDB(selectedUserContext._current_value.markers.uid)
    Alert.alert('Ihr Profil wurde aktualisiert')
  }

  saveProfileChangesFunctionContext._currentValue = onSaveButton

  const moveToMarker = (inputMarker) => {
    navigation.goBack()
    mapRef.current.animateToRegion({
    latitude: inputMarker.latitude,
    longitude: inputMarker.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
    })
  }

  return (
  <View style={[stylesGlobal.screenContainer, styles.container]}>
    <FloatingBurgerMenu
      onPress={() => navigation.openDrawer()}
      icon={'navicon'}

    />
    <ButtonBack
      onPress={() => navigation.goBack()}
      text={'Zurück'}
    />
    <View style={stylesGlobal.contentContainerMainScreens}>
      <Text style={[stylesGlobal.ueberschriftText, {textAlign: 'center'}]}>Profil</Text>

      <View style={styles.contentSeparatorStyle}>
        <Text style={[styles.textLabels, stylesGlobal.ueberschriftText2]}>Benutzername</Text>
        <TextInputField
          placeholder="Benutzername"
          value={displayUsername}
          onChangeText={setDisplayUsername}
        />
      </View>

      <View style={styles.contentSeparatorStyle}>
        <Text style={[styles.textLabels, stylesGlobal.ueberschriftText2]}>Beschreibung</Text>
        <TextInputField
          placeholder="Beschreibung"
          multiline
          maxLength={250}
          value={displayDescription}
          onChangeText={setDisplayDescription}
        />
      </View>
      
      <View style={styles.contentSeparatorStyle}>
        <Text style={[styles.textLabels, stylesGlobal.ueberschriftText2]}>E-Mail-Adresse</Text>
        <TextInputField
          editable={false}
          placeholder="E-Mail-Adresse"
          value={loggedInUser._current_value.email.toString()}
          onChangeText={null}
        />
      </View>

      <View style={styles.contentSeparatorStyle}>
      <Text style={[styles.textLabels, stylesGlobal.ueberschriftText2]}>Events</Text>
        <ScrollView style={styles.scrollAreaStyle} contentContainerStyle={styles.scrollAreaContentContainerStyle}>
          {
          eventArray.length ?
          eventArray.map((val, index) => {
            let distanceToUserPos = "?"//getDistance(val,props.userPosContext.coords) / 1000
            if (userPosContext._currentValue.coords != undefined)
            {
                distanceToUserPos = getDistance(val, userPosContext._currentValue.coords) / 1000
            }

            const displayStartTime = (val) => {

                let startTimeRes = "unbekannt"
                const startDate = val.startTime.toDate()
                const today = new Date()

                if (val.startTime) {
                  if (isSameDay(startDate, today)) {
                    startTimeRes = "Heute um " + format(startDate, 'HH:mm') + ' Uhr'
                  
                  } else if (isTomorrow(startDate)) {
                    startTimeRes = "Morgen um " + format(startDate, 'HH:mm') + ' Uhr'

                  } else {
                    startTimeRes = format(startDate, 'dd.MM.yyyy - HH:mm') + ' Uhr'
                  }
                }
                return <Text style={stylesGlobal.standardText}> Start-Zeit: {startTimeRes} </Text>
            }

            const displayEndTime = (val) => {

                let endTimeRes = "unbekannt"
                const endDate = val.endTime.toDate()
                const today = new Date()

                if (val.endTime) {
                  if (isSameDay(endDate, today)) {
                    endTimeRes = "Heute um " + format(endDate, 'HH:mm') + ' Uhr'
                  
                  } else if (isTomorrow(endDate)) {
                    endTimeRes = "Morgen um " + format(endDate, 'HH:mm') + ' Uhr'

                  } else {
                    endTimeRes = format(endDate, 'dd.MM.yyyy - HH:mm') + ' Uhr'
                  }
                }

                return <Text style={stylesGlobal.standardText}> End-Zeit: {endTimeRes} </Text>
            }

            const displayTags = (val) => {
              console.log(val.tags);
              if( (val.tags.length)) {
                return <Text style={stylesGlobal.standardText}> Tags: {val.tags.toString()}</Text>
              } else {
                return <Text style={stylesGlobal.standardText}> Tags: keine Tags vergeben</Text>
              }
            }

            return (
              <View style={{marginBottom: 15, borderTopWidth: index === 0 ? 0 : 1}} key={index}>
                <TouchableOpacity onPress={() => moveToMarker(val)} style={{marginTop: 10}}>
                  <Text style={[stylesGlobal.ueberschriftText2, {marginBottom: val.description ? 0 : 5} ]}> {val.name} </Text>
                  {val.description 
                    ? <Text style={[stylesGlobal.standardText, {marginBottom: 5}]}> {val.description} </Text>
                    : null
                  }
                  { displayStartTime(val) }
                  { displayEndTime(val) }
                  <Text style={stylesGlobal.standardText}> Distanz: {distanceToUserPos} km</Text>
                  { displayTags(val) }
                </TouchableOpacity>
              </View>
            )
          })
          :
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={stylesGlobal.ueberschriftText2}>Sie haben noch keine eigenen Marker gesetzt. Setzen Sie erstmal Marker auf der Karte, um hier dann die eigenen Marker sehen zu können.</Text>
            </View>
          }
            
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.findmyactivityBackground,
  },
  
  textLabels: {
    alignSelf: 'flex-start',
    width: '100%',
    marginBottom: 2
  },

  scrollAreaStyle: {
    height: height * 0.3,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: Colors.findmyactivityWhite
  },

  scrollAreaContentContainerStyle: {
    margin: 5,
  },

  contentSeparatorStyle: {
    marginVertical: stylesGlobal.marginsAndPadding.paddingBetweenItems,
    width: '100%',
  },
});

export default Profile;
