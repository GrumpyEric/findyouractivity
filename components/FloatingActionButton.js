import { TouchableOpacity, StyleSheet, Text } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome";
import { stylesGlobal } from '../constants/StylesGlobal'

import PropTypes from 'prop-types'

const FloatingActionButton = (props) => {
  
  return(
    <TouchableOpacity
      style={{
        backgroundColor: 'white',
        position: 'absolute',
        bottom: props.bottomPos,
        right: props.rightPos,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'black',
        elevation: 3,
        alignItems: 'center',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        borderRadius: 35,
        zIndex: 5,
        width: 70,
        height: 70
      }}
      onPress={props.onPress}
    >
      <Icon 
        name={props.icon}
        size={30}
        color='black'
      />
      {props.text ?
      <Text style={[stylesGlobal.buttonTextBlack, {fontSize: 14}]}>{props.text}</Text>
      : null}
    </TouchableOpacity>
  )
}

FloatingActionButton.propTypes = { onPress: PropTypes.func.isRequired, bottomPos: PropTypes.number.isRequired, 
  rightPos: PropTypes.number.isRequired, icon: PropTypes.string.isRequired, text: PropTypes.string
}

export default FloatingActionButton

