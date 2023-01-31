import { TouchableOpacity, Text, StyleSheet } from "react-native"
import Colors from "../constants/Colors"
import { stylesGlobal } from "../constants/StylesGlobal"

import PropTypes from 'prop-types'

// component props: onPress, text, backgroundColor, MarginBottom
const ButtonRegular = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.button, {backgroundColor: props.backgroundColor}, {marginBottom: props.marginBottom}]}
    >
      <Text style={stylesGlobal.standardText}>{props.text}</Text>
    </TouchableOpacity>
  )
}

ButtonRegular.propTypes = { onPress: PropTypes.func.isRequired, text: PropTypes.string.isRequired, backgroundColor: PropTypes.string.isRequired, marginBottom: PropTypes.any }

export default ButtonRegular

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: Colors.findmyactivityYellow,
    width: 200,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
    // marginTop: 40,
  },
})