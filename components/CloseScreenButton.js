import { TouchableOpacity, Text, StyleSheet } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons'

import PropTypes from 'prop-types'

// component props: onPress, iconColor
const CloseScreenButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Icon
        name="close"
        size={30}
        color={props.iconColor}
      />
    </TouchableOpacity>
  )
}

CloseScreenButton.propTypes = { onPress: PropTypes.func.isRequired, iconColor: PropTypes.string.isRequired }

export default CloseScreenButton