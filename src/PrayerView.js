import React from 'react';
import { StyleSheet, View, Dimensions, FlatList, Text } from 'react-native'
import { DateTime, Interval } from 'luxon'


import PrayerChart from './PrayerChart'
import {TickingPrayerTimer} from './TickingPrayerTimer'

import nextPrayer from './common/data'

//component holds all the prayer related components
//will be hooked into redux container
export default class PrayerView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {width: null}
  }

  render() {

    const ready = this.props.coords && this.props.date.startOf('day');

    const chartLimit = 10;

    //the array that forms the flatlist
    const _data = prayerChartList(this.props.date.startOf('day'), chartLimit);


    
    return ready && (
      <View style={this.props.style}>
        <TickingPrayerTimer/>


        <FlatList
          style={{ flex: 1 }}

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
            let index = Math.round(evt.nativeEvent.contentOffset.x/w);
    
            this.props.handleSwipe(_data[index])
          }}

   

          horizontal

          pagingEnabled={true}

          data={_data}

          keyExtractor={item => item.toLocaleString()}

          getItemLayout={(data, index) => ({
            length: this.state.width,
            offset: this.state.width * index,
            index
          })}

          //scroll to today
          initialScrollIndex={Math.floor(chartLimit / 2)}

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

    )
  }



  async componentWillMount() {


    this.props.fetchCoords()

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