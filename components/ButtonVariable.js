import { TouchableOpacity, Text, StyleSheet } from "react-native"
import Colors from "../constants/Colors"
import { stylesGlobal } from "../constants/StylesGlobal"
import Icon from 'react-native-vector-icons/MaterialIcons'

import PropTypes from 'prop-types'

// component props: onPress, text, backgroundColor, MarginBottom
const ButtonVariable = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.button, {backgroundColor: props.backgroundColor, borderColor: props.borderColor, width: props.width}]}

      accessible={true}
      accessibilityLabel={props.text}
      aria-label={props.text}
      accessibilityHint={props.accessibilityHint}
      accessibilityRole={"button"}
    >
      {props.icon ?
      <Icon
        name={props.icon}
        color={Colors.findmyactivityText}
        size={20}
      />
      : null}
      <Text style={[stylesGlobal.buttonTextBlack, {color: props.textColor || Colors.findmyactivityText, textAlign: "center"}]}>{props.text}</Text>
    </TouchableOpacity>
  )
}

ButtonVariable.propTypes = { onPress: PropTypes.func.isRequired, text: PropTypes.string.isRequired, backgroundColor: PropTypes.string.isRequired, 
  borderColor: PropTypes.string, textColor: PropTypes.string, icon: PropTypes.string, width: PropTypes.any,

  accessibilityHint: PropTypes.string,
}

export default ButtonVariable

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderColor: Colors.findmyactivityYellow,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: "space-evenly"
  },
})