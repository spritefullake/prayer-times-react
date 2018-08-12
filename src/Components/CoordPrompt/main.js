import React, { Component } from 'react'
import { Modal, ScrollView, KeyboardAvoidingView, TouchableOpacity, Text, TouchableHighlight, View, TextInput } from 'react-native';
import SText from '@common/SText'
import CloseTrigger from './CloseTrigger'
import { findAddress } from '@common/utils'
import { MapView } from 'expo'
import { Marker } from 'react-native-maps'

import { secondary, neutral, tertiary } from '@styles'

export default class CoordPrompt extends React.Component {
  state = {

    //we use state to hold coords
    //temporarily while the user 
    //is making edits... 
    //then, redux will handle
    //the coords once the final
    //submit comes in
    coords: this.props.coords,

    //the marker won't render
    //unless we have the map
    //layed out first
    mapLayedOut: false,
  };

  latRef = React.createRef();
  longRef = React.createRef();



  changeCoords({ latitude = this.state.coords[0], longitude = this.state.coords[1] }) {
    this.setState({ coords: [latitude, longitude] })
  }

  constructor(props) {
    super(props);

    this.closeModal = () => {
      //resets the coordinates to reflect the redux store
      //if the user closes the prompt instead of submitting changes
      this.changeCoords({ latitude: this.props.coords[0], longitude: this.props.coords[1] });
    }
  }


  render() {

    const mapRegion = {
      latitude: parseFloat(this.state.coords[0]),
      longitude: parseFloat(this.state.coords[1]),
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };

    const ready = this.state.coords && mapRegion;

    return ready && (
      <View style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{ backgroundColor: secondary, alignItems: "center", flex: 1 }}>


        <MapView

          initialRegion={mapRegion}

          region={mapRegion}

          style={{ height: 200, width: "100%" }}

        >
          <Marker coordinate={{
            latitude: parseFloat(this.state.coords[0]),
            longitude: parseFloat(this.state.coords[1]),
          }} />


        </MapView>


        <View style={{
          backgroundColor: "white", alignSelf: "stretch", alignItems: "center",
        }} >
          <SText style={{ fontSize: 25, color: tertiary }}>Enter Your Coordinates</SText>
        </View>


        <View style={{ flexDirection: "row", marginLeft: 10, marginRight: 10, flex: 0.1 }}>
          <TextInput
            value={`${this.state.coords[0]}`}

            placeholder="Latitude"
            keyboardType="numeric"
            enablesReturnKeyAutomatically={true}
            returnKeyType="next"
            style={styles.coord}

            //prevents unneccesary clicking
            //on the part of the user
            autoFocus={true}
            //prevents the keyboard 
            //from hiding onSubmit
            blurOnSubmit={false}
            //easy editing of pre-existing
            //coordinates
            selectTextOnFocus={true}

            onSubmitEditing={evt => {
              this.longRef.current.focus()
            }}

            //update the coord prompt state
            onChange={evt => {
              this.changeCoords({
                latitude: evt.nativeEvent.text
              })
            }
            }

          />
          <TextInput
            value={`${this.state.coords[1]}`}

            ref={this.longRef}

            placeholder="Longitude"
            keyboardType="numeric"
            enablesReturnKeyAutomatically={true}
            returnKeyType="done"
            style={styles.coord}

            selectTextOnFocus={true}

            onSubmitEditing={evt => {
              this.closeModal();
              this.props.reflowCoordinates(
                this.state.coords.map(parseFloat)
              );
              this.props.fetchAddress();

            }}

            onChange={evt => {
              this.changeCoords({
                longitude: evt.nativeEvent.text
              })
            }
            }
          />
        </View>
      </KeyboardAvoidingView>
      </View>
    );
  }

}


const styles = {
  coord: {
    flex: 1,
    justifyContent: "center",
    fontSize: 25,
    textAlign: "center",
    backgroundColor: "transparent",
    color: tertiary,
  },
  close: {
    backgroundColor: neutral,
    alignSelf: "stretch",
    flex: 0.75,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20
  }
}