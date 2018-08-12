import React from 'react'
import { View } from 'react-native'
import SText from '@common/SText'
import $GeoRefresh from '@containers/GeoRefresh'

export default class LocationBar extends React.Component {
   
    render() { 
        return (
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <View style={{ flex: 1, alignItems: "flex-end" }} >

                </View>

                <SText style={{ flex: 3, textAlign: "center" }}>Prayer Times in {this.props.address}</SText>

                <View style={{ flex: 1, alignItems: "flex-start" }}>
                    <$GeoRefresh />
                </View>

            </View>
        )
    }
}