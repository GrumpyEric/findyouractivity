import React, { useRef, useState } from 'react'
import { StyleSheet, View, Text, Alert, ScrollView, BackHandler } from 'react-native'
import { stylesGlobal } from '../../constants/StylesGlobal'
import TextInputField from '../../components/TextInputField'
import { auth } from '../../firebase/firebase-config'
import { addMarkerToDB, updateMarkerToDB } from '../../constants/MainFunctions'
import { editMarkerMode, editMarkerValues, latitudeContext, longitudeContext, tagData } from '../../components/AppContext'
import Colors from '../../constants/Colors'
import ButtonVariable from '../../components/ButtonVariable'
import TextButton from '../../components/TextButton'
import ButtonBack from '../../components/ButtonBack'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import DropDownPicker from 'react-native-dropdown-picker';

import 'intl'
import 'intl/locale-data/jsonp/de'
import { intlFormat } from 'date-fns'
import { TextInput } from 'react-native-gesture-handler'

const HilfeScreen = ( {navigation} ) => {  
  return (
    <View style={[stylesGlobal.screenContainer, {backgroundColor: Colors.findmyactivityBackground}]}>
      <Text style={[stylesGlobal.ueberschriftText, {marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenItems}]}>Hilfe</Text>

      <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.contentContainerStyle} persistentScrollbar>
        <Text>text</Text>
        <TextButton
          text='FOCUS'
          onPress={() => null}
        />
        <TextInput/>
        <TextInputField/>
      </ScrollView>

      <ButtonBack
        onPress={() => { navigation.goBack(); editMarkerMode._currentValue === true ? editMarkerMode._currentValue = false : null }}
        text={'Zurück'}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: stylesGlobal.screenContainer.flex,
    backgroundColor: stylesGlobal.screenContainer.backgroundColor,
  },

  scrollViewStyle: {
    width: '100%',
    marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenItems,
  },

  scrollViewContainer: {
    alignItems: 'center',
    marginRight: 10
  },

  itemSpacerStyle: {
    width: '100%', 
    marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenItems
  },

  contentContainerStyle: {
    marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenItems,
    flex: 1,
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    backgroundColor: Colors.findmyactivityWhite
  },
})

export default HilfeScreen