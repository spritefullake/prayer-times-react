import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { DateTime, Interval } from 'luxon'
import SText from '../../common/SText'

import { Location, Permissions } from 'expo';

export default class PrayerTimer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            now: DateTime.local(),
        }


        this.tick = () => {
            this.setState({ now: DateTime.local() }, () => {
                //only triggers when the today 
                //date's day is different than
                //the now date's date
                if (this.state.now.startOf('day') > this.props.date.startOf('day')) {
                    this.props.onDayChange()
                }
                if (this.state.now > this.props.nextPrayerEnd) {
                    this.props.rollNextPrayer();
                }
            })

        }

        this.findAddress()
        

    }


    render() {

        const ready = this.props.nextPrayerEnd && this.props.nextPrayerName && this.props.address;


        return ready && (
            <View style={[timerStyle.cont]}>
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <SText>Prayer Times in {this.props.address}</SText>
                </View>

                <View style={timerStyle.nowWrapper}>
                    <View style={timerStyle.now}>
                        <SText>{this.formatNow()}</SText>
                    </View>

                    <View style={timerStyle.until}>
                        <SText capitalize={true}>Next Prayer: {this.props.nextPrayerName}</SText>
                        <View style={{ flex: 1 }} />
                        <SText>{this.timeUntilNextPrayer()}</SText>

                    </View>
                </View>
            </View>
        ) || null

    }


    componentDidMount() {
        this.props.startTicking()
        this.timerId = setInterval(() => this.tick(), 1000)
/*
        this.findRelativeAddress().then(res => {
            this.setState({address: res});   
        })
        */

        //the arrow function is important in setInterval
        //this.timer = setInterval(() => this.tick(), 1000)
    }
    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    timeUntilNextPrayer() {
        //localize the date & humanize 
        //simply measure the interval between *start and *end
        return this.state.now.until(this.props.nextPrayerEnd).toDuration(['hours', 'minutes', 'seconds']).toFormat("hh:mm:ss")
    }

    formatNow() {
        return this.state.now.toLocaleString(DateTime.DATETIME_SHORT)
    }

    async findAddress(){
        //if the address was already 
        //reverse geocoded, there
        //is no use in using an 
        //expensive operation again
        if(this.props.address){
            //alert("ADDRESS ALREADY PRESENT")
            return;
        }

        const coords = this.props.coords;
        let res = await Location.reverseGeocodeAsync({latitude: coords[0], longitude: coords[1]});
        this.props.addressFound(res[0].city)

    
    }
}

const timerStyle = {
    cont: {
        flexDirection: 'column',
        //alignItems: 'baseline',
    },
    nowWrapper: {
        padding: 10,
        flexDirection: 'column',
    },
    now: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '5%',
    },
    until: {
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
}


