import React, { Component } from 'react';
import { Modal, ScrollView, KeyboardAvoidingView, TouchableOpacity, Text, TouchableHighlight, View, TextInput } from 'react-native';
import SText from '@common/SText';
import CloseTrigger from './CloseTrigger'
import { findAddress } from '@common/utils';


export default class CoordPrompt extends React.Component {
  state = {
    modalVisible: this.props.modalVisible,
    
    //we use state to hold coords
    //temporarily while the user 
    //is making edits... 
    //then, redux will handle
    //the coords once the final
    //submit comes in
    coords: this.props.coords,
  };

  latRef = React.createRef();
  longRef = React.createRef();

  setModalVisible(visible) {
    visible ? null : this.props.hidePrompt()
  }


  changeCoords({latitude=this.state.coords[0],longitude=this.state.coords[1]}){
    this.setState({coords: [latitude,longitude] })
  }

  constructor(props){
    super(props);

    this.closeModal = () => {
      this.setModalVisible(false); 
      //resets the coordinates to reflect the redux store
      //if the user closes the prompt instead of submitting changes
      this.changeCoords({latitude: this.props.coords[0], longitude: this.props.coords[1]});
    }
  }


  render() {
    return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
            this.props.hidePrompt();
          }}>

          <KeyboardAvoidingView
            style={{ flex: 1, padding: 10, backgroundColor: secondary }}>
            <View style={{ flex: 1, alignItems: "center", }}>

              <View style={{
                flex: 1, justifyContent: "center",
                flexDirection: "row",
              }}>
                <SText style={{
                  flex: 1, fontSize: 30,
                  alignSelf: "center", textAlign: "center",
                  color: tertiary,
                }}

                >Enter Your Coordinates</SText>
              </View>


              <View style={{ flexDirection: "row", flex: 0.75, }}>
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

              <CloseTrigger 
        style={styles.close}
        closer={this.closeModal}/>

            </View>
          </KeyboardAvoidingView>
        </Modal>
    );
  }

}

const neutral = "rgb(239, 246, 239)"
const secondary = "rgba(189,252,100,0.5)"
const tertiary = "rgba(51, 76, 51,0.65)"
const styles = {
  coord: {
    flex: 1,
    justifyContent: "center",
    fontSize: 30,
    textAlign: "center",
    backgroundColor: "transparent",
  },
  close: {
    padding: 6,
    backgroundColor: neutral,
    alignSelf: "stretch",
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20
  } 
}