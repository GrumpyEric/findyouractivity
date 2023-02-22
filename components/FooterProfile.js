import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const FooterProfile = (props) => {
  const navigation = useNavigation()
  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ProfileScreen")}
        style={styles.activebtnWrapper}
      >
        <MaterialCommunityIconsIcon
          name="account"
          style={styles.icon1}
        ></MaterialCommunityIconsIcon>
        <Text style={styles.profil}>Profil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnWrapper1}
        onPress={() => navigation.navigate("HomeScreen")}
        >
        <MaterialCommunityIconsIcon
          name="home"
          style={styles.activeIcon}
        ></MaterialCommunityIconsIcon>
        <Text style={styles.karte}>Karte</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnWrapper2}
        onPress={() => navigation.navigate("EventScreen")}>
        <MaterialCommunityIconsIcon
          name="book"
          style={styles.icon2}
        ></MaterialCommunityIconsIcon>
        <Text style={styles.meineEvents}>Events</Text>
      </TouchableOpacity>
    </View>
  );
}

export default FooterProfile

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(35,112,118,1)",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: -2
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 3
  },
  btnWrapper1: {
    flex: 0.34,
    paddingTop: 8,
    paddingBottom: 6,
    paddingHorizontal: 12,
    minWidth: 80,
    maxWidth: 168,
    alignItems: "center"
  },
  icon1: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 24
  },
  profil: {
    color: "#FFFFFF"
  },
  activebtnWrapper: {
    flex: 0.32,
    paddingTop: 6,
    paddingBottom: 10,
    paddingHorizontal: 12,
    minWidth: 80,
    maxWidth: 168,
    alignItems: "center"
  },
  activeIcon: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 24,
    opacity: 0.8
  },
  karte: {
    color: "#FFFFFF",
    fontSize: 14,
    paddingTop: 4,
    opacity: 0.8
  },
  btnWrapper2: {
    flex: 0.34,
    paddingTop: 8,
    paddingBottom: 6,
    paddingHorizontal: 12,
    minWidth: 80,
    maxWidth: 168,
    alignItems: "center"
  },
  icon2: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 24,
    opacity: 0.8
  },
  meineEvents: {
    color: "#FFFFFF",
    opacity: 0.8
  }
});
