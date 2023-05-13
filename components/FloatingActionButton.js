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

      accessible={true}
      accessibilityLabel={props.text}
      aria-label={props.text}
      accessibilityHint={props.accessibilityHint}
      accessibilityRole={"button"}
      accessibilityState={{
        disabled: props.isAccessibilityStateDisabled,
        selected: props.isAccessibilityStateSelected,
        checked: props.isAccessibilityStateChecked,
        busy: props.isAccessibilityStateBusy,
        expanded: props.isAccessibilityStateExpanded
      }}
      accessibilityValue={{
        min: props.isAccessibilityValueMin,
        max: props.isAccessibilityValueMax,
        now: props.isAccessibilityValueNow,
        text: props.isAccessibilityValueText
      }}
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

  accessibilityLabel: PropTypes.string, accessibilityHint: PropTypes.string,
  isAccessibilityStateDisabled: PropTypes.bool,
  isAccessibilityStateSelected: PropTypes.bool,
  isAccessibilityStateChecked: PropTypes.bool,
  isAccessibilityStateBusy: PropTypes.bool,
  isAccessibilityStateExpanded: PropTypes.bool,

  isAccessibilityValueMin: PropTypes.number,
  isAccessibilityValueMax: PropTypes.number,
  isAccessibilityValueNow: PropTypes.number,
  isAccessibilityValueText: PropTypes.string
}

export default FloatingActionButton

