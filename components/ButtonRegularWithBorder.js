import { TouchableOpacity, Text, StyleSheet } from "react-native"
import Colors from "../constants/Colors"
import { stylesGlobal } from "../constants/StylesGlobal"

// component props: onPress, text, backgroundColor, borderColor, textColor
const ButtonRegularWithBorder = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.button, {backgroundColor: props.backgroundColor, borderColor: props.borderColor}]}
    >
      <Text style={[stylesGlobal.standardText, {color: Colors.findmyactivityText}]}>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default ButtonRegularWithBorder

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.findmyactivityWhite,
    borderWidth: 2,
    borderColor: Colors.findmyactivityYellow,
    width: 200,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    // marginTop: 40,
  },
})