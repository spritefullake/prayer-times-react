import React from 'react';
import { StyleSheet, View, Dimensions, FlatList, Text } from 'react-native'
import { DateTime, Interval } from 'luxon'


import PrayerChart from './PrayerChart'

import $PrayerTimer from '../PrayerTimer/container'
import $ChartDisplay from '../ChartDisplay/container'

//component holds all the prayer related components
//will be hooked into redux container
export default class PrayerView extends React.Component {
  constructor(props) {
    super(props)

    this.state = { width: null, date: DateTime.local()}

    this.chartsFlatList = React.createRef();

    this.props.fetchCoords();
    this.props.fetchAddress();
  }

  rollNextDay(){
    this.setState({date: DateTime.local()})
  }

  render() {

    const ready = this.props.coords && this.state.date

    //the array that forms the flatlist
    const _data = prayerChartList(this.state.date, this.props.limit)
    

    return ready && (
      <View style={this.props.style}>
        <$PrayerTimer
          onDayChange={this.rollNextDay}
          date={this.state.date}
        />
         <$ChartDisplay
         //using _data instead of just the flatlist ref
         //prevents the component from relying purely on
         //the ref for data in render; instead, the data
         //can be waited on from the parent rather than
         //introducing extreme sibling dependency
        data={_data} scroller={this.chartsFlatList} /> 

        <FlatList
          ref={ref => this.chartsFlatList = ref}

          style={{ flex: 1 }}

          horizontal

          pagingEnabled={true}

          data={_data}

          onLayout={(evt) => {
            //getting the width of the flatlist view
            //allows us to set the width of the PrayerChart
            //to be fully the width of the flatlist view
            this.setState({ width: Math.round(evt.nativeEvent.layout.width) })
          }}

          onMomentumScrollEnd={evt => {

            let w = evt.nativeEvent.layoutMeasurement.width;
            //the index is found by dividing the offset from the left
            //by the width of each chart (predetermined)
            let index = Math.round(evt.nativeEvent.contentOffset.x / w);

            this.props.handleSwipe(index)
          }}


          keyExtractor={item => item.toLocaleString()}

          getItemLayout={(data, index) => ({
            length: this.state.width,
            offset: this.state.width * index,
            index
          })}

          //scroll to today
          initialScrollIndex={this.props.index}

          renderItem={({ item }) => {
            return (
              <PrayerChart
                style={{ width: this.state.width }}
                coords={this.props.coords}
                date={item}
              />
            )

          }}
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