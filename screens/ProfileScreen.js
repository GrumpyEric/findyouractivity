import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { stylesGlobal } from '../constants/StylesGlobal';
import { Avatar, ListItem } from "react-native-elements";
import { selectedUserContext, loggedInUser } from '../components/AppContext';
import React, {useRef, useState, useEffect} from "react";
import ButtonRegularWithBorder from '../components/ButtonRegular';
import Colors from '../constants/Colors'
import { updateUserFromDB, readUserFromDB } from '../constants/MainFunctions';


const ProfileScreen = ( {navigation} ) => {

  useEffect(() => {
    readUserFromDB(selectedUserContext._current_value.markers.uid)
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
        <Text>  BENUTZERNAME:</Text>
        <TextInput editable={editingUsername} value={displayUsername} onChangeText={setDisplayUsername}/>
        <ButtonRegularWithBorder
          text={editUsernameLabel}
          onPress={() => ToggleUsernameEdit()}
          backgroundColor={Colors.findmyactivityYellow}
        />
        <Text> __________________________________________ </Text>
        <Text>  BESCHREIBUNG:</Text>
        <TextInput editable={editingDescription} value={displayDescription} onChangeText={setDisplayDescription}/>
        <ButtonRegularWithBorder
          text={editDescriptionLabel}
          onPress={() => ToggleDescriptionEdit()}
          backgroundColor={Colors.findmyactivityYellow}
        />       
        <Text> __________________________________________ </Text>
        <Text>  USER-ID:</Text>
        <Text>  {selectedUserContext._current_value.markers.uid} </Text>  
        <Text> __________________________________________ </Text>
        <Text>  E-MAIL:</Text>
        <Text>  {loggedInUser._current_value.email.toString()} </Text>  
      </View>
      <View>
      <ButtonRegularWithBorder
      text={"SAVE CHANGES"}
      onPress={() => onSaveButton()}
      backgroundColor={Colors.findmyactivityYellow}
      /> 
    </View>
    </ScrollView>
  )
}

export default ProfileScreen

// const styles = StyleSheet.create({

// })