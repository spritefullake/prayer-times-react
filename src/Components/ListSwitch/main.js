import React from 'react';
import { Button } from 'react-native-elements'
import { header1 } from '@styles'

export default class ListSwitch extends React.Component {

    render() {
        //delays render until the icon is choosen
        const _icon = this.chooseIcon();
        const ready = this.props.switchListType && _icon;

        return ready && (
            <Button
                title=""
                onPress={this.props.switchListType.bind(null, this.props.listType)}
                icon={_icon}
                buttonStyle={{ backgroundColor: header1 }}
            />
        )
    }
    chooseIcon() {
        return this.props.listType == 'perspective' ? { name: "image", type: "entypo" }
            : { name: "list", type: "entypo" }
    }
}