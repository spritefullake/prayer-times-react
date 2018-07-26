import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import SText from "@common/SText"

export default class CloseTrigger extends React.Component{
    render(){
        return (
            <TouchableOpacity
            style={{ flex: 0.5, justifyContent: "center", flexDirection: "row", padding: 60, paddingHorizontal: 70}}
            onPress={this.props.closer}>

            <View style={ this.props.style }>
              <SText style={{ fontSize: 30, color: tertiary }} >Close</SText>
            </View>
          </TouchableOpacity>
        )
    }
}


const tertiary = "rgba(51, 76, 51,0.65)"