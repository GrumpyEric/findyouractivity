import { TouchableOpacity, Text, StyleSheet } from "react-native"
import Colors from "../constants/Colors"
import { stylesGlobal } from "../constants/StylesGlobal"

// component props: onPress, text
const ButtonRegular = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.button}
    >
      <Text style={stylesGlobal.standardText}>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default ButtonRegular

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.findmyactivityBlue,
    borderWidth: 1,
    borderColor: Colors.findmyactivityBlue,
    width: 200,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    // marginTop: 40,
  },
})