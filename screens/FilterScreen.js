
import React, { useEffect, useState } from 'react'
import { Alert,View, Text, TouchableOpacity, ScrollView,StyleSheet } from 'react-native';
import { SelectList,MultipleSelectList } from 'react-native-dropdown-select-list'
import { filterContext,tagData } from '../components/AppContext';

import { applyFilters } from '../constants/MainFunctions';

import ButtonRegularWithBorder from '../components/ButtonRegular';
import ButtonSmall from '../components/ButtonSmall';

import Colors from '../constants/Colors'



const FilterScreen = ( {navigation} ) => {

  const [selected, setSelected] = useState(filterContext._current_value);
  useEffect(() => {
    //setSelected(filterContext._currentValue)
    console.log("SELECTED: ", selected)
    console.log("FILTERCONTEXT 1: ", filterContext._current_value)
  }, [selected]);



  const saveFilters = () => {
    //alert("TODO: Filter-Auswahl speichern")
    //filtersRef = selected
    filterContext._current_value = selected
    //alert(filterContext._currentValue)
    //setSelected([]);
    applyFilters()
    const alerta_title = "Filters have been applied"
    const alerta_msg = filterContext._current_value.toString()
    Alert.alert(alerta_title,alerta_msg);
    //navigation.pop()
  }

  const clearFilters = () => {
    setSelected([])
    filterContext._current_value = undefined   
    applyFilters()
    const alerta_title = "Filters have been reset"
    Alert.alert(alerta_title);
    //navigation.pop()
  }
 
return(
  <View>

  <MultipleSelectList  
      setSelected={selected}//{(val) => setSelected(val)} 
      data={tagData} 
      save="value"
      //onSelect={() => alert(selected)} 
      label="Aktivitätstyp"
      //defaultOption={}

  />
    <View style={hampter.button}>
    <ButtonRegularWithBorder
      text={'APPLY FILTERS'}
      onPress={() => saveFilters()}
      backgroundColor={Colors.findmyactivityYellow}
    />
    <ButtonRegularWithBorder
      text={'CLEAR FILTERS'}
      onPress={() => clearFilters()}
      backgroundColor={'red'}
    />
    <ButtonRegularWithBorder
      text={'CLOSE'}
      onPress={() => navigation.pop()}
      backgroundColor={'hotpink'}
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