import React from 'react'
import { Icon, Button } from 'react-native-elements'
import { Modal, View, Text } from 'react-native'
import { MapView } from 'expo'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

//this component launches the list of 
//cities & places to choose from 
//for geolocation

export default class SearchLauncher extends React.Component {
    state = {
        modalVisible: false
    }

    render() {
        return (
            <View>
                <Icon type="entypo" name="magnifying-glass"
                    onPress={() => this.showModal()}
                />
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                      }}
                >

                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <Button title="Close" onPress={() => this.closeModal()}/>
                    </View>
                </View>

                   

                    <MapView
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    />
                </Modal>
            </View>

        )
    }

    showModal() {
        this.setState({ modalVisible: true })
    }
    closeModal(){
        this.setState({modalVisible: false})
    }
}