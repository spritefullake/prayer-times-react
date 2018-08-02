import React from 'react'
import { View } from 'react-native'
import { Icon } from 'react-native-elements'

export default class NavArrows extends React.Component{


    render(){

        const _size = 12;

        return (
            <View 
            style={[{flexDirection: "row", justifyContent: "space-between"},this.props.style]}
            > 
                <Icon 
                name="arrow-left" type="font-awesome"
                reverse={true}
                color="#2ca4ab"
                size={_size}
                onPress={evt => this.props.onBackward(evt)}/>
                <Icon 
                name="arrow-right" type="font-awesome"
                reverse={true}
                size={_size}
                color="#2ca4ab"
                onPress={evt => this.props.onForward(evt)}/>
            </View>
        )
    }
}