import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DateTime } from 'luxon'

import SText from './SText'

export default class PrayerTimer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        const ready = this.props.interval && this.props.nextPrayerName;


        return ready && (
            <View style={[timerStyle.cont, this.props.style]}>

                <View style={timerStyle.now}>
                    <SText>{this.formatNow()}</SText>
                </View>

                <View style={timerStyle.until}>
                    <SText capitalize={true}>Next Prayer: {this.props.nextPrayerName}</SText>
                    <SText>{this.timeUntilNextPrayer()}</SText>
                </View>
            </View>
        )

    }


    timeUntilNextPrayer() {
        //localize the date & humanize 
        return this.props.interval.toDuration(['hours', 'minutes', 'seconds']).toFormat("hh:mm:ss")
    }

    formatNow() {
        return this.props.interval.start.toLocaleString(DateTime.DATETIME_SHORT)
    }
}

const timerStyle = {
    cont: {
        flexDirection: 'column',
    },
    now: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '5%'
    },
    until: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
}