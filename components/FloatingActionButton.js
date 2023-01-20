import { TouchableOpacity, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome";

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
        borderRadius: 30,
        zIndex: 5,
        width: 60,
        height: 60
      }}
      onPress={props.onPress}
    >
      <Icon 
        name={props.icon}
        size={35}
        color='black'
      />
    </TouchableOpacity>
  )
}

FloatingActionButton.propTypes = { onPress: PropTypes.func.isRequired, bottomPos: PropTypes.number.isRequired, rightPos: PropTypes.number.isRequired, icon: PropTypes.string.isRequired }

export default FloatingActionButton

