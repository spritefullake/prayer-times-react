import './ReactotronConfig'



import React from 'react';
import { StyleSheet, View, Dimensions, AsyncStorage } from 'react-native'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { appStore, persistor } from './src/persist'

import $PrayerView from './src/Components/PrayerView/container'
import $CoordPrompt from "./src/Components/CoordPrompt/container";

export default class App extends React.Component {
  constructor(props) {
    super(props)

  }


  render() {

    //
    //<CoordPrompt />
    //using short circuit technique...
    //don't render until ready 
    //setting the outermost view {flex: 1}
    //is important so the entire app spreads
    //the length of the screen

    return (
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persistor}>

          <View style={{ flex: 1 }}>

            <View style={styles.header}>
              <$CoordPrompt />
            </View>

            <$PrayerView style={{ flex: 1 }} />


          </View>

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
