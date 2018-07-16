import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { DateTime, Interval } from 'luxon'
import SText from './common/SText'

export default class ChartDisplay extends React.Component {
    render() {
        const notToday = this.props.data[this.props.index].toLocaleString(DateTime.DATE_SHORT) 
        != DateTime.local().toLocaleString(DateTime.DATE_SHORT);
        return (
            <View style={style.displayStyle}>
               <Button

                    title="Return"
                    onPress={evt => {
                        this.props.returnToNow(this.props.scroller);     
                      
                    }}

                    style={{ alignSelf: 'flex-start', flex: 1 }}

                    disabled={this.props.scroller &&  !notToday}

                />

                <View style={{ flex: 1 }} />

                <SText style={{ flex: 2 }}>{this.formatCurrentChart()}</SText>


                <View style={{ flex: 1 }} />
            </View>
        )
    }

    formatCurrentChart() {
        return this.props.data[this.props.index].toLocaleString(DateTime.DATE_MED)
    }
}


const style = {
    displayStyle: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: "rgba(189,252,100,0.5)",
        marginLeft: 0,
        marginBottom: 0,
    },
}