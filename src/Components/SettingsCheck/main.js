import React from 'react'
import { CheckBox } from 'react-native-elements'

//a default custom styled checkbox for this app
export default class SettingsCheck extends React.Component {
    render() {
        return (
            <CheckBox
               
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o's
                checked={this.props.checked}

                {...this.props}
            />
        )
    }
}