import React from "react";
import { Text } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Octicons";
import { Colors } from "../constants/Colors";
import { stylesGlobal } from "../constants/StylesGlobal";

import PropTypes from 'prop-types'

function ButtonBack(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.container, props.style]}>
      <Icon name="arrow-left" style={styles.icon}></Icon>
      <Text style={stylesGlobal.buttonTextBlack}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 2,
    width: 75,
    height: 75,
    backgroundColor: Colors.findmyactivityYellow
  },
  icon: {
    color: stylesGlobal.buttonTextBlack.color,
    fontSize: 30,
    alignSelf: "center"
  }
});

ButtonBack.propTypes = { onPress: PropTypes.func, style: PropTypes.any, text: PropTypes.text,

  

}

export default ButtonBack;
