import { updateUserFromDB, readUserFromDB, getEventsFromUser, markersRef } from '../constants/MainFunctions';
import { selectedUserContext, loggedInUser, userPosContext } from '../components/AppContext';
import { getDistance } from 'geolib';
import React, { Component, useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity
} from "react-native";
import ButtonBack from "../components/ButtonBack";
import Icon from "react-native-vector-icons/Entypo";
import IconHeader from "react-native-vector-icons/Ionicons";
import ButtonSave from "../components/ButtonSave";
import FooterProfile from "../components/FooterProfile";
import Header from '../components/Header';

const Profile = ( {navigation} ) => {

    let eventArray = markersRef.filter(function (arr) {
        return arr.user === selectedUserContext._current_value.markers.uid
      })
    
      useEffect(() => {
        //readUserFromDB(selectedUserContext._current_value.markers.uid)
        //console.log("HAMPER: ", eventArray[0])
    
      }, []);
    
      // Zustand der Edit-Buttons
      const [editingUsername, setEditingUsername] = useState(false)
      const [editingDescription, setEditingDescription] = useState(false)  
      const [editingEmail, setEditingEmail] = useState(false)
    
      // Labels der Edit-Buttons
      const [editUsernameLabel, setEditUsernameLabel] = useState("BEARBEITEN")
      const [editDescriptionLabel, setEditDescriptionLabel] = useState("BEARBEITEN")
    
      // Zustand der Text-Ausgaben
      const [displayUsername, setDisplayUsername] = useState(selectedUserContext._current_value.markers.username)
      const [displayDescription, setDisplayDescription] = useState(selectedUserContext._current_value.markers.description)
    
      const onSaveButton = () => {
        
        updateUserFromDB(selectedUserContext._current_value.markers.uid, displayUsername, displayDescription)
        setEditingUsername(false)
        setEditingDescription(false)
    
        readUserFromDB(selectedUserContext._current_value.markers.uid)
        navigation.pop();
      }

      const onCloseButton = () => {
        navigation.pop();
      }

  return (
    <View style={styles.container}>
      <View style={[styles.containerHeader]}>
      <View style={styles.leftWrapper}>
        <TouchableOpacity
          onPress={() => onCloseButton()}
          style={styles.leftIconButton}
        >
          <IconHeader name="ios-arrow-back" style={styles.leftIcon}></IconHeader>
          <Text style={styles.zuruck}>Zurück</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textWrapper}>
        <Text numberOfLines={1} style={styles.profil}>
          Profil
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
      >
        <TouchableOpacity 
          style={styles.rightIconButton}
          onPress={() => onSaveButton()}
        >
          <Text style={styles.speichern}>Speichern</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
      <StatusBar
        animated
        barStyle="light-content"
        backgroundColor="rgba(35,112,118,1)"
      />
      <View style={styles.buttonBackRowColumn}>
        <Icon name="add-user" style={styles.icon}></Icon>
        <Text style={styles.benutzernameLabel}>Benutzername</Text>
        <TextInput
          placeholder="Benutzername"
          placeholderTextColor="rgba(179,179,179,1)"
          style={styles.benutzername}
          value={displayUsername}
          editable={true}
          onChangeText={setDisplayUsername}
        ></TextInput>
        <Text style={styles.beschreibungLabel}>Beschreibung</Text>
        <TextInput
          placeholder="Beschreibung"
          multiline={true}
          clearTextOnFocus={false}
          placeholderTextColor="rgba(179,179,179,1)"
          maxLength={250}
          style={styles.beschreibung}
          value={displayDescription}
          editable={true}
          onChangeText={setDisplayDescription}
        ></TextInput>
        <Text style={styles.eMailAdresseLabel}>E-Mail-Adresse</Text>
        <Text
            placeholder="E-Mail-Adresse"
            placeholderTextColor="rgba(179,179,179,1)"
            style={styles.email}
        >{loggedInUser._current_value.email.toString()}</Text>
        <Text style={styles.eventsLabel}>Events</Text>
        <View style={styles.scrollAreaEvents}>
          <ScrollView
            contentContainerStyle={
              styles.scrollAreaEvents_contentContainerStyle
            }
          >
            <View>
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

                        return  <Text> End-Zeit: {endTimeRes} </Text>
                    }


                    return (
                        <View style={{backgroundColor: 'rgba(35, 112, 118, 0.2)', marginBottom: 10, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 10}}>
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
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={styles.buttonBackRowColumnFiller}></View>
      <FooterProfile style={styles.footer}></FooterProfile>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(223,242,242,1)"
  },


  containerHeader: {
    flexDirection: "row",
    backgroundColor: "rgba(223,242,242,1)",
    paddingRight: 8,
    paddingLeft: 8,
    top: 35
  },
  leftWrapper: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  leftIconButton: {
    flexDirection: "row"
  },
  leftIcon: {
    color: "rgba(35,112,118,1)",
    fontSize: 30
  },
  zuruck: {
    fontSize: 17,
    color: "rgba(35,112,118,1)",
    paddingLeft: 5,
    alignSelf: "center"
  },
  textWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  profil: {
    fontSize: 17,
    lineHeight: 17,
    color: "#000"
  },
  button: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  rightIconButton: {},
  speichern: {
    color: "rgba(35,112,118,1)",
    fontSize: 17,
    alignSelf: "center"
  },



  cupertinoHeaderWithActionButton: {
    height: 57,
    backgroundColor: "rgba(223,242,242,1)",
    top: 30
  },
  buttonBack: {
    height: 56,
    width: 56
  },
  icon: {
    color: "rgba(35,112,118,1)",
    fontSize: 80,
    marginTop: 23,
    alignSelf: 'center'
  },
  buttonBackRow: {
    height: 110,
    flexDirection: "row",
    marginRight: 122
  },
  benutzernameLabel: {
    color: "#121212",
    marginTop: 19,
    marginLeft: 7
  },
  benutzername: {
    color: "#121212",
    height: 41,
    width: 325,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    marginTop: 3,
    marginLeft: 7,
    paddingLeft: 10
  },
  beschreibungLabel: {
    color: "#121212",
    marginTop: 14,
    marginLeft: 7
  },
  beschreibung: {
    color: "#121212",
    height: 94,
    width: 325,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    marginTop: 2,
    marginLeft: 7,
    paddingLeft: 10
  },
  eMailAdresseLabel: {
    color: "#121212",
    marginTop: 12,
    marginLeft: 7
  },
  email: {
    color: "#121212",
    height: 41,
    width: 325,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 2,
    marginLeft: 7,
    paddingTop: 10,
    paddingLeft: 10
  },
  eventsLabel: {
    color: "#121212",
    marginTop: 12,
    marginLeft: 7
  },
  scrollAreaEvents: {
    width: 325,
    height: 200,
    backgroundColor: "rgba(223,242,242,1)",
    borderWidth: 2,
    borderColor: "rgba(35,112,118,1)",
    borderRadius: 10,
    marginTop: 4,
    marginLeft: 7
  },
  scrollAreaEvents_contentContainerStyle: {
    width: 325,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  saveButton: {
    height: 38,
    width: 147,
    borderRadius: 10,
    marginTop: 18,
    marginLeft: 96
  },
  buttonBackRowColumn: {
    marginTop: 38,
    marginLeft: 10,
    marginRight: 18
  },
  buttonBackRowColumnFiller: {
    flex: 1
  },
  footer: {
    height: 56
  }
});

export default Profile;
