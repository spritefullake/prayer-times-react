import React from 'react';
import { Button } from 'react-native-elements'


export default class ListSwitch extends React.Component{

    render(){
        return (
                <Button
                title={this.props.listType}
                onPress={this.props.switchListType.bind(null,this.props.listType)}
                />
        )
    }
}