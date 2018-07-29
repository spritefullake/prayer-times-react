import React from 'react';
import { StyleSheet, View } from 'react-native';

import SText from '@common/SText'

import {primary} from '@styles'

export default class Prayer extends React.Component {

    constructor(props) {
        super(props)
    }
    render() {
        const sizing = {
            height: (this.props.height * 100) + "%",
            top: (this.props.top * 100) + "%",
            position: 'absolute',
            width: '100%'
        }


        return (
            //styled so that the prayers are positioned 
            //according to height and the offset (top)

            //the text is spaced so that there is 
            //some margin towards the edges 
            //using dummy views as part of the 
            //flexbox model
            <View style={[sizing,
                styles.prayer, this.props.style,
            ]}>
                <View style={{ flex: 1 }} />
                <View style={{ flex: 9, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <SText capitalize={true} style={[styles.prayerText, this.props.nameStyle]}>{this.props.name}</SText>
              
                    <SText style={[styles.prayerText,this.props.timeStyle]}>{this.props.time}</SText>
                </View>
                <View style={{ flex: 1 }} />

            </View>


        );

    }
}


const styles = StyleSheet.create({
    prayer: {

        flexDirection: 'row',
        backgroundColor: primary,
        alignItems: 'center',
        justifyContent: 'space-around',
        alignItems: 'center',
        minHeight: '10%',
        borderTopWidth: 0.75,
        borderColor: 'white',
        
    },
    prayerText: {

        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        flex: 1,
        textAlign: 'center',
        //minimum height so the text shows up
        minHeight: '10%',


    }
});