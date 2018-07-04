import React from 'react';
import { StyleSheet, Text, View, FlatList, ScrollList } from 'react-native'

//stext is short for 
//styled text

export default class SText extends React.Component {
    render() {
        return (
        <Text style={[{fontSize: 20},this.props.style]}>{this.format()}</Text>
        )
    }

    format(){
        
        if(this.props.capitalize){
            return React.Children.map(this.props.children,capitalize)
        }
        return this.props.children
    }
}



function capitalize(str) {
    return str.substring(0, 1).toUpperCase() + str.substring(1, str.length);
}

const styles = StyleSheet.create({

})