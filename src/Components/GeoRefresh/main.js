import React from 'react'
import { View, Vibration } from 'react-native'
import { Button, Icon } from 'react-native-elements'

import { GestureHandler } from 'expo'
const { LongPressGestureHandler, State } = GestureHandler;

export default class GeoRefresh extends React.Component {
    state = {
        size: 26
    }
    render() {
        return (
            <LongPressGestureHandler
                minDurationMs={800}
                onHandlerStateChange={({ nativeEvent }) => {
                    if (nativeEvent.state == State.ACTIVE) {
                        //signals to user that prompt 
                        //is going to show
                        Vibration.vibrate(500);
                        this.props.showPrompt();
                    }
                }}
            >
                <View style={{ flex: 1, alignItems: "flex-start",
                alignSelf: "stretch", justifyContent: "flex-end", minHeight: 25 }}>
                    <Icon
                  
                        type="evilicons"
                        name="refresh"

                        size={this.state.size}

                        onPress={() => {
                
                            this.props.geoRefresh();
                        }}

                    />
                </View>
            </LongPressGestureHandler>
        )
    }
}