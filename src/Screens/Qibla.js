import React from 'react'
import { View } from 'react-native'
import { MapView, GestureHandler } from 'expo'
import { Polyline, Overlay } from 'react-native-maps'
import { KAABA_COORDS } from '@@QiblaCompass/utils'
import $QiblaCompass from '@containers/QiblaCompass'

const { TapGestureHandler, State} = GestureHandler

export default class QiblaScreen extends React.Component {

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
        
        { //hide the compass if the map is to take up the entire screen
          this.state.fullMap ? null: <$QiblaCompass fullSize={true} /> }

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