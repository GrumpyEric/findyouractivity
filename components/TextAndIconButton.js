import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { stylesGlobal } from "../constants/StylesGlobal";

import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Ionicons'

// component props: onPress, text
const TextAndIconButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.button}
    >
      <Icon 
        name='location-sharp'
      />
      <Text style={[stylesGlobal.standardText, {color: Colors.findmyactivityText}]}>{props.text}</Text>
    </TouchableOpacity>
  )
}

TextAndIconButton.propTypes = { onPress: PropTypes.func.isRequired, text: PropTypes.string.isRequired}

export default TextAndIconButton

const styles = StyleSheet.create ({
  button: {
    flexDirection: 'row',
    marginTop: 10,
  },
})