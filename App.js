import './ReactotronConfig'
import Reactotron from 'reactotron-react-native'


import React from 'react';

import { StyleSheet, View, Dimensions, AsyncStorage } from 'react-native'

import { ConnectedCoordPrompt } from "./src/Components/CoordPrompt/ConnectedCoordPrompt";

import { connect, Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { SwipePrayerView } from './src/Components/PrayerView/SwipePrayerView'


import {rootReducer, } from './src/reducers'


import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import { persistStore, persistReducer, createTransform, persistCombineReducers } from 'redux-persist'
// defaults to localStorage for web and AsyncStorage for react-native

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { PersistGate } from 'redux-persist/integration/react'

import createSecureStore from "redux-persist-expo-securestore";
import {SecureStore} from 'expo'

const initialState =  ({
  coords: null,
  //the index of the
  //chart currently displayed
  index: 5,
    //the number of charts 
  //to be rendered initially 
  limit: 10,

  address: null,
});

const persistConfig = {
  key: 'root',
  //using securestorage becuase
  //there is a bug with AsyncStorage
  storage: createSecureStore(),
  stateReconciler: autoMergeLevel2,
  debug: true,
};

const pPreducer = persistReducer(persistConfig, rootReducer)


const logger = createLogger();
const appStore = Reactotron.createStore(pPreducer, initialState,
  applyMiddleware(thunkMiddleware, logger)
)
const persistor = persistStore(appStore)


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
              <ConnectedCoordPrompt />
            </View>

            <SwipePrayerView style={{ flex: 1 }} />


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
