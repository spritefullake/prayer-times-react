
import React from 'react';
import { StyleSheet, Text, View, FlatList, ScrollList, ScrollView, SectionList } from 'react-native';
import Prayer from './Prayer'
import { DateTime, Interval } from 'luxon'
import getData from './data'
import SText from './SText'
import {getSizing} from './utils'

export default class NowMarker extends React.Component{
    render(){
        //represents a small 10 minute window 
        //around the current time
        //to show the position of now relative
        //to the prayers
        const nowData = [{
            time: Interval.fromDateTimes(DateTime.local().minus({minutes: 5}),
            DateTime.local().plus({minutes: 5}))
        }]
        const nowSizing = getSizing(nowData,this.props.interval)

        const nowSize = {
            top: nowSizing.tops[0] * 100 + "%",
            height: nowSizing.heights[0] * 100 + "%"
        };

        //if the interval is not spanning today, hide the NowMarker
        const ready = this.props.interval.start.startOf('day').toLocaleString(DateTime.DATETIME_SHORT) == DateTime.local().startOf('day').toLocaleString(DateTime.DATETIME_SHORT) 
        ? true : null;

        return ready && (
            <View style={{...nowSize,backgroundColor: "black", position: 'absolute', width: '10%'}}/>
        )
    }
}