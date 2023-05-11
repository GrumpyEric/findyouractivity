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
      <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.scrollViewContainer}>
      <Text style={[stylesGlobal.ueberschriftText, styles.textCenterStyle]}>{nameDisplay}</Text>
      {descriptionDisplay ?
      <Text style={[stylesGlobal.standardText, styles.spacingBetweenText, styles.textCenterStyle]}>{descriptionDisplay} </Text>  
      : null}
      {locationDescriptionDisplay ?
      <Text style={[stylesGlobal.standardText, styles.textCenterStyle]}>Wo?: {locationDescriptionDisplay} </Text>
      : null}
      {/* <View style={{flexDirection: 'row'}}> */}
        {/* <TextButton
            text={authorUsernameDisplay}
            onPress={() => {navigation.navigate('ViewAuthorScreen', { authorID: authorDisplay, authorUsername: authorUsernameDisplay, authorDescription: authorDescriptionDisplay}) } }
        /> */}
      {/* </View> */}
      <Text style={[stylesGlobal.standardText, styles.spacingBetweenText, styles.textCenterStyle]}>Anzahl der Teilnehmer: {participantList.length} / {maxParticipantDisplay} </Text>
      {/* <View style={{marginVertical: stylesGlobal.marginsAndPadding.paddingBetweenItems}}>
        <ButtonVariable
          text={'Teilnehmer anzeigen'}
          onPress={() => { navigation.navigate('ViewParticipantScreen', {memberList: participantList} ) } }
          backgroundColor={Colors.findmyactivityYellow}
          borderColor={Colors.findmyactivityYellow}
          width={175}
        />
      </View> */}
      {startTimeDisplay}
      {endTimeDisplay}
      {tagDisplay}
      <Text style={[stylesGlobal.standardText, styles.textCenterStyle]}>Erstellt von: {authorUsernameDisplay}</Text>
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

  scrollViewStyle: {
    width: '100%',
  },
  
  spacingBetweenText: {
    marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenItems
  },

  textCenterStyle: {
    textAlign: 'center'
  },

  scrollViewContainer: {
    alignItems: 'center',
    height: height * 0.4,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: Colors.findmyactivityWhite
  },
})

export default ViewMarkerScreen