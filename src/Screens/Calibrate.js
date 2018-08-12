import React from 'react'
import { View } from 'react-native'
import SText from '@common/SText'

export default class CalibrateScreen extends React.Component{
    render(){
        return (
            <View style={{flex: 1, alignSelf: "stretch", justifyContent: "center", alignItems: "center"}}>
                <SText>Please calibrate your compass</SText>
                <SText>Move your device in an 8 motion</SText>
                <SText>Current Accuracy: {this.relativeAccuracy()}</SText>
            </View>
        )
    }

    relativeAccuracy(){
        switch(this.props.navigation.getParam('accuracy',-1)){
            case 0: 
                return "poor";
            case 1:
                return "subpar";
            case 2: 
                return "fair";
            case 3: 
                return "good"
            default:
                return "loading"
        }
            
    }
}