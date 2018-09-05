import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import SText from "@common/SText"
import { Button } from 'react-native-elements'

export default class CloseTrigger extends React.Component{
    render(){
        return (
            <Button
            containerStyle={{alignSelf: "stretch"}}
            onPress={this.props.closer}
            title="Close" 
            buttonStyle={{
                backgroundColor: tertiary,
                borderRadius: 0,
            }}
            color="white"

            titleStyle={{
                fontSize: 25
            }}
  
            />
        )
    }
}


const tertiary = "rgba(51, 76, 51,0.65)"