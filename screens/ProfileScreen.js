import { View, Text, TouchableOpacity, ScrollView, TextInput,StyleSheet } from 'react-native';
import { stylesGlobal } from '../constants/StylesGlobal';
import { Avatar, ListItem } from "react-native-elements";
import { selectedUserContext, loggedInUser, userPosContext } from '../components/AppContext';
import { getDistance } from 'geolib';
import React, {useRef, useState, useEffect} from "react";
import ButtonRegularWithBorder from '../components/ButtonRegular';
import Colors from '../constants/Colors'
import { updateUserFromDB, readUserFromDB, getEventsFromUser, markersRef } from '../constants/MainFunctions';
import ButtonSmall from '../components/ButtonSmall';


const ProfileScreen = ( {navigation} ) => {

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

  const ToggleUsernameEdit = () => {
    setEditingUsername(!editingUsername)
    if (!editingUsername)
    { 
      //setDisplayUsername("")
      setEditUsernameLabel("ABBRECHEN")     
    }
    else
    {      
      setDisplayUsername(selectedUserContext._current_value.markers.username)
      setEditUsernameLabel("BEARBEITEN")
    }
  }

  const ToggleDescriptionEdit = () => {
    setEditingDescription(!editingDescription)
    if (!editingDescription)
    {      
      //setDisplayDescription("")
      setEditDescriptionLabel("ABBRECHEN")
    }
    else
    {      
      setDisplayDescription(selectedUserContext._current_value.markers.description)
      setEditDescriptionLabel("BEARBEITEN")
    }
  }

  const onSaveButton = () => {
    
    updateUserFromDB(selectedUserContext._current_value.markers.uid, displayUsername, displayDescription)
    setEditingUsername(false)
    setEditingDescription(false)
    
    setEditUsernameLabel("BEARBEITEN")    
    setEditDescriptionLabel("BEARBEITEN")

    readUserFromDB(selectedUserContext._current_value.markers.uid)
  }

  return (
    <View style={styles.screenContainer}>
    <ScrollView >
      <View style={stylesGlobal.screenContainer}>
        <TouchableOpacity>
            <View>
                <Avatar 
                    rounded 
                    size='large'
                    source={{
                        uri:'../assets/Profile_Image-png'
                    }}
                />
            </View>
        </TouchableOpacity>  
        
        
      </View>
      <View>
        <Text style={{fontWeight: 'bold'}}>Benutzername:</Text>
        <TextInput editable={editingUsername} value={displayUsername} onChangeText={setDisplayUsername}/>
        <ButtonSmall
          text={editUsernameLabel}
          onPress={() => ToggleUsernameEdit()}
          backgroundColor={Colors.findmyactivityYellow}
        />
        <Text>__________________________________________ </Text>
        <Text style={{fontWeight: 'bold'}}>BESCHREIBUNG:</Text>
        <TextInput editable={editingDescription} value={displayDescription} onChangeText={setDisplayDescription}/>
        <ButtonSmall
          text={editDescriptionLabel}
          onPress={() => ToggleDescriptionEdit()}
          backgroundColor={Colors.findmyactivityYellow}
        />       
        <Text>__________________________________________ </Text>
        <Text style={{fontWeight: 'bold'}}>Benutzer-ID:</Text>
        <Text>  {selectedUserContext._current_value.markers.uid} </Text>  
        <Text>__________________________________________ </Text>
        <Text style={{fontWeight: 'bold'}}>E-Mail-Adresse:</Text>
        <Text>  {loggedInUser._current_value.email.toString()} </Text>
      </View>
      <View>
        
      <Text> __________________________________________ </Text> 
    </View>
    <View>
      <Text style={{fontWeight: 'bold'}}>Meine Events:</Text>
      <Text>__________________________________________ </Text>
      {eventArray.map((val, index) => 
            {

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
                <View style={{backgroundColor: '#FFFFFF', marginBottom: 10}}>
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
    <View style={{flexDirection:'row'}}>
      <View>
        <ButtonSmall
          text={"Speichern"}
          onPress={() => onSaveButton()}
          backgroundColor={Colors.findmyactivityBlue}
        />
      </View>
      <View>
        <ButtonSmall
          text={'Schließen'}
          onPress={() => navigation.pop()}
          backgroundColor={'red'}
        />
      </View>
    </View>
    </View>
  )
}

export default ProfileScreen

 const styles = StyleSheet.create({
  screenContainer: {
    flex: stylesGlobal.screenContainer.flex,
    paddingHorizontal: stylesGlobal.screenContainer.paddingHorizontal,
    paddingVertical: stylesGlobal.screenContainer.paddingVertical,
    backgroundColor: stylesGlobal.screenContainer.backgroundColor,
    alignItems: 'center'
  },
 })