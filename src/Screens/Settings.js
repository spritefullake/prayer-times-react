import React from 'react'
import { View } from 'react-native'
import SText from '@common/SText'
import { CheckBox } from 'react-native-elements'

export default class SettingsScreen extends React.Component{
    state ={
        checked: false
    }
    render(){
        return (
            <View>

                <CheckBox
  center
  title='Click Here'
  checkedIcon='dot-circle-o'
  uncheckedIcon='circle-o'
  checked={this.state.checked}
/>
            </View>
        )
    }
}