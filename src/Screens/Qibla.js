import React from 'react'
import { View } from 'react-native'
import { MapView, GestureHandler } from 'expo'
import { Polyline, Overlay } from 'react-native-maps'
import { KAABA_COORDS } from '@@QiblaCompass/utils'
import $QiblaCompass from '@containers/QiblaCompass'
import SText from '@common/SText'

import { connect } from 'react-redux'

import { NavigationEvents } from 'react-navigation'

import { startWatchingHeading, endWatchingHeading } from '@@QiblaCompass/action-creators'

const { TapGestureHandler, State} = GestureHandler

class QiblaScreen extends React.Component {

  state = {
    fullMap: false
  }

  render() {

    const { navigation } = this.props;
    const latitude = navigation.getParam('coords',[0])[0], 
          longitude = navigation.getParam('coords',[0])[1];

    const mapRegion = {
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };

    const mapGrow = this.state.fullMap ? { height: "100%"} : { height: "50%" };
   
    return (
      <View>


    <NavigationEvents
    //start the data collection for the compass and end it when not in use
                onWillBlur={() => this.props.endWatching()}
                //did focus means the component has been mounted
                //so starting to watch is 100% ok!
                onDidFocus={() => this.props.startWatching()}/>
       
        { //hide the compass if the map is to take up the entire screen
          this.state.fullMap ? null: 
          <View>
            
            <$QiblaCompass fullSize={true} />
            <SText>Current Heading: {this.props.heading} degrees</SText>
          </View> 
          }

<View>
        <MapView

          onPress={() => this.setState((oldState) => {
            return {
              fullMap: !oldState.fullMap
            }
          })}

          initialRegion={mapRegion}

          region={mapRegion}

          style={{width: "100%", height: "100%"}}

        >
          
        <Polyline 
          coordinates={[{latitude, longitude}, {latitude: KAABA_COORDS[0], longitude: KAABA_COORDS[1]}]}
          geodesic={true}
          strokeColor={"green"}
        />

      

        </MapView>
        </View>
      
      </View>
    )
  }
}


const mapStateToProps = ({ heading }) => {
  return {
    heading
  }
}

const mapDispatchToProps = (dispatch) => ({
  startWatching: () => dispatch(startWatchingHeading()),
  endWatching: () => dispatch(endWatchingHeading()),
})

export default $Qibla = connect(mapStateToProps,mapDispatchToProps,null,{ withRef: true })(QiblaScreen) 