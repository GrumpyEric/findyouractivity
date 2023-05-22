
import React from 'react'
import { Text, StyleSheet, ScrollView, View, Image } from 'react-native';


import Colors from '../constants/Colors'
import { stylesGlobal } from '../constants/StylesGlobal';

import ButtonBack from '../components/ButtonBack';
import { LoginBackHint } from '../constants/Fixtures';

const HilfeScreen = ( {navigation} ) => {
return(
  <View style={{flex: 1}}>
  <ScrollView style={[stylesGlobal.screenContainer, styles.screenContainer]} contentContainerStyle={stylesGlobal.contentContainer}>
    <Text 
      style={[stylesGlobal.ueberschriftText, {marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenItems, textAlign: 'center'}]}
      accessibilityRole="header"
      accessibilityLabel="Hilfe"
      aria-label="Hilfe"
    >
      Hilfe
    </Text>

    <Text 
      style={[stylesGlobal.standardText, {marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenItems, textAlign: 'center'}]}
      accessibilityRole="text"
      accessibilityLabel="Zum Erstellen von Markern auf die Karte drücken und gedrückt halten, um einen Marker zu setzen."
      aria-label="Zum Erstellen von Markern auf die Karte drücken und gedrückt halten, um einen Marker zu setzen."
    >
      Zum Erstellen von Markern auf die Karte drücken und gedrückt halten, um einen Marker zu setzen.
    </Text>

    <>
      <Text 
        style={[stylesGlobal.standardText, {marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenItems, textAlign: 'center'}]}
        accessibilityRole="text"
        accessibilityLabel="Das Navigations-Steuerkreuz hilft bei der Bedienung der Karte, ohne dass bestimmte Gesten benutzt werden müssen."
        aria-label="Das Navigations-Steuerkreuz hilft bei der Bedienung der Karte, ohne dass bestimmte Gesten benutzt werden müssen."
      >
        Das Navigations-Steuerkreuz hilft bei der Bedienung der Karte, ohne dass bestimmte Gesten benutzt werden müssen.
      </Text>
      <Image
        source={require('../assets/navPic.jpg')}
        style={{width: 120, height: 120, alignSelf: 'center'}}
        accessibilityRole='image'
        accessibilityLabel='Navigations-Steuerkreuz'
        aria-label='Navigations-Steuerkreuz'
        alt='Navigations-Steuerkreuz'
      />
      <Text 
        style={[stylesGlobal.ueberschriftText2, {marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenItems, textAlign: 'center'}]}
        accessibilityRole="text"
        accessibilityLabel="Das Navigations-Steuerkreuz"
        aria-label="Das Navigations-Steuerkreuz"
      >
        Das Navigations-Steuerkreuz
      </Text>
    </>

    <>
      <Text 
        style={[stylesGlobal.standardText, {marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenItems, textAlign: 'center'}]}
        accessibilityRole="text"
        accessibilityLabel={'Der Filter-Button leitet Sie in ein Menü weiter, wo sie einstellen können, welche Marker Sie sehen möchten\n' 
        + 'Der Positions-Button zeigt Ihnen Ihre genaue Position auf der Karte'
        }
        aria-label={'Der Filter-Button leitet Sie in ein Menü weiter, wo sie einstellen können, welche Marker Sie sehen möchten\n' 
        + 'Der Positions-Button zeigt Ihnen Ihre genaue Position auf der Karte'
        }
      >
        {'Der Filter-Button leitet Sie in ein Menü weiter, wo sie einstellen können, welche Marker Sie sehen möchten\n' 
        + 'Der Positions-Button zeigt Ihnen Ihre genaue Position auf der Karte'
        }
      </Text>
      
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Image
          source={require('../assets/filterPic.jpg')}
          style={{width: 80, height: 80, alignSelf: 'center'}}
          accessibilityRole='image'
          accessibilityLabel='Filter-Button'
          aria-label='Filter-Button'
          alt='Filter-Button'
        />
        <Image
          source={require('../assets/positionPic.jpg')}
          style={{width: 80, height: 80, alignSelf: 'center'}}
          accessibilityRole='image'
          accessibilityLabel='Positions-Button'
          aria-label='Positions-Button'
          alt='Positions-Button'
        />
      </View>

      <Text 
        style={[stylesGlobal.ueberschriftText2, {marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenItems, textAlign: 'center'}]}
        accessibilityRole="text"
        accessibilityLabel="Der Filter- und der Positions-Button"
        aria-label="Der Filter- und der Positions-Button"
      >
        Der Filter- und der Positions-Button
      </Text>
    </>


  </ScrollView>
    <ButtonBack
      onPress={() => navigation.goBack()}
      text={'Zurück'}
      accessibilityHint={'Zur Karte zurückgehen'}
    />
  </View>
)

}

export default HilfeScreen

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: Colors.findmyactivityBackground,
  },

  contentContainerStyle: {
    marginBottom: stylesGlobal.marginsAndPadding.paddingBetweenItems,
    flex: 1,
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    backgroundColor: Colors.findmyactivityWhite
  },

  navButtonStyle: {
    width: 150,
    height: 150,
    marginTop: 250
  }
})