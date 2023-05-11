import React from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { height, stylesGlobal } from '../../constants/StylesGlobal'
import { getParticipant } from '../../constants/MainFunctions'
import { participantContext } from '../../components/AppContext'
import TextButton from '../../components/TextButton'

import 'intl'
import 'intl/locale-data/jsonp/de'
import Colors from '../../constants/Colors'

const ViewParticipantScreen = ( {route, navigation} ) => {  

  const members = route.params.memberList

  const onParticipantButton = async(val) => {
    await getParticipant(val)
    navigation.navigate('ViewAuthorScreen', { authorID: val, authorUsername: participantContext._current_value.markers.username, authorDescription: participantContext._current_value.markers.description})
  }

  return (
    <View style={[stylesGlobal.screenContainer, {backgroundColor: Colors.findmyactivityBackground}]}>
      <Text style={[stylesGlobal.ueberschriftText, {marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenItems}]}>Teilnehmerliste</Text>
      <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.scrollViewContainer}>
      {
        members.map( (val,index) => {
          return (
            <TextButton
              text={val +' (Profil ansehen)'}
              onPress={ () => { onParticipantButton(val) } }
            />
          )
        } )
      }
      </ScrollView>
    </View>
  )
}

export default ViewParticipantScreen

const styles = StyleSheet.create({
  scrollViewStyle: {
    width: '100%',
  },

  scrollViewContainer: {
    paddingVertical: stylesGlobal.marginsAndPadding.paddingBetweenItems,
    alignItems: 'center',
    height: height * 0.4,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: Colors.findmyactivityWhite
  },
})