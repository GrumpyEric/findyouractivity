import React from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { stylesGlobal } from '../../constants/StylesGlobal'
import { getParticipant } from '../../constants/MainFunctions'
import { participantContext } from '../../components/AppContext'
import TextButton from '../../components/TextButton'

import 'intl'
import 'intl/locale-data/jsonp/de'

const ViewParticipantScreen = ( {route, navigation} ) => {  

  const members = route.params.memberList

  const onParticipantButton = async(val) => {
    await getParticipant(val)
    navigation.navigate('ViewAuthorScreen', { authorID: val, authorUsername: participantContext._current_value.markers.username, authorDescription: participantContext._current_value.markers.description})
  }

  return (
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
      {
        members.map( (val,index) => {
          return (
            <TextButton
            text={val +' (Profile ansehen)'}
            onPress={ () => { onParticipantButton(val) } }
      />
          )
        } )
      }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: stylesGlobal.screenContainer.flex,
    // paddingHorizontal: stylesGlobal.screenContainer.paddingHorizontal,
    // paddingVertical: stylesGlobal.screenContainer.paddingVertical,
    backgroundColor: stylesGlobal.screenContainer.backgroundColor,
    alignItems: 'center'
  },

  ueberschriftText: {
    fontWeight: stylesGlobal.ueberschriftText.fontWeight,
    fontSize: stylesGlobal.ueberschriftText.fontSize
  },

  scrollViewContainer: {
    alignItems: 'center', 
    justifyContent: 'center', 
  }
})

export default ViewParticipantScreen