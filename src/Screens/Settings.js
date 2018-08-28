import React from 'react'
import { View, SectionList, Text, FlatList } from 'react-native'
import SText from '@common/SText'
import { CheckBox } from 'react-native-elements'
import { connect } from 'react-redux'

import $ListSwitch from "@containers/ListSwitch"
import SettingsCheck from "@components/SettingsCheck"
import { endWatchingHeading } from "@@QiblaCompass/action-creators"
import { toggleCompassDisabled } from '@actionCreators'



/*
       <SectionList
           renderItem={({ item, index, section }) => <SettingsCheck title={item} key={index} />}
           renderSectionHeader={({ section: { title } }) => (
               <Text style={{ fontWeight: 'bold' }}>{title}</Text>
           )}
           sections={[
               { title: 'Title1', data: ['item1', 'item2'] },
               { title: 'Title2', data: ['item3', 'item4'] },
               { title: 'Title3', data: ['item5', 'item6'] },
           ]}
           keyExtractor={(item, index) => item + index}
       />
       */

class SettingsScreen extends React.Component {
    render() {
        const ready = this.props.subscription;
        const end = this.props.endWatching;
        return ready && (
            <View style={{ flex: 1 }}>
                
                <FlatList

                    data={[
                        { key: 'List Mode', component: $ListSwitch },
                        { key: 'Calculation Method' },
                        {
                            key: 'Automatic Compass',
                            component: props => ({
                                render: () => <SettingsCheck checked={!this.props.compassDisabled} 
                                onPress={() => this.props.toggleCompass(this.props.compassDisabled)}/>
                            })
                        },

                    ]}
                    renderItem={
                        ({ item }) =>
                            (<View style={{ alignSelf: "stretch", flex: 1, justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>

                                <SText style={{ fontSize: 30, }}>{item.key}</SText>

                                { item.component ? <item.component/> : null}

                            </View>)
                    }

                    ItemSeparatorComponent={({ highlighted }) => <View style={[{
                        height: 1,
                        flex: 1,
                        backgroundColor: "black"
                    }, highlighted]} />}
                />

            </View>

        )
    }
}

const mapStateToProps = ({ heading, subscription, compassDisabled }) => ({
        heading,
        subscription,
        compassDisabled,
})

const mapDispatchToProps = (dispatch) => ({
        endWatching: () => dispatch(endWatchingHeading()),
        toggleCompass: status => dispatch(toggleCompassDisabled(status)),
})

export default $SettingsScreen = connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);