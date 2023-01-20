import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { stylesGlobal } from "../constants/StylesGlobal";

import PropTypes from 'prop-types'

// component props: onPress, text
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

TextButton.propTypes = { onPress: PropTypes.func.isRequired, text: PropTypes.string.isRequired}

export default TextButton

const styles = StyleSheet.create ({
  button: {
    marginTop: 10,
  },
})