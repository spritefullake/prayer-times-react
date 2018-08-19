import React from 'react'
import { Magnetometer, Location, GestureHandler } from 'expo'
import SText from '@common/SText'
import { View, Image, Vibration } from 'react-native'
import { ableToLocate } from '@common/utils'
import { findQiblaBearing, prettyBearing } from './utils'
import { secondary, accent1, heading1 } from '@styles'

const { TapGestureHandlerm, LongPressGestureHandler, State } = GestureHandler;


export default class QiblaCompass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inaccurate: false
        }

        this.props.startWatching();
        this.checkAccuracy();


    }


    render() {
        const bearing = findQiblaBearing(this.props.coords);
        const pretty = Math.round(prettyBearing(bearing) * 100) / 100 - 65 //idk why this offset of 65 is needed;
        const heading = Math.round(this.props.heading);

        //degree range within which the qibla compass
        //will vibrate to indicate qibla direction has 
        //been reached
        const tolerance = 3;
        Math.abs(heading - pretty) <= tolerance ? Vibration.vibrate(500) : null;

        const ready = (this.props.heading && this.props.accuracy && this.props.coords);

        const scaling = this.props.fullSize ? { scale: 4 } : { scale: 1 };

        //the compass background dimensions
        const width = 90.5 * 0.75 * scaling.scale, height = 97 * 0.75 * scaling.scale;
        const { background, pointer, needle } = styles(width, height);


        //rotate the needle to the Qibla bearing
        //pretty - heading means the qibla bearing moves
        //as the heading changes but can also line up with 
        //the direction the device is pointed in!

        //if the compass isn't calibrated, notify the user by styling
        const warning = this.state.inaccurate ? { backgroundColor: "red", borderRadius: 5 }
            : { backgroundColor: accent1, borderRadius: 5 }

        return ready && (
            <LongPressGestureHandler
                onHandlerStateChange={this.props.showCalibrate}
            >
                <View>

                    <View style={[{ flexDirection: "row", justifyContent: "center", alignItems: "center" }, warning]}>
                        <View style={{ alignSelf: "center", height, width }}>
                            <Image style={{ ...pointer }}
                                source={require("@images/compass_pointer.png")} />

                            <Image
                                style={{ ...background, transform: [{ rotate: heading + "deg" }, scaling] }}
                                source={require("@images/compass_background.png")} />
                            <Image
                                style={{ ...needle, transform: [{ rotate: pretty - heading + "deg" }, scaling] }}
                                source={require("@images/compass_needle.png")} />
                        </View>

                    </View>
                </View>

            </LongPressGestureHandler>


        )
    }

    componentWillUnmount() {
        this.props.endWatching();
    }

    //continuously update the compass to indicate (in)accuracy
    checkAccuracy() {
        setInterval(() => {
            if (this.props.accuracy < 3) {
                this.setState({ inaccurate: true })
            }
            else {
                this.setState({ inaccurate: false })
            }
        }, 3000);
    }
}


const styles = (width, height) => {
    const bgWidth = bgHeight = 80 * 0.75;

    const needleWidth = 10.4 * 0.75, needleHeight = 48.5 * 0.75;

    return ({
        pointer: {
            width,
            height,
        },
        background: {
            position: "absolute",
            width: bgWidth,
            height: bgHeight,
            left: (width - bgWidth) / 2,
            top: (height - bgHeight) / 2 + (height - width) / 2,

        },
        //the needle starts aligned
        //straight along the north-south line
        needle: {
            position: "absolute",
            height: needleHeight,
            width: needleWidth,
            left: width / 2 - needleWidth / 2,
            bottom: height / 2 - needleHeight / 2,
        }
    });
}