import { TouchableOpacity, Text, StyleSheet } from "react-native"
import Colors from "../constants/Colors"
import { stylesGlobal } from "../constants/StylesGlobal"

// component props: onPress, text, backgroundColor
const ButtonSmall = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.button, {backgroundColor: props.backgroundColor}]}
    >
      <Text style={stylesGlobal.standardText}>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default ButtonSmall

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.findmyactivityYellow,
    width: 150,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
})