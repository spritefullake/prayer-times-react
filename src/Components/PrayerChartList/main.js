import React from 'react'
import { FlatList, Dimensions } from 'react-native'
import PrayerChart from './PrayerChart'

export default class PrayerChartList extends React.Component{

    state = { width: Dimensions.get('window').width };

    render(){
      
        return (
          <FlatList
          

          ref={this.props.listRef}

          style={{ flex: 1}}

          horizontal

          pagingEnabled={true}

          data={this.props.data}

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
                listType={this.props.listType}
              />
            )

          }}
        />
        )
    }
}