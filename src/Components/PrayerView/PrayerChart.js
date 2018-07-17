
import React from 'react';
import { StyleSheet, Text, View, FlatList, ScrollList, ScrollView, SectionList } from 'react-native';
import Prayer from './Prayer'
import { DateTime, Interval } from 'luxon'
import getData from '../../common/data'
import { getSizing } from '../../common/utils'
import NowMarker from './NowMarker'


export default class PrayerChart extends React.Component {

    constructor(props) {
        super(props)
    }

 
    render() {



        //find the end time of the isha prayer
        //so we end the chart right where the last prayer of
        //the group of prayers starting at the day ends
        const ishaEnd = getData(this.props.date.toJSDate(), this.props.coords)
            .filter(i => i.name == "isha")
            .map(i => i.time.end);

        const chartSpan = Interval.fromDateTimes(this.props.date.startOf('day'),
            ...ishaEnd
        )


        const rd = this.renderPrayerData(chartSpan)

        const pData = (this.props.date && this.props.coords ? rd : mockData).map(i => {
            return {
                ...i,
                key: i.name
            }
        })


        return (


            <View style={[styles.chart, this.props.style]}>

                {pData.map(item => {
                    //maps the prayer data so 
                    //the prayers are sized 
                    //and offset accordingly
                    return (<Prayer
                        key={item.time.start}
                        name={item.name}
                        time={item.time.start.toLocaleString(DateTime.TIME_SIMPLE)}
                        height={item.height}
                        top={item.top} />)
                })}

                <NowMarker interval={chartSpan} />



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
        let data = getData(this.props.date.toJSDate(), this.props.coords)

        //orepending the isha that ends at fajr 
        //during the same day (it actually started 
        //on the previous day but extends into the next day)

        data = [{
            name: "isha",
            time: Interval.fromDateTimes(
                this.props.date.startOf('day'),
                ...data.filter(i => i.name == "fajr").map(i => i.time.end)
            )
        }].concat(data);

        //choose how many decimal places we will
        //round to by setting the # of zeros after 1
        const decPlaces = 1000;
        //more places means more precision
        //with respect to rendering 
        const { tops, heights } = getSizing(data, ctx, decPlaces);


        data[0].time = Interval.fromDateTimes(...getData(this.props.date.minus({ days: 1 }).toJSDate(), this.props.coords)
        .filter(i => i.name == "isha")
        .map(i => i.time.start),
    data[1].time.start
    )

        return data.map((i, index, arr) => {


/*

            if (i.name == "isha" && i.time.end == arr.filter(i => i.name = "fajr")
        .map(i => i.time.start)[0] ) {
                //patching in the starting time
                //for the isha that started the
                //previous day by changing the 
                //time property after the heights
                //have been calculated
                const revisedIshaTime = Interval.fromDateTimes(
                    ...getData(this.props.date.minus({ days: 1 }).toJSDate(), this.props.coords)
                        .filter(i => i.name == "isha")
                        .map(i => i.time.start),
                    ...data
                        .filter(i => i.name == "isha" && i.time.abutsStart(
                            ...arr.filter(i => i.name == "fajr").map(i => i.time)
                        ))
                        .map(i => i.time.end)
                );
                console.log("ISHA TIME CHASNE")
                i.time = revisedIshaTime;
            }
            */


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

