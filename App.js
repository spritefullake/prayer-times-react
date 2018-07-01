
import React from 'react';
import { StyleSheet, View } from 'react-native'
import PrayerChart from './src/Prayer'
import PrayerTimer from './src/PrayerTimer'
import { Location, Permissions } from 'expo'
import { DateTime, Interval } from 'luxon'
import getData from './src/data'
export default class App extends React.Component {
  constructor(props) {
    super(props)



    //timer target describes what prayer & times the 
    //prayer timer wants to 'hit' / show
    this.state = {
      coords: null,//passed to the PrayerChart
      interval: Interval
        .fromDateTimes(DateTime.local(),
          DateTime.local().plus({ days: 1 })),//passed to both children
    }



    this.tick = () => {

      this.setState(prevState => {

        return {
          ...prevState,
          interval: Interval.fromDateTimes(DateTime.local(), prevState.interval.end),

        }
      })


    }
  }



  componentDidMount() {
    //the arrow function is important in setInterval
    this.timer = setInterval(() => this.tick(), 1000)
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {

    

    //using short circuit technique...
    //don't render until ready
    const ready = this.state.coords && this.state.interval
    return ready && (
      <View>
        <View style={styles.header}></View>
        <PrayerTimer {...this.nextPrayer()} />
        <View>
          <PrayerChart

            style={styles.chart}
            coords={this.state.coords}
            date={this.state.interval.start.toJSDate()}
          ></PrayerChart>
        </View>
      </View>

    )
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)

    const location = await Location.getCurrentPositionAsync(
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      })

    const coords = [location.coords.latitude, location.coords.longitude]


    this.setState((prevState, props) => {
      return {
        ...prevState,
        coords: coords,
      }
    })


  }


  nextPrayer() {
    const data = getData(this.state.interval.start.toJSDate(), this.state.coords,

      Interval.fromDateTimes(DateTime.local().startOf('day'),
        DateTime.local().endOf('day')))

    /// get the prayer that comes next 
    let names = data.map(i => i.name).concat(["fajr"]); //gotta add next day fajr
    let times = data.map(i => {
      return i.time;
    }).concat(
      //add the next day's fajr time
      data.filter(i => i.name == "isha").map(i => i.time.end)
    );

    //find the smallest time after now
    //DateTime.local() is in essence == to (new Date())
    let min = Math.min(...times.filter(i => i >= DateTime.local()));

    const nextPrayerTime = times.filter(i => i == min)[0];
    return {
      nextPrayerName: names[times.indexOf(nextPrayerTime)],
      interval: DateTime.local().until(nextPrayerTime)
    };

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
  chart: {
    flex: 1,
    alignSelf: 'stretch',
    height: 900
  }
});
