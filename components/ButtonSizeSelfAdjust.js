import { TouchableOpacity, Text, StyleSheet } from "react-native"
import Colors from "../constants/Colors"
import { stylesGlobal } from "../constants/StylesGlobal"
import Icon from 'react-native-vector-icons/MaterialIcons'

import PropTypes from 'prop-types'

// component props: onPress, text, backgroundColor, textColor
const ButtonSizeSelfAdjust = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.button, {backgroundColor: props.backgroundColor}]}
    >
      {props.icon ?
      <Icon
        name={props.icon}
        color={Colors.findmyactivityText}
        size={20}
      />
      : null}
      <Text style={[stylesGlobal.standardText, {color: props.textColor}]}>{props.text}</Text>
    </TouchableOpacity>
  )
}

ButtonSizeSelfAdjust.propTypes = { onPress: PropTypes.func.isRequired, text: PropTypes.string.isRequired, 
  backgroundColor: PropTypes.string.isRequired, textColor: PropTypes.string.isRequired, icon: PropTypes.string
}

export default ButtonSizeSelfAdjust

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.findmyactivityYellow,
    // width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: "space-evenly"
  },

})