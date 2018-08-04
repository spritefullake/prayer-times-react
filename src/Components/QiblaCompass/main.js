import React from 'react'
import { Magnetometer, Location } from 'expo'
import SText from '@common/SText'
import { View } from 'react-native'
import { ableToLocate } from '@common/utils'
import  { findQiblaBearing } from './utils'
import { timeInterval } from '../../../node_modules/rxjs/operator/timeInterval';
export default class QiblaCompass extends React.Component{
    constructor(props){
        super(props);

        ableToLocate().then(async () => {
            Location.watchHeadingAsync(res => {
                this.setState({heading: res.trueHeading, accuracy: res.accuracy})
            });
        })
    }
    state = {
        heading: null,
        accuracy: null,
    }

    prettyBearing(){
        //since findQiblaBearing returns a North of East bearing
        //we need to rotate it to turn it into a East of North bearing
        return 90 - (findQiblaBearing(this.props.coords) * 180 / Math.PI + 90);
    }

    render(){
        const ready = (this.state.heading && this.state.accuracy && this.props.coords);
        return  ready && (
            <View>
                <SText>Heading data accuracy {this.state.accuracy}</SText>
                <SText>heading: {Math.round(this.state.heading)} </SText>
                <SText>Qibla bearing: {this.prettyBearing()} </SText>
            
            </View>
        )
    }
}