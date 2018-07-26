import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DateTime, Interval } from 'luxon'

import SText from '@common/SText'
import { findAddress } from '@common/utils'

import $GeoRefresh from '../GeoRefresh/container'

import { Button, Icon } from 'react-native-elements'


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

    }


    render() {

        const ready = this.props.nextPrayerEnd && this.props.nextPrayerName && this.props.address;


        return ready && (
            <View style={[timerStyle.cont]}>


                <View style={{ flex: 2, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <View style={{ flex: 1 }} />

                    <SText style={{ flex: 3, textAlign: "center"}}>Prayer Times in {this.props.address}</SText>

                    <View style={{flex: 1, alignItems: "flex-start"}}> 
                        <$GeoRefresh/>
                    </View>
   
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
        //findTimeZone()
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
}

const timerStyle = {
    cont: {
        flexDirection: 'column',
        flex: 0.20,
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


