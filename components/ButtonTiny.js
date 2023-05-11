import { TouchableOpacity, Text, StyleSheet } from "react-native"
import Colors from "../constants/Colors"
import { stylesGlobal } from "../constants/StylesGlobal"
import Icon from 'react-native-vector-icons/MaterialIcons'

import PropTypes from 'prop-types'

// component props: onPress, text, backgroundColor
const ButtonTiny = (props) => {
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
      <Text style={stylesGlobal.buttonTextBlack}>{props.text}</Text>
    </TouchableOpacity>
  )
}

ButtonTiny.propTypes = { onPress: PropTypes.func.isRequired, text: PropTypes.string.isRequired, 
  backgroundColor: PropTypes.string.isRequired, icon: PropTypes.string
}

export default ButtonTiny

const styles = StyleSheet.create({
  button: {
    width: 100,
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: "space-evenly"
    //marginTop: 40,
  },
})