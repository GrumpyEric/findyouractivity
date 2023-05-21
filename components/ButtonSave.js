import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { stylesGlobal } from "../constants/StylesGlobal";

function ButtonSave(props) {
  return (
    <TouchableOpacity 
      style={[styles.container, props.style]}
      accessibilityLabel="Speichern"
      aria-label="Speichern"
      accessibilityHint="Speichert Ihre Änderungen"
    >
      <Text 
        style={stylesGlobal.standardText}
        accessibilityRole="text"
        accessibilityLabel='Speichern'
        aria-label='Speichern'
      >
        Speichern
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(251,185,0,1)",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16
  },
  speichern: {
    color: "#000000",
    fontSize: 20
  }
});

export default ButtonSave;
