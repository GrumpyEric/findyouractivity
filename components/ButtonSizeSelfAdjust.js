import { TouchableOpacity, Text, StyleSheet } from "react-native"
import Colors from "../constants/Colors"
import stylesGlobal from "../constants/StylesGlobal"

// component props: onPress, text
const ButtonSizeSelfAdjust = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.button}
    >
      <Text style={stylesGlobal.standardText}>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default ButtonSizeSelfAdjust

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.findmyactivityBlue,
    // width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
})