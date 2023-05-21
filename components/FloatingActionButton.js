import { TouchableOpacity, StyleSheet, Text } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { stylesGlobal } from '../constants/StylesGlobal'

import PropTypes from 'prop-types'

const FloatingActionButton = (props) => {
  // const IconVariable = 
  
  return(
    <TouchableOpacity
      style={{
        backgroundColor: 'white',
        position: 'absolute',
        bottom: props.bottomPos,
        right: props.rightPos,
        left: props.leftPos,
        top: props.topPos,
        borderWidth: 1,
        borderColor: 'black',
        elevation: 5,
        alignItems: 'center',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        borderRadius: 35,
        zIndex: 5,
        width: 70,
        height: 70
      }}
      onPress={props.onPress}

      accessible={true}
      accessibilityLabel={props.text}
      aria-label={props.text}
      accessibilityHint={props.accessibilityHint}
      accessibilityRole={"button"}
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

FloatingActionButton.propTypes = { onPress: PropTypes.func.isRequired, bottomPos: PropTypes.number, 
  rightPos: PropTypes.number, icon: PropTypes.string, text: PropTypes.string,
  leftPos: PropTypes.number, topPos: PropTypes.number,

  accessibilityHint: PropTypes.string,
}

export default FloatingActionButton

