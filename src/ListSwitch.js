import React from 'react';
import { Button } from 'react-native'


export default class ListSwitch extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            viewType: "perspective"
        }
    }
    render(){
        return (
                <Button
                title={this.state.viewType}
                onPress={this.switchViewType}
                />
        )
    }

    switchViewType(){
        if(this.state.viewType == "perspective"){
            this.setState({
                viewType: "list"
            })
        }
    }
}