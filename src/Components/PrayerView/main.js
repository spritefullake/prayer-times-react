import React from 'react';
import { StyleSheet, View, Dimensions, FlatList, Text } from 'react-native'
import { DateTime, Interval } from 'luxon'


import $PrayerTimer from '@containers/PrayerTimer'
import $ChartDisplay from '@containers/ChartDisplay'
import $ListSwitch from '@containers/ListSwitch'
import $PrayerChartList from '@containers/PrayerChartList'
import $LocationBar from '@containers/LocationBar'

//component holds all the prayer related components
//will be hooked into redux container
export default class PrayerView extends React.Component {
  constructor(props) {
    super(props)

    this.state = { date: DateTime.local() }

    this.chartsFlatList = React.createRef();

    this.props.fetchCoords();
    this.props.fetchAddress();
  }

  rollNextDay() {
    this.setState({ date: DateTime.local() })
  }

  render() {

    const ready = this.props.coords && this.state.date

    //the array that forms the flatlist
    const _data = prayerChartList(this.state.date, this.props.limit)

    return ready && (
      <View style={this.props.style}>
       
        <$LocationBar/>
        <$PrayerTimer
          onDayChange={this.rollNextDay}
          date={this.state.date}
        />
         <$ListSwitch />
        <$ChartDisplay
          //using _data instead of just the flatlist ref
          //prevents the component from relying purely on
          //the ref for data in render; instead, the data
          //can be waited on from the parent rather than
          //introducing extreme sibling dependency
          data={_data} scroller={this.chartsFlatList} />
   
       
     
        <$PrayerChartList
          listRef={ref => this.chartsFlatList = ref} data={_data}
        />
     
      </View>

    ) || null
  }


}

function prayerChartList(date = DateTime.local(), limit = 10) {
  let res = [];
  limit = Math.floor(limit / 2);

  for (let i = -limit; i < limit; i++) {
    res.push(
      date.plus({ days: i })
    );
  }

  return res
}