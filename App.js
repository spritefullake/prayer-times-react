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

import { SearchBar } from 'react-native-elements'
export default class App extends React.Component {
  render() {

    //
    //<CoordPrompt />
    //using short circuit technique...
    //don't render until ready 
    //setting the outermost view {flex: 1}
    //is important so the entire app spreads
    //the length of the screen

    //Provider & PersistGate 'magically' provide 
    //the props from redux and redux-persist, respectively

    return (
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persistor}>

          <View style={{ flex: 1, marginTop: 60 }}>


            <$CoordPrompt />


            <$PrayerView style={{ flex: 1 }} />
            
            
            
            
            <$SurahSearch/>

            

          </View>

          <$QiblaCompass style={{ position: "absolute", top: 30, left: "3%"}}/>

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
