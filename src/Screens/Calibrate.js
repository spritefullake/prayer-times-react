import React from 'react'
import { View } from 'react-native'
import SText from '@common/SText'

export default class CalibrateScreen extends React.Component{
    render(){
        return (
            <View style={{flex: 1, alignSelf: "stretch", justifyContent: "center", alignItems: "center"}}>
                <SText>Please calibrate your compass</SText>
                <SText>Move your device in an 8 motion</SText>
            </View>
        )
    }
}