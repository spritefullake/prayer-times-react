
import React from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';

import { DateTime, Interval} from 'luxon'
import getData from './data'

class Prayer extends React.Component {

    constructor(props) {
        super(props)
    }
    render() {
        const sizing = { height: this.props.height, top: this.props.top }

        return (
            <View style={[styles.prayer]}>


                <Text style={[styles.prayerText, sizing]}>{this.props.name}</Text>
                <Text style={[styles.prayerText, sizing]}>{this.props.time}</Text>

            </View>
        );
    }
}



export default class PrayerChart extends React.Component {

    constructor(props) {
        super(props)

    }

    render() {
        const gd = getData(this.props.date, this.props.coords,

            Interval.fromDateTimes(DateTime.local().startOf('day'),
                DateTime.local().endOf('day')))


        return (

            <View>
           
                <FlatList
                    style={{ flexDirection: "column" }}
                    data={this.props.date && this.props.coords ?
                        gd :
                        mockData}
                    keyExtractor={item => item.name}
                    renderItem={({ item }) =>
                        <Prayer 
                            style={{alignItems: 'center'}}
                            name={capitalize(item.name)}
                            time={item.time.toLocaleString(DateTime.TIME_SIMPLE)}
                            height={item.height}
                            top={item.top}> </Prayer>}
                />

            </View>

        );
    }

}


function capitalize(str) {
    return str.substring(0, 1).toUpperCase() + str.substring(1, str.length);
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
        alignSelf: 'center',
        padding: 10,
        //minimum height so the text shows up
        minHeight: 100,
        alignSelf: 'stretch'
    }
});
