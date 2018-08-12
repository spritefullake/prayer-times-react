
import React from 'react';
import { StyleSheet, Text, View, FlatList, ScrollList, ScrollView, SectionList } from 'react-native';
import Prayer from './Prayer'
import { DateTime, Interval } from 'luxon'
import getData from '@common/data'
import { renderPrayerData } from '@common/utils'
import NowMarker from './NowMarker'


export default class PrayerChart extends React.Component {

    state = {
        listType: 'perspective',
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

        //if the listType is perspective, we will apply several stylistic differences
        //& we choose to omit the isha that extends into the specified day
        const isPerspective = this.props.listType == 'perspective';

        const rd =
            renderPrayerData({
                date: this.props.date,
                coords: this.props.coords,
                ctx: chartSpan,
                dataFunction: getData
            });

        const pData = (this.props.date && this.props.coords ? rd : mockData).map(i => {
            return {
                ...i,
                key: i.name
            }
        });


        


        return (


            <View style={[styles.chart, this.props.style]}>

                {pData.map((item,index) => {
                    //if this is the first isha listed
                    //(aka the isha that starts from the day before)
                    //and the view is NOT perspective view
                    //then we choose to omit it
                    if(item.name == "isha" && index == 0 && !isPerspective){
                        return null;
                    }

                    //maps the prayer data so 
                    //the prayers are sized 
                    //and offset accordingly
                    return (<Prayer
                        key={item.time.start}
                        name={item.name}
                        nameStyle= { isPerspective ? {textAlign: "center"} : null}
                        
                        time={isPerspective        ? 
                            formatSimple(item.time.start)
                            : `${formatSimple(item.time.start)} - ${formatSimple(item.time.end)}`}
                        timeStyle= { isPerspective ? null : {flex: 3, textAlign: 'right'}}

                        

                        height={isPerspective      ? item.height : null}
                        top=   {isPerspective      ? item.top : null}
                        style= {isPerspective      ? null : { position: 'relative', flex: 1 }}

                    />)
                })}

                {isPerspective ? <NowMarker interval={chartSpan} /> : null}



            </View>


        );
    }



}

function formatSimple(dateTime){
    return dateTime.toLocaleString(DateTime.TIME_SIMPLE);
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

