import Multiselect from 'multiselect-react-dropdown';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { stylesGlobal } from '../constants/StylesGlobal'

const FilterScreen = ( {navigation} ) => {

  const Filters = {
    options: [
        {name: 'Fußball', id: 1},
        {name: 'Basketball', id: 2},        
        {name: 'Tischtennis', id: 3},
        {name: 'Schach', id: 4},
        {name: 'Kartenspiel', id: 5}
    ]

    };

    const onSelect = (selectedList, selectedItem) => {
        console.log(selectedItem, " has been selected");
    };
    
    const onRemove = (selectedList, removedItem) => {
        console.log(selectedItem, " has been removed");
    };

  return (
    <Multiselect
        options={Filters.options} // Options to display in the dropdown
        selectedValues={Filters.selectedValue} // Preselected value to persist in dropdown
        onSelect={onSelect} // Function will trigger on select event
        onRemove={onRemove} // Function will trigger on remove event
        displayValue="name" // Property name to display in the dropdown options
    />
  )
}

export default FilterScreen

