import { TouchableOpacity, Text, StyleSheet } from "react-native"
import Colors from "../constants/Colors"
import { stylesGlobal } from "../constants/StylesGlobal"

import PropTypes from 'prop-types'

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

ButtonSmall.propTypes = { onPress: PropTypes.func.isRequired, text: PropTypes.string.isRequired, backgroundColor: PropTypes.string.isRequired }

export default ButtonSmall

const styles = StyleSheet.create({
  button: {
    width: 150,
    padding: 15,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
})