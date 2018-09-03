import React from 'react'
import { Icon } from 'react-native-elements'
import { View, Modal, WebView } from 'react-native'
import { GestureHandler, BlurView } from "expo"
import NavArrows from "../NavArrows/main"

const { PanGestureHandler } = GestureHandler;

export default class SurahSearch extends React.Component {

    render() {
        return (
            <View>
                <PanGestureHandler
                    onGestureEvent={() => this.props.show()}

                >
                    <BlurView

                        tint="light"
                        intensity={5}


                        style={{
                            
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            alignSelf: "stretch",
                        }}>
                        <Icon name="caret-up" type="font-awesome" color="black" />
                    </BlurView>
                </PanGestureHandler>
            </View>
        )
    }
}