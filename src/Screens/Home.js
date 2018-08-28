import React from 'react'
import { View } from 'react-native'

import $PrayerView from '@containers/PrayerView'
import $SurahSearch from '@containers/SurahSearch'
import $QiblaCompass from '@containers/QiblaCompass'

import { NavigationEvents } from 'react-navigation'

import { GestureHandler } from 'expo'

const { TapGestureHandler, State } = GestureHandler

import { Icon, Button } from 'react-native-elements'
import { accent1, mainHeader } from '@styles'
import SText from '@common/SText'

import { connect } from 'react-redux'

import { startWatchingHeading, endWatchingHeading } from '@@QiblaCompass/action-creators'


class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {

      headerRight: (
      <View style={{ flex: 3, marginRight: 10, alignSelf: "stretch", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
          <Icon name="settings" type="feather" reversed
            onPress={() => navigation.navigate('Settings')}
            size={26} />
        </View>),
    }
  }

  render() {
    const margin = 30;
    return (
      <View style={{ flex: 1 }}>
      <NavigationEvents
                onWillBlur={() => this.props.endWatching()}
                //did focus means the component has been mounted
                //so starting to watch is 100% ok!
                onDidFocus={() => this.props.startWatching()}/>
      
        <View style={{ flex: 1, marginTop: margin }}>
          <$PrayerView style={{ flex: 1 }} />
          <$SurahSearch/>
        </View>

        <TapGestureHandler
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state == State.ACTIVE) {
              this.props.navigation.navigate('Qibla',
                { coords: this.props.coords });
            }
          }}
        >
          <View style={{ position: "absolute", top: margin / 3, left: "3%" }}>

           {this.props.compassDisabled ? null : <$QiblaCompass/>}
          </View>
        </TapGestureHandler>


      </View>)
  }
}



const mapStateToProps = ({ compassDisabled, coords }) => {
  return {
    compassDisabled,
    coords
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startWatching: () => dispatch(startWatchingHeading()),
    endWatching: () => dispatch(endWatchingHeading()),
  }
}

export default $HomeScreen = connect(mapStateToProps,mapDispatchToProps)(HomeScreen)