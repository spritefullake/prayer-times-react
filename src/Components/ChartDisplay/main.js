import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DateTime, Interval } from 'luxon'
import { Button, Icon } from 'react-native-elements'

import SText from '../../common/SText'

export default class ChartDisplay extends React.Component {
    render() {
        const notToday = this.props.data[this.props.index].toLocaleString(DateTime.DATE_SHORT)
            != DateTime.local().toLocaleString(DateTime.DATE_SHORT);
        return (
            <View style={style.displayStyle}>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "stretch" }}>
                    <Button

                        title={""}

                        icon={{
                            name: this.returnIcon(),

                            color: 'white'
                        }}

                        onPress={evt => {
                            //scroller is a ref to the flatlist 
                            //holding the prayer charts
                            this.props.returnToNow(this.props.scroller);

                        }}

                        buttonStyle={
                            {
                                backgroundColor: "rgb(47, 153, 18)",
                                alignSelf: "stretch", flex: 1
                            }}
                        
                        //button is invisible when disabled
                        //the button is set to be disabled 
                        //when the today slide is shown
                        disabledStyle={{
                            opacity: 0, flex: 1
                        }
                        }


                        disabled={this.props.scroller && !notToday}


                    />
                </View>


                <View style={{ flex: 3 }}>
                    <SText style={{ alignSelf: "center" }}>{this.formatCurrentChart()}</SText>
                </View>

                <View style={{ flex: 1 }} />
            </View>
        )
    }

    formatCurrentChart() {
        
        return this.props.data[this.props.index].toLocaleString(DateTime.DATE_MED)
    }

    //the arrow points towards the direction of 
    //where the today chart is
    returnIcon() {
        if (this.props.data[this.props.index] > DateTime.local()) {
            return "arrow-back"
        }
        else {
            return "arrow-forward"
        }

    }
}

const secondary = "rgba(189,252,100,0.5)"

const style = {
    displayStyle: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: secondary,
        marginLeft: 0,
        marginBottom: 0,
    },
}