import React from 'react'
import { Magnetometer, Location } from 'expo'
import SText from '@common/SText'
import { View, Image, Vibration } from 'react-native'
import { ableToLocate } from '@common/utils'
import { findQiblaBearing, prettyBearing } from './utils'



export default class QiblaCompass extends React.Component {
    constructor(props) {
        super(props);

        ableToLocate().then(async () => {
            Location.watchHeadingAsync(res => {
                this.setState({ heading: res.trueHeading, accuracy: res.accuracy })
            });
        })
    }
    state = {
        heading: null,
        accuracy: null,
    }



    render() {
        const bearing = findQiblaBearing(this.props.coords);
        const pretty = Math.round(prettyBearing(bearing) * 100) / 100;
        const heading = Math.round(this.state.heading);

        const tolerance = 2;
        Math.abs(heading - pretty) <= tolerance ? Vibration.vibrate(500) : null;

        const ready = (this.state.heading && this.state.accuracy && this.props.coords);
        return ready && (
            <View style={this.props.style}>

                {this.props.fullSize ? <SText>Qibla bearing: {pretty}° clockwise from North</SText> : null}

                <View style={{ flexDirection: "row" }}>
                    <View>
                        <Image style={styles.pointer}
                            source={require("@images/compass_pointer.png")}/>
                        
                        <Image
                            style={{...styles.background, transform: [{rotate: heading + "deg"}]}}
                            source={require("@images/compass_background.png")} />
                        <Image
                            //rotate the needle to the Qibla bearing
                            //pretty - heading means the qibla bearing moves
                            //as the heading changes but can also line up with 
                            //the direction the device is pointed in!
                            style={{ ...styles.needle, transform: [{ rotate: pretty - heading + "deg" }] }}
                            source={require("@images/compass_needle.png")} />

                    </View>
                    <View style={{ flex: 2 }} />
                </View>
            </View>
        )
    }
}

//the compass background dimensions
const width = 90.5 *0.75, height = 97*0.75;

const bgWidth = bgHeight = 80*0.75;

const needleWidth = 10.4*0.75, needleHeight = 48.5*0.75;

const styles = {
    pointer: {
        width,
        height,
    },
    background: {
        position: "absolute",
        width: bgWidth,
        height: bgHeight,
        left: (width - bgWidth)/2,
        top: (height - bgHeight)/2 + (height - width)/2,

    },
    //the needle starts aligned
    //straight along the north-south line
    needle: {
        position: "absolute",
        height: needleHeight,
        width: needleWidth,
        left: width/2 - needleWidth/2,
        bottom: height/2 - needleHeight/2,
    }
}