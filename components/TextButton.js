import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { stylesGlobal } from "../constants/StylesGlobal";

import PropTypes from 'prop-types'

// component props: onPress, text
const TextButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.button}

      accessible={true}
      accessibilityLabel={props.text}
      aria-label={props.text}
      accessibilityHint={props.accessibilityHint}
      accessibilityRole={"button"}
    >
      {props.icon ?
      <Icon 
        name={props.icon}
      />
      : null}
      <Text style={[stylesGlobal.buttonTextBlack, {color: props.textColor, textAlign: "center", textDecorationLine: "underline"}]}>{props.text}</Text>
    </TouchableOpacity>
  )
}

TextButton.propTypes = { onPress: PropTypes.func.isRequired, text: PropTypes.string.isRequired, textColor: PropTypes.string,
  icon: PropTypes.string,
  
  accessibilityHint: PropTypes.string, 
}

export default TextButton

const styles = StyleSheet.create ({
  button: {
    // marginTop: 5,
    // marginBottom: 20,
  },
})