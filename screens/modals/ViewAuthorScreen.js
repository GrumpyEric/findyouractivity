import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet } from 'react-native';
import { userPosContext } from '../../components/AppContext';
import { getDistance } from 'geolib';
import React from "react";
import { markersRef } from '../../constants/MainFunctions';
import ButtonBack from '../../components/ButtonBack';
import EventHeader from '../../components/EventHeader'
import { stylesGlobal } from '../../constants/StylesGlobal';

const ViewAuthorScreen = ( { route,navigation } ) => {

  const displayID = route.params.authorID
  const displayUsername = route.params.authorUsername
  const displayDescription = route.params.authorDescription

  let eventArray = markersRef.filter(function (arr) {
    return arr.user === displayID
  })

  return (
    <View style={styles.container}>
      {/* <EventHeader
        text={'Author'}
      /> */}
      <View style={styles.buttonBackRowColumn}>
        <Text style={[styles.benutzernameLabel, stylesGlobal.ueberschriftText2]}>Benutzername</Text>
        <TextInput
          placeholder="Benutzername"
          placeholderTextColor="rgba(179,179,179,1)"
          style={styles.benutzername}
          value={displayUsername}
          editable={false}
        ></TextInput>
        <Text style={[styles.beschreibungLabel, stylesGlobal.ueberschriftText2]}>Beschreibung</Text>
        <TextInput
          placeholder="Beschreibung"
          multiline={true}
          clearTextOnFocus={false}
          placeholderTextColor="rgba(179,179,179,1)"
          maxLength={250}
          style={styles.beschreibung}
          value={displayDescription}
          editable={false}
        ></TextInput>
        <Text style={[styles.eventsLabel, stylesGlobal.ueberschriftText2]}>Events</Text>
        <View style={styles.scrollAreaEvents}>
          <ScrollView
            contentContainerStyle={
              styles.scrollAreaEvents_contentContainerStyle
            }
          >
            <View>
            {eventArray.map((val, index) => 
            {

              let distanceToUserPos = "?"//getDistance(val,props.userPosContext.coords) / 1000
              if (userPosContext._currentValue.coords != undefined)
              {
                distanceToUserPos = getDistance(val, userPosContext._currentValue.coords) / 1000
              }

              const displayTags = (val) => {
                if( (val.tags != undefined)) 
                {
                  return <Text> Tags: {val.tags.toString()}</Text>
                }
              }

              const displayStartTime = (val) => {

                let startTimeRes = ""//val.startTime

                if( (val.startTime != undefined) ) 
                {
                  //return <Text> Start-Zeit: {val.startTime.toDate().toString()} </Text>
                  startTimeRes = val.startTime.toDate().toString()
                }
                else if ( !(val.startTime != undefined) ) 
                {
                  //return <Text> Start-Zeit: unbekannt </Text>
                  startTimeRes = "unbekannt"
                }
                return  <Text> Start-Zeit: {startTimeRes} </Text>
              }

              const displayEndTime = (val) => {

                let endTimeRes = ""//val.endTime

                if( (val.endTime != undefined) ) 
                {
                  //return <Text> Start-Zeit: {val.startTime.toDate().toString()} </Text>
                  endTimeRes = val.endTime.toDate().toString()
                }
                else if ( !(val.endTime != undefined) ) 
                {
                  //return <Text> Start-Zeit: unbekannt </Text>
                  endTimeRes = "unbekannt"
                }

                return  <Text> End-Zeit: {endTimeRes} </Text>
              }


              return (
                <View key={index} style={{backgroundColor: 'rgba(35, 112, 118, 0.2)', marginBottom: 10, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 10}}>
                  <TouchableOpacity onPress={() => console.log(val)}>
                    <Text key={Math.random().toString()}> {val.name} </Text>
                    <Text key={Math.random().toString()}> {val.description} </Text>
                    { displayStartTime(val) }
                    { displayEndTime(val) }
                    <Text> Distanz: {distanceToUserPos} km</Text>
                    { displayTags(val) }
                  </TouchableOpacity>
                </View>
              )
            }
          )}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

export default ViewAuthorScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(223,242,242,1)"
  },


  containerHeader: {
    flexDirection: "row",
    backgroundColor: "rgba(223,242,242,1)",
    paddingRight: 8,
    paddingLeft: 8
  },
  buttonBack: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 2,
    minWidth: 55,
    minHeight: 55,
    backgroundColor: "rgba(35,112,118,1)",
    marginRight: 65
  },
  leftWrapper: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  leftIconButton: {
    flexDirection: "row"
  },
  leftIcon: {
    color: "rgba(35,112,118,1)",
    fontSize: 30
  },
  zuruck: {
    fontSize: 17,
    color: "rgba(35,112,118,1)",
    paddingLeft: 5,
    alignSelf: "center"
  },
  textWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  profil: {
    fontSize: 17,
    lineHeight: 17,
    color: "#000"
  },
  button: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  rightIconButton: {},
  speichern: {
    color: "rgba(35,112,118,1)",
    fontSize: 17,
    alignSelf: "center"
  },
  
  cupertinoHeaderWithActionButton: {
    height: 57,
    backgroundColor: "rgba(223,242,242,1)",
    top: 30
  },
  buttonBack: {
    height: 56,
    width: 56
  },
  icon: {
    color: "rgba(35,112,118,1)",
    fontSize: 80,
    marginTop: 23,
    alignSelf: 'center'
  },
  buttonBackRow: {
    height: 56,
    flexDirection: "row",
    marginTop: 5,
    marginLeft: 5,
    marginRight: 121
  },
  benutzernameLabel: {
    color: "#121212",
    marginTop: 19,
    marginLeft: 7
  },
  benutzername: {
    color: "#121212",
    height: 41,
    width: 325,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    marginTop: 3,
    marginLeft: 7,
    paddingLeft: 10
  },
  beschreibungLabel: {
    color: "#121212",
    marginTop: 14,
    marginLeft: 7
  },
  beschreibung: {
    color: "#121212",
    height: 94,
    width: 325,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 10,
    marginTop: 2,
    marginLeft: 7,
    paddingLeft: 10
  },
  eMailAdresseLabel: {
    color: "#121212",
    marginTop: 12,
    marginLeft: 7
  },
  email: {
    color: "#121212",
    height: 41,
    width: 325,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 2,
    marginLeft: 7,
    paddingTop: 10,
    paddingLeft: 10
  },
  eventsLabel: {
    color: "#121212",
    marginTop: 12,
    marginLeft: 7
  },
  scrollAreaEvents: {
    width: 325,
    height: 200,
    backgroundColor: "rgba(223,242,242,1)",
    borderWidth: 2,
    borderColor: "rgba(35,112,118,1)",
    borderRadius: 10,
    marginTop: 4,
    marginLeft: 7
  },
  scrollAreaEvents_contentContainerStyle: {
    width: 325,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  saveButton: {
    height: 38,
    width: 147,
    borderRadius: 10,
    marginTop: 18,
    marginLeft: 96
  },
  buttonBackRowColumn: {
    marginLeft: 10,
    marginRight: 18
  },
  buttonBackRowColumnFiller: {
    flex: 1
  }
});