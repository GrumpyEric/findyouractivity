import { updateUserFromDB, readUserFromDB, markersRef } from '../constants/MainFunctions';
import { selectedUserContext, loggedInUser, userPosContext } from '../components/AppContext';
import { getDistance } from 'geolib';
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { height, stylesGlobal } from '../constants/StylesGlobal';
import TextInputField from '../components/TextInputField';
import FloatingBurgerMenu from '../components/FloatingBurgerMenu';
import Colors from '../constants/Colors';
import ButtonBack from '../components/ButtonBack';

const Profile = ( {navigation} ) => {
  let eventArray = markersRef.filter(function (arr) {
      return arr.user === selectedUserContext._current_value.markers.uid
  })
  
  // Zustand der Text-Ausgaben
  const [displayUsername, setDisplayUsername] = useState(selectedUserContext._current_value.markers.username)
  const [displayDescription, setDisplayDescription] = useState(selectedUserContext._current_value.markers.description)

  const onSaveButton = () => {
    
    updateUserFromDB(selectedUserContext._current_value.markers.uid, displayUsername, displayDescription)

    readUserFromDB(selectedUserContext._current_value.markers.uid)
    navigation.pop();
  }

  const onCloseButton = () => {
    navigation.pop();
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
        <ScrollView style={styles.scrollAreaStyle}>
          {eventArray.map((val, index) => {

            let distanceToUserPos = "?"//getDistance(val,props.userPosContext.coords) / 1000
            if (userPosContext._currentValue.coords != undefined)
            {
                distanceToUserPos = getDistance(val, userPosContext._currentValue.coords) / 1000
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
                startTimeRes = val.startTime.toDate().toString()
                }
                else if ( !(val.startTime != undefined) ) 
                {
                //return <Text> Start-Zeit: unbekannt </Text>
                startTimeRes = "unbekannt"
                }
                return  <Text> Start-Zeit: {startTimeRes} </Text>
            }

            const displayEndTime = (val) => {

                let endTimeRes = ""//val.endTime

                if( (val.endTime != undefined) ) 
                {
                //return <Text> Start-Zeit: {val.startTime.toDate().toString()} </Text>
                endTimeRes = val.endTime.toDate().toString()
                }
                else if ( !(val.endTime != undefined) ) 
                {
                //return <Text> Start-Zeit: unbekannt </Text>
                endTimeRes = "unbekannt"
                }

                return <Text> End-Zeit: {endTimeRes} </Text>
            }

            return (
              <View style={{marginBottom: 10, borderBottomWidth: 1}}>
                <TouchableOpacity onPress={() => console.log(val)}>
                  <Text key={Math.random().toString()}> {val.name} </Text>
                  <Text key={Math.random().toString()}> {val.description} </Text>
                  { displayStartTime(val) }
                  { displayEndTime(val) }
                  <Text> Distanz: {distanceToUserPos} km</Text>
                  { displayTags(val) }
                </TouchableOpacity>
              </View>
            )
            }
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.findmyactivityBackground
  },
  
  textLabels: {
    alignSelf: 'flex-start',
    width: '100%'
  },

  scrollAreaStyle: {
    flexGrow: 1,
    borderWidth: 2,
    borderRadius: 10
  },

  contentSeparatorStyle: {
    marginVertical: stylesGlobal.marginsAndPadding.paddingBetweenItems,
    width: '100%',
  }
});

export default Profile;
