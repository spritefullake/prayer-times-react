const PrayerTimes  = require('prayer-times')
import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import { Time, OrderedTimeBlock, PrayerTime, Conversions } from 'time-classes';

import { format, formatDistance, formatDistanceStrict, getTime } from "date-fns/esm"
import { DateTime, Interval, Duration } from 'luxon'


class Prayer extends React.Component {

    constructor(props){
        super(props)
    }
    render() {
        const sizing = { height: this.props.height, top: this.props.top }
        
        return (
            <View style={styles.prayer}>
             
         
                <Text style={[styles.prayerText, sizing]}>{this.props.name}</Text>
                <Text style={[styles.prayerText, sizing]}>{this.props.time}</Text>

            </View>
        );
    }
}

export class PrayerTimer extends React.Component{
    render(){
        if(this.props.to && this.props.from){
            return(
        <View style={timerStyle.cont}>

            <View>
                <Text>{this.formatNow()}</Text>
            </View>

            <View>
                <Text>Next Prayer: {this.props.nextPrayerName}</Text>
                <Text>{this.timeUntilNextPrayer()}</Text>
            </View>
        </View>
            )
        }

        return null;
    }

    timeUntilNextPrayer(){
         //localize the date & humanize using date-fns
      return formatDistanceStrict(this.props.to, this.props.from, {
        includeSeconds: true,
        addSuffix: true
      })
    }

    formatNow(){
        return format(new Date(), "EEEE MMMM dd")
    }
}

const timerStyle = {
    cont: {
        flexDirection: 'column',
    }
}

export class PrayerChart extends React.Component {

    constructor(props){
        super(props)
        
    }

    render() {
        const gd = getData(this.props.date,this.props.coords,

            Interval.fromDateTimes(DateTime.local().startOf('day'), 
            DateTime.local().endOf('day')))


        return (

            <View>
                <FlatList
                style={{flexDirection: "column"}}
                    data={this.props.date && this.props.coords ?
                        gd :
                        mockData}
                    keyExtractor={item => item.name}
                    renderItem={({ item }) =>
                        <Prayer name={capitalize(item.name)}
                            time={item.time.toLocaleString(DateTime.TIME_SIMPLE)}
                            height={item.height}
                            top={item.top}> </Prayer>}
                />
            </View>

        );
    }


    componentDidMount(){
        this.props.bridge({from: new Date(),...(this.nextPrayer())})
    }

   nextPrayer() {
       const data = getData(this.props.date,this.props.coords,
            
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
 
       const nextPrayerTime = times.filter(i =>i == min)[0];
       return {
         name: names[times.indexOf(nextPrayerTime)],
         to: nextPrayerTime
       };
 
     }

     
}


function localeTime(time){
    return DateTime.fromJSDate(time).toLocaleString(DateTime.TIME_SIMPLE)
}
function capitalize(str){
    return str.substring(0,1).toUpperCase() + str.substring(1,str.length);
}
function processPrayers(date, coords) {

    //important!
    //format the times in 24 hours format for this code to work correctly!
    let times = (new PrayerTimes()).getTimes(date, coords,'auto','auto','24h');
    
    /*
    ORDER in this array is important because some prayers
    begin when other ones end
    
    USED for processing & showing functions
    */
    const prayers = ["fajr", "dhuhr", "asr", "maghrib", "isha"];
    /* d will be used to recombine
    with the time of the prayer
    to give the start and end dates for
    new time objects that will represent
    the prayer time periods
    
    #toDateString only gives us as
    specific as the day, so no hours or seconds
    */
  

    /*Turn each prayer into a blocked time period
    beginning at the start of the prayer time and
    ending at the end of the prayer time.
    
    Implmented using the Time class which will later
    be converted into an on-screen representation*/
    return (

        prayers
            //grab the prayer times
            .map(prayer => times[prayer])
            //create the Time objects
            .map((time, index, arr) => {
                let nextTime;
                let todayStart = DateTime.local().startOf('day');
                /* the next times will be in the format of javascript date objects */
                if (time == times["fajr"]) {
                    //fajr ends at sunrise
                    const sunrise = times["sunrise"]
                    //substrings work because the 
                    //prayer times module returns the times
                    //in 24 hour time; ex: 04:23
                    //so the length is always fixed
                    nextTime = todayStart.plus({
                        hours: +sunrise.substring(0,2), 
                        minutes: +sunrise.substring(3,5)})
                }
                else if (time == times["isha"]) {
                    //isha ends when fajr begins

                    
                    const fajrTime = (new PrayerTimes())
                    .getTimes(new Date(todayStart.plus({days: 1}).toISO()), coords,'auto','auto','24h')["fajr"]
                    //similar substrings approach as above
                    nextTime = todayStart.plus({
                        days: 1,
                        hours: +fajrTime.substring(0,2), 
                        minutes: +fajrTime.substring(3,5)})
                }
                else {
                    let following = arr[index + 1]
                    nextTime = todayStart.plus({
                        hours: +following.substring(0,2),
                        minutes: +following.substring(3,5)
                    })
                    
                }
                
                let startTime = todayStart.plus({
                    hours: +time.substring(0,2),
                    minutes: +time.substring(3,5)
                })
               
                let interval = Interval.fromDateTimes(startTime , nextTime)

                
                interval.name = prayers[index]

                return interval
            })

    );
}

function getData(date,coords,ctx){
    //ctx is a luxon interval
    const data = processPrayers(date,coords)


    //mapping intervals; remember we tacked  
    //on the name property in #processPrayers
    const names = data.map(invl => invl.name)


    const tops = data.map(invl => {
        const total = ctx.length('seconds')
        
        //get the offset of invl from ctx
        const offset = ctx.start.diff(invl.start).as('seconds')
        
        // offset/total gives the percent offset
        // multiplying by window height gives us non-percent units
        
        
        return Math.abs(offset/total) * Dimensions.get('window').height / 10
    })
    
    // heights are given first as what percent one interval is of the ctx
    // and then the heights are converted to non-percent units
    const heights = data.map(invl => Math.abs(invl.length('seconds')/ctx.length('seconds')) * Dimensions.get('window').height)

    //let lastIndex = data.length - 1;
    //heights[lastIndex] = ishaShorten(tops[lastIndex], heights[lastIndex])

    const tidy = [];

    for (let i = 0; i < data.length; i++) {
        tidy.push({
            name: names[i],
            time: data[i].start,
            top: Math.round(tops[i]),
            height: Math.round(heights[i])
        })
    }
    return tidy;
}


//calculation helper
function ishaShorten(offset, height) {
    /* shorten the height of isha since it often goes offscreen */
    while (offset + height >= 100) {
        height -= 0.01;
    }
    return height;
}

const mockData = [
    {
        name: "Fajr",
        height: 100,
        top: 50,
        time: "Now & Then"
    }
]
const bgc = "rgb(189,252,100)"
const styles = StyleSheet.create({
    prayer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    prayerText: {
        flex: 1,
        backgroundColor: bgc,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        //minimum height so the text shows up
        minHeight: 100,
        alignSelf: 'stretch'
    }
});
