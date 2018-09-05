import './ReactotronConfig'



import React from 'react';
import { StyleSheet, View, Dimensions, AsyncStorage } from 'react-native'
import SText from '@common/SText'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { appStore, persistor } from './src/persist'

import $PrayerView from '@containers/PrayerView'
import $CoordPrompt from "@containers/CoordPrompt"
import $SurahSearch from '@containers/SurahSearch'
import $QiblaCompass from '@containers/QiblaCompass'


import { createStackNavigator } from 'react-navigation'

import { startWatchingHeading, endWatchingHeading } from '@actionCreators'

import { GestureHandler, Vibration } from 'expo'
const { TapGestureHandler, LongPressGestureHandler, State } = GestureHandler

import $HomeScreen from '@screens/Home'
import $QiblaScreen from '@screens/Qibla'
import CoordPromptScreen from '@screens/Coord'
import CalibrateScreen from '@screens/Calibrate'
import $SettingsScreen from '@screens/Settings'
import QuranWebScreen from '@screens/QuranWeb'

import { Icon } from 'react-native-elements'
import { accent1, mainHeader } from '@styles'

const RootStack = createStackNavigator({
  Home: {
    screen: $HomeScreen,
  },
  Settings: {
    screen: $SettingsScreen,
  },
  Qibla: {
    screen: $QiblaScreen,
  },
  Coord: {
    screen: CoordPromptScreen,
  },
  Calibrate: {
    screen: CalibrateScreen,
  },
  QuranWeb: {
    screen: QuranWebScreen
  }
},
  {
    initialRouteName: 'Home',
    navigationOptions: {
        headerStyle: { backgroundColor: mainHeader },
    }
  }
)

export default class App extends React.Component {

  render() {
    //Provider & PersistGate 'magically' provide 
    //the props from redux and redux-persist, respectively

    return (
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persistor}>
          <RootStack/>
        </PersistGate>
      </Provider>

    )
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  header: {
    flex: 0.1
  },
  redText: {
    color: "red"
  },


});
