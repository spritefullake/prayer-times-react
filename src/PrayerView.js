import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native'
import { DateTime, Interval } from 'luxon'


import PrayerChart from './PrayerChart'
import PrayerTimer from './PrayerTimer'


//component holds all the prayer related components
//will be hooked into redux container
export default class PrayerView extends React.Component {
  constructor(props) {
    super(props)


    this.state = {
      now: DateTime.local()
    }

    this.tick = () => {
      this.setState({now: DateTime.local()}, () =>{
          if(this.state.now.startOf('day') > this.props.date.startOf('day')){
              this.rollNextDay();
          }
          if(this.state.now > this.props.nextPrayerEnd){
              this.rollNextPrayer();
          }
      })  

    }
  }

  render() {

    const ready = this.props.coords && this.props.date
    return ready && (
      <View style={this.props.style}>
        <PrayerTimer start={this.state.now} nextPrayerName={this.props.nextPrayerName} end={this.props.nextPrayerEnd} />

        <PrayerChart
          coords={this.props.coords}
          date={this.props.date.toJSDate()} />
      </View>
    )
  }

  componentDidMount() {
    this.props.startTicking()
    this.timerId = setInterval(() => this.tick(), 1000)

    //the arrow function is important in setInterval
    //this.timer = setInterval(() => this.tick(), 1000)
  }
  componentWillUnmount() {
    clearInterval(this.timerId)
  }


  async componentWillMount() {


    this.props.fetchCoords()

  }

}

