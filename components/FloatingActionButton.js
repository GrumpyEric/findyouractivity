import { TouchableOpacity, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome";

const FloatingActionButton = (props) => {
  
  return(
    <TouchableOpacity
    style={{
      backgroundColor: 'white',
      position: 'absolute',
      bottom: props.bottomPos,
      right: props.rightPos,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: 'black',
      elevation: 3,
      alignItems: 'center',
      alignSelf: 'flex-end',
      justifyContent: 'center',
      borderRadius: 30,
      zIndex: 5,
      width: 60,
      height: 60
    }}
    onPress={props.onPress}
  >
    <Icon 
      name='location-arrow'
      size={35}
      color='black'
    />
  </TouchableOpacity>
  )
}
export default FloatingActionButton

