import React from 'react'
import { Icon } from 'react-native-elements'
import { View, Modal, WebView } from 'react-native'
import { GestureHandler, BlurView } from "expo"
import NavArrows from "../NavArrows/main"

const { PanGestureHandler } = GestureHandler;

export default class SurahSearch extends React.Component {

    state = {
        stack: [],
    };

    webRef = React.createRef();

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
                            position: "absolute",
                            width: "100%",
                            bottom: 0,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            alignSelf: "stretch",
                        }}>
                        <Icon name="caret-up" type="font-awesome" color="black" />
                    </BlurView>
                </PanGestureHandler>

                <Modal onRequestClose={() => {
                    this.props.hide();
                }}

                    visible={this.props.quranViewVisible}
                    animationType="slide"
                >



                    <BlurView

                        tint="light"
                        intensity={5}


                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            alignSelf: "stretch",
                            paddingLeft: 25,
                            flex: 0.065,
                        }}>
                        <Icon onPress={() => this.props.hide()}
                            type="font-awesome" name="close" color="black" />
                        <View style={{ flex: 3 }} />
                        <NavArrows

                            onBackward={() => {
                                this.webRef.goBack();
                            }}
                            onForward={() => {
                                this.webRef.goForward();
                            }}
                        />
                    </BlurView>






                    <WebView
                        //since we've asked for geolocation
                        //permission already in the app,
                        //allow geolocation by the site
                        geolocationEnabled={true}

                        ref={ref => this.webRef = ref}


                        source={{
                            uri: this.props.defaultURL
                        }}



                    />



                </Modal>
            </View>
        )
    }
}