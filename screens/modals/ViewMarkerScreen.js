import React from 'react'
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native'
import { auth } from '../../firebase/firebase-config'
import { optOutOfEvent,optInToEvent } from '../../constants/MainFunctions'
import ButtonVariable from '../../components/ButtonVariable'
import TextButton from '../../components/TextButton'

import 'intl'
import 'intl/locale-data/jsonp/de'
import { height, stylesGlobal } from '../../constants/StylesGlobal'
import ButtonBack from '../../components/ButtonBack'
import Colors from '../../constants/Colors'

const ViewMarkerScreen = ( {route, navigation} ) => {  
  const nameDisplay = route.params.eventName
  const descriptionDisplay = route.params.eventDescription
  const authorDisplay = route.params.eventAuthorID  
  const authorUsernameDisplay = route.params.eventAuthorUsername  
  const authorDescriptionDisplay = route.params.eventAuthorDescription  
  const creationTimeStamp = route.params.creationDate
  const startTimeDisplay = route.params.eventStartTime  
  const endTimeDisplay = route.params.eventEndTime
  const tagDisplay = route.params.eventTags
  const maxParticipantDisplay = route.params.eventMaxParticipants
  const locationDescriptionDisplay = route.params.eventLocationDescription  
  const participantList = route.params.eventParticipantList

  const onParticipateButton = () =>
  {
    let isParticipating
    if ( participantList.includes( auth.currentUser.uid.toString() ) )
    { 
      isParticipating = true
    }
    else
    {
      isParticipating = false
    }

    if (isParticipating)
    {
      Alert.alert('Teilnahme Absagen', 'Sie sind schon ein Teilnehmer dieses Events. \nWollen Sie die Teilnahme am Event absagen?', [
        {
          text: 'Abbrechen',
          onPress: () => {},
          style: 'cancel',
        },
        { text: 'Absage Bestätigen', onPress: () =>{ optOutOfEvent( authorDisplay, creationTimeStamp, auth.currentUser.uid.toString() ), navigation.pop() } },
      ]);
    }
    else
    {
      Alert.alert('Teilnahme Bestätigen', 'Sie sind noch kein Teilnehmer dieses Events. \nWollen Sie an diesem Event teilnehmen?', [
        {
          text: 'Abbrechen',
          onPress: () => {},
          style: 'cancel',
        },
        { text: 'Teilnahme Bestätigen', onPress: () => {optInToEvent( authorDisplay, creationTimeStamp, auth.currentUser.uid.toString() ), navigation.pop() } },
      ]);
    }
  }

  return (
    <View style={[stylesGlobal.screenContainer, styles.container]}>
      <ButtonBack
        onPress={() => navigation.goBack()}
        text={'Zurück'}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <Text style={stylesGlobal.ueberschriftText}>{nameDisplay}</Text>
      {descriptionDisplay ?
      <Text style={stylesGlobal.standardText}>{descriptionDisplay} </Text>  
      : null}
      {locationDescriptionDisplay ?
      <Text style={stylesGlobal.standardText}> Wo?: {locationDescriptionDisplay} </Text>
      : null}
      <Text style={[stylesGlobal.standardText, {justifyContent: 'center'}]}> Erstellt von: 
        <TextButton
          text={authorUsernameDisplay}
          onPress={() => {navigation.navigate('ViewAuthorScreen', { authorID: authorDisplay, authorUsername: authorUsernameDisplay, authorDescription: authorDescriptionDisplay}) } }
        /> 
      </Text>
      <ButtonVariable
        text={'Profil von ' + authorUsernameDisplay + ' ansehen'}
        onPress={() => {navigation.navigate('ViewAuthorScreen', { authorID: authorDisplay, authorUsername: authorUsernameDisplay, authorDescription: authorDescriptionDisplay}) } }
        backgroundColor={Colors.findmyactivityYellow}
        borderColor={Colors.findmyactivityYellow}
      />
      <Text>Anzahl der Teilnehmer: {participantList.length} von maximal {maxParticipantDisplay} </Text>
      <ButtonVariable
        text={'Teilnehmerliste anzeigen'}
        onPress={() => { navigation.navigate('ViewParticipantScreen', {memberList: participantList} ) } }
        backgroundColor={Colors.findmyactivityYellow}
        borderColor={Colors.findmyactivityYellow}
        width={100}
      />
      {startTimeDisplay}
      {endTimeDisplay}
      {tagDisplay}
      </ScrollView>
        <ButtonVariable
          text={'Teilnehmen'}
          onPress={() => onParticipateButton() }
          backgroundColor={Colors.findmyactivityYellow}
          borderColor={Colors.findmyactivityYellow}
          width={200}
        />
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.findmyactivityBackground,
  },

  scrollViewContainer: {
    alignItems: 'center',
    height: height * 0.4,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: Colors.findmyactivityWhite
  },

  buttonBack: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 2,
    minWidth: 55,
    minHeight: 55,
    backgroundColor: "rgba(35,112,118,1)",
    marginRight: 65
  },
  icon: {
    color: "#fff",
    fontSize: 35,
    alignSelf: "center"
  },

  container: {
    backgroundColor: "rgba(223,242,242,1)"
  },
  eventDetails: {
    color: "#121212",
    fontSize: 20,
    marginTop: 15
  },
  buttonBackRow: {
    height: 56,
    flexDirection: "row",
    marginTop: 5,
    marginLeft: 5,
    marginRight: 121
  },
  scrollArea: {
    width: 350,
    height: 300,
    backgroundColor: "rgba(223,242,242,1)",
    borderWidth: 2,
    borderColor: "rgba(35,112,118,1)",
    borderRadius: 10,
    marginTop: 23,
    alignSelf: 'center'
  },
  scrollArea_contentContainerStyle: {
    width: 350
  }


})

export default ViewMarkerScreen