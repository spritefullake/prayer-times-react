import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

class Prayer extends React.Component {
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


export default class PrayerChart extends React.Component {
    render() {
        return (
            /*
            <Prayer name="Fajr" time="now" height={60} top={50}>
            </Prayer>
            */
            <View>
                <FlatList
                    data={prayerData}
                    keyExtractor={item => item.name}
                    renderItem={({ item }) =>
                        <Prayer name={item.name}
                            time={item.time}
                            height={item.height}
                            top={item.top}> </Prayer>}
                />
                
            </View>

        );
    }
}

const prayerData = [
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

        alignSelf: 'stretch'
    }
});
