import { TouchableOpacity, Text, StyleSheet } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons'

// component props: onPress, iconColor
const CloseScreenButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Icon
        name="close"
        size={30}
        color={props.iconColor}
      />
    </TouchableOpacity>
  )
}

export default CloseScreenButton