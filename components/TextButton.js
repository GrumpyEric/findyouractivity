import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { stylesGlobal } from "../constants/StylesGlobal";

// component props: onPress, text, textColor
const TextButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.button}
    >
      <Text style={[stylesGlobal.standardText, {color: Colors.findmyactivityText}]}>{props.text}</Text>
    </TouchableOpacity>
  )
}

export default TextButton

const styles = StyleSheet.create ({
  button: {
    marginTop: 5,
  },
})