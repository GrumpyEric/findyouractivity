
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView,StyleSheet } from 'react-native';
import { SelectList,MultipleSelectList } from 'react-native-dropdown-select-list'

import ButtonRegularWithBorder from '../components/ButtonRegular';

import Colors from '../constants/Colors'


const FilterScreen = ( {navigation} ) => {

  const [selected, setSelected] = useState([]);
  const [filtersRef, setFilters] = useState([]);

  const data = [
    {key:'1', value:'Fußball'},
    {key:'2', value:'Basketball'},
    {key:'3', value:'Schach'},
    {key:'4', value:'Kartenspiel'},
    {key:'5', value:'Tischtennis'},
    {key:'6', value:'Picknick'},
    {key:'7', value:'Shopping'}
  ]

  const saveFilters = () => {
    alert("TODO: Filter-Auswahl speichern")
    navigation.pop()
  }

 
return(
  <View>
  <MultipleSelectList  
      defaultOption={filtersRef}
      setSelected={(val) => setSelected(val)} 
      data={data} 
      save="value"
      //onSelect={() => alert(selected)} 
      label="Aktivitätstyp"
  />
    <View style={hampter.button}>
    <ButtonRegularWithBorder
      text={'SAVE FILTERS'}
      onPress={() => saveFilters()}
      backgroundColor={Colors.findmyactivityYellow}
      // onPress={() => addMarkerToDB(auth, 'EVENTNAME', 'EVENTDESC', 53.6, 10.045)}
    /> 
    </View>
  </View>
)

}

export default FilterScreen

const hampter = StyleSheet.create({
  button: {

    alignItems: 'center',
    marginTop: 40,
  },
})