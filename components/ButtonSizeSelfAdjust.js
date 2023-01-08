import { TouchableOpacity, Text, StyleSheet } from "react-native"
import Colors from "../constants/Colors"
import { stylesGlobal } from "../constants/StylesGlobal"

// component props: onPress, text, backgroundColor, textColor
const ButtonSizeSelfAdjust = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.button, {backgroundColor: props.backgroundColor}]}
    >
      <Text style={[stylesGlobal.standardText, {color: props.textColor}]}>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default ButtonSizeSelfAdjust

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.findmyactivityYellow,
    // width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },

})