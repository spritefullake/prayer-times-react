
import React from 'react';
import { StyleSheet, Text, View, FlatList, ScrollList, ScrollView, SectionList } from 'react-native';
import Prayer from './Prayer'
import { DateTime, Interval } from 'luxon'
import getData from './data'
import SText from './SText'




export default class PrayerChart extends React.Component {

    constructor(props) {
        super(props)

    }

    render() {

        //find the end time of the isha prayer
        //so we end the chart right where the last prayer of
        //the group of prayers starting at the day ends
        const ishaEnd = getData(this.props.date, this.props.coords).filter(i => i.name == "isha").map(i => i.time.end)

        const intvl = Interval.fromDateTimes(DateTime.local().startOf('day'),
            ...ishaEnd
        )

        const rd = this.renderPrayerData(intvl)

        const pData = (this.props.date && this.props.coords ? rd : mockData).map(i => {
            return {
                ...i,
                key: i.name
            }
        })

        return (


            <View style={[styles.chart, this.props.style]}>



                {pData.map(item => {
                    return (<Prayer
                        key={item.key}
                        name={item.name}
                        time={item.time.start.toLocaleString(DateTime.TIME_SIMPLE)}
                        height={item.height}
                        top={item.top} />)
                })}


            </View>


        );
    }

    //take the prayer data 
    //and actually calculate 
    //the offsets and the
    //heights for the 
    //individual prayers
    //represented onscreen
    renderPrayerData(ctx) {
        //ctx is a luxon interval
        const data = getData(this.props.date, this.props.coords)

        //choose how many decimal places we will
        //round to by setting the # of zeros after 1

        //more places means more precision
        //with respect to rendering 
        const decPlaces = 1000

        const tops = data.map(i => i.time).map(invl => {
            const total = ctx.length('seconds');
            //get the offset of invl from ctx
            const offset = ctx.start.diff(invl.start).as('seconds');
            // offset/total gives the percent offset
            // multiplying by window height gives us non-percent units
            return Math.round(Math.abs(offset / total) * decPlaces) / decPlaces;
        });
        // heights are given first as what percent one interval is of the ctx
        // and then the heights are converted to non-percent units
        const heights = data.map(i => i.time).map(invl => {
            return Math.round(Math.abs(invl.length('milliseconds') / ctx.length('milliseconds')) * decPlaces) / decPlaces
        });

        return data.map((i, index) => {
            return {
                ...i,
                top: tops[index],
                height: heights[index]
            }
        })

    }

}


const mockData = [
    {
        name: "Fajr",
        height: 100,
        top: 50,
        time: "Now & Then"
    }
]

const styles = StyleSheet.create({
    chart: {

        alignSelf: 'stretch',
        flex: 1

    }
})