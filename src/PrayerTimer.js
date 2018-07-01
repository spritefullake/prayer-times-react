import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { DateTime } from 'luxon'

export default class PrayerTimer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        const ready = this.props.interval && this.props.nextPrayerName;


        return ready && (
            <View style={timerStyle.cont}>

                <View style={timerStyle.now}>
                    <Text>{this.formatNow()}</Text>
                </View>

                <View style={timerStyle.until}>
                    <Text>Next Prayer: {this.props.nextPrayerName}</Text>
                    <Text>{this.timeUntilNextPrayer()}</Text>
                </View>
            </View>
        )

    }


    timeUntilNextPrayer() {
        //localize the date & humanize 
        return this.props.interval.toDuration(['hours', 'minutes', 'seconds']).toFormat("hh:mm:ss")
    }

    formatNow() {
        return this.props.interval.start.toLocaleString(DateTime.TIME_SIMPLE)
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