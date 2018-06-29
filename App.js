import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PrayerChart from './src/Prayer'
export default class App extends React.Component {
  render() {
    return (


        <PrayerChart style={styles.chart}></PrayerChart>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  redText: {
    color: "red"
  },
  chart: {
    flex: 1, 
    alignSelf: 'stretch'
  }
});
