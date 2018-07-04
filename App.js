
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native'

import { DateTime, Interval } from 'luxon'

import CoordPrompt from './src/CoordPrompt'

import { connect, Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { rootReducer, initialState, SwipePrayerView } from './src/SwipePrayerView'

const logger = createLogger();

const appStore = createStore(rootReducer, initialState,
  applyMiddleware(thunkMiddleware, logger)
)


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

        <View style={{ flex: 1 }}>

          <View style={styles.header}>
            
          </View>
        
          <SwipePrayerView style={{flex: 1}} />
          

        </View>

        
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
    marginTop: '10%'
  },
  redText: {
    color: "red"
  },


});
