import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import {PrayerTimer, PrayerChart} from './src/Prayer'
import {Constants, Location, Permissions} from 'expo'


export default class App extends React.Component {
  constructor(props){
    super(props)
    //timer target describes what prayer & times the 
    //prayer timer wants to 'hit' / show
    this.state = { 
      coords: null, 
      date: new Date(), 
      timerTarget: {from: new Date(), to: new Date(), nextPrayerName: 'fajr'}
    }
  }

  

  render() {

    const bridgeTimes = (data) => {
      this.setState(prevState => {
        return {...prevState,timerTarget: data}
      })
    }

    //using short circuit technique...
    //don't render until ready
    const ready = this.state.coords && this.state.date 
    return ready && (
      <View>
        <PrayerChart
        style={styles.chart} 
        coords={this.state.coords}
        date={this.state.date}
        bridge={bridgeTimes}
        ></PrayerChart>
      </View>

    )
  }

  async componentWillMount(){
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    
    const location = await Location.getCurrentPositionAsync( 
      { enableHighAccuracy: true, 
        timeout: 20000, 
        maximumAge: 1000 })

    const coords = [location.coords.latitude,location.coords.longitude]

    
    this.setState((prevState,props) => {
      return {
        coords: coords,
        date: new Date(),
        timerTarget: prevState.timerTarget
      }
    })

   
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  redText: {
    color: "red"
  },
  chart: {
    flex: 2, 
    alignSelf: 'stretch',
    height: 900
  }
});
