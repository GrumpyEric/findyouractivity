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
import { stylesGlobal } from '../constants/StylesGlobal';
import TextInputField from '../components/TextInputField';
import FloatingBurgerMenu from '../components/FloatingBurgerMenu';

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
    <View style={stylesGlobal.screenContainer}>
      <FloatingBurgerMenu
        onPress={() => navigation.openDrawer()}
        icon={'navicon'}
      />
      
      <View style={{marginTop: '20%', alignItems: 'center'}}>

        <Text style={stylesGlobal.ueberschriftText}>Profil</Text>
        <Text style={[styles.textLabels, stylesGlobal.ueberschriftText2]}>Benutzername</Text>
        <TextInputField
          placeholder="Benutzername"
          value={displayUsername}
          onChangeText={setDisplayUsername}
        />

        <Text style={[styles.textLabels, stylesGlobal.ueberschriftText2]}>Beschreibung</Text>
        <TextInputField
          placeholder="Beschreibung"
          multiline
          maxLength={250}
          value={displayDescription}
          onChangeText={setDisplayDescription}
        />
        
        <Text style={[styles.textLabels, stylesGlobal.ueberschriftText2]}>E-Mail-Adresse</Text>
        <TextInputField
          editable={false}
          placeholder="E-Mail-Adresse"
          value={loggedInUser._current_value.email.toString()}
          onChangeText={null}
        />

        <Text style={[styles.textLabels, stylesGlobal.ueberschriftText2]}>Events</Text>
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
  textLabels: {
    textAlign: 'left',
    width: '100%'
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
  buttonBackRowColumnFiller: {
    flex: 1
  },
  footer: {
    height: 56
  }
});

export default Profile;
