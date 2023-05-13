import React from "react";
import { height, width } from "../constants/StylesGlobal";

import PropTypes from 'prop-types'
import FloatingActionButton from "./FloatingActionButton";

function ButtonBack(props) {
  return (
    <FloatingActionButton
      bottomPos={height * 0.05}
      rightPos={width * 0.05}
      icon="arrow-left"
      text={'Zurück'}
      onPress={props.onPress}
      accessibilityHint={props.accessibilityHint}
    />
  );
}

ButtonBack.propTypes = { onPress: PropTypes.func, style: PropTypes.any, text: PropTypes.string, accessibilityHint: PropTypes.string }

export default ButtonBack;
