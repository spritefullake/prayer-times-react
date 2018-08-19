import React from 'react'
import { View } from 'react-native'

import $PrayerView from '@containers/PrayerView'
import $SurahSearch from '@containers/SurahSearch'
import $QiblaCompass from '@containers/QiblaCompass'

import { NavigationEvents } from 'react-navigation'

import { GestureHandler } from 'expo'

const { TapGestureHandler, State } = GestureHandler


export default class HomeScreen extends React.Component {
    compass = null;
    render() {
      const margin = 30;
      return (
        <View style={{ flex: 1 }}>
        <NavigationEvents 
          onWillBlur={() => this.compass.props.endWatching()}
          //did focus means the component has been mounted
          //so starting to watch is 100% ok!
          onDidFocus={() => this.compass.props.startWatching()}/>
          <View style={{ flex: 1, marginTop: margin }}>
            <$PrayerView style={{ flex: 1 }} />
            <$SurahSearch />
          </View>
  
          <TapGestureHandler 
             onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state == State.ACTIVE) {
                  this.props.navigation.navigate('Qibla',
                  { coords: this.compass.props.coords });
              }
          }}
          >
            <View style={{ position: "absolute", top: margin / 3, left: "3%" }}>
              
              <$QiblaCompass 
              //ensure the ref has a wrapped instance since this is a connected component
              //since we used withNavigation on this connected component, onRef is required
              //instead of ref; and since the connected component wraps the instance,
              //use #getWrappedInstance on the ref
              onRef={ref => ref ? this.compass = ref.getWrappedInstance() : null}/>
            </View>
          </TapGestureHandler>
  
  
        </View>)
    }
  }