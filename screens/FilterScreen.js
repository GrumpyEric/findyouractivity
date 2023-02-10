
import React, { useEffect, useState } from 'react'
import { Alert,View, Text, TouchableOpacity, ScrollView,StyleSheet } from 'react-native';
import { filterContext,tagData, rangeContext } from '../components/AppContext';
import Slider from '@react-native-community/slider';

import { applyFilters } from '../constants/MainFunctions';

import ButtonRegularWithBorder from '../components/ButtonRegular';

import Colors from '../constants/Colors'

import DropDownPicker from 'react-native-dropdown-picker';
import { arrayIsEmpty } from '../constants/HelperFunctionsAndVariables';


const FilterScreen = ( {navigation} ) => {

  const [selected, setSelected] = useState(filterContext._current_value);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(tagData);  
  const [value, setValue] = useState(filterContext._current_value);

  const [radiusMarkers, setRadiusMarkers] = useState(5)
  const [radiusMarkersVisual, setRadiusMarkersVisual] = useState(5)
  
  // ausgewählte Filter als Badges anzeigen
  DropDownPicker.setMode("BADGE");

  // deutsche Übersetzung für die Dropdown_Liste
  DropDownPicker.addTranslation("DE", {
    PLACEHOLDER: "Wähle die gewünschten Tags aus",
    SEARCH_PLACEHOLDER: "Suche...",
    SELECTED_ITEMS_COUNT_TEXT: {
      1: '1 Tags wurde ausgewählt',
      // Feel free to add more
      n: '{count} Tags wurden ausgewählt'
    },
    NOTHING_TO_SHOW: "NOTHING TO SHOW"
  });
  
  // deutsche Sprache einsetzen
  DropDownPicker.setLanguage("DE");

  useEffect(() => {
    //setSelected(filterContext._currentValue)
    //console.log("VALUE: ", value)
    console.log("value:", typeof value, value)
  }, [value]);

  useEffect(() => {
    //setSelected(filterContext._currentValue)
    //console.log("VALUE: ", value)
    console.log("FILTERCONTEXT 1:", typeof filterContext._current_value, filterContext._current_value)
  }, [filterContext._current_value]);

  const changeRange = (inputVal) =>
  {
    setRange(inputVal)
    rangeContext._current_value = inputVal
  }

  const saveFilters = () => {
    //alert("TODO: Filter-Auswahl speichern")
    //filtersRef = selected
    filterContext._current_value = value
    if (arrayIsEmpty(filterContext._current_value) || filterContext._current_value === undefined) {
      Alert.alert('Achtung', 'Es wurden keine Tags ausgewählt. Bitte wählen Sie oben im ausklappbaren Menü einen oder mehrere Filter aus!')

    } else {

      //alert(filterContext._currentValue)
      //setSelected([]);
      applyFilters()
      const alerta_title = "Filter wurden angewendet"
      const alerta_msg = filterContext._current_value.toString()
      Alert.alert(alerta_title, alerta_msg);
      rangeContext._currentValue = radiusMarkers
      //navigation.pop()
      
    }
  }

  const clearFilters = () => {
    setValue([])
    filterContext._current_value = undefined   
    applyFilters()
    const alerta_title = "Erfolg"
    const alerta_text = "Filter wurden zurückgesetzt"
    Alert.alert(alerta_title,alerta_text) ;
    //navigation.pop()
  }

  useEffect(() => {
    console.log('radius:', radiusMarkers);
    console.log('radius context:', rangeContext._currentValue)
  }, [radiusMarkers])
  
 
return(
  <View>

    <View style={{width: '100%'}}>
      <Text>Radius der anzuzeigenden Marker</Text>
      <Text>{radiusMarkersVisual === 'alle' ? radiusMarkersVisual : radiusMarkersVisual + ' km'}</Text>
      <Slider
        minimumValue={0}
        maximumValue={21}
        onSlidingComplete={(value) => { value < 21 ? setRadiusMarkers(value) : setRadiusMarkers('alle') } }
        step={1}
        value={radiusMarkers}
        onValueChange={(value) => value < 21 ? setRadiusMarkersVisual(value) : setRadiusMarkersVisual('alle')}
      />
    </View>

    <DropDownPicker
      searchable={true}
      multiple={true}
      min={0}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
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