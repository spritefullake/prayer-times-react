import React from 'react'
import SText from '@common/SText'
import { Icon } from 'react-native-elements'
import { View, Modal, WebView } from 'react-native'
import { GestureHandler, BlurView } from "expo"
import NavArrows from "@components/NavArrows"

export default class QuranWebScreen extends React.Component{
    static navigationOptions = ({ navigation }) => {
        return {
          title: "Quran.com",
          headerStyle: { backgroundColor: "white"},
          headerRight: (
            <NavArrows

            onBackward={() => {
                this.webRef.goBack();
            }}
            onForward={() => {
                this.webRef.goForward();
            }}
        />),
        }
      }


    webRef = React.createRef();

    render(){
        return (
            <View style={{flex: 1}}>
                    <WebView
                        //since we've asked for geolocation
                        //permission already in the app,
                        //allow geolocation by the site
                        geolocationEnabled={true}

                        ref={ref => this.webRef = ref}

                        style={{flex: 1}}

                        source={{
                            uri: this.props.navigation.getParam('defaultURL','/')
                        }}
                    />

            </View>
        )
    }
}