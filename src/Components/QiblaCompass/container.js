import { connect } from 'react-redux'
import QiblaCompass from './main'

import { startWatchingHeading, endWatchingHeading } from './action-creators'

import { withNavigation } from 'react-navigation'

import { GestureHandler } from 'expo'

const { State } = GestureHandler;

const mapStateToProps = ({coords, heading, accuracy, subscription, compassDisabled},ownProps) => {
    return {
        ...ownProps,
        coords,
        heading,
        accuracy,
        subscription,
        compassDisabled,
    }
}
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        startWatching: () => dispatch(startWatchingHeading()),
        endWatching: () => dispatch(endWatchingHeading()),

        showCalibrate: ({ nativeEvent }) => {
            dispatch((dispatch,getState) => {
            console.log(" THE OWN PROPS IS    : ",getState())
            if (nativeEvent.state == State.ACTIVE) {
                ownProps.navigation.navigate('Calibrate',{accuracy: getState().accuracy});
            }
        })
        }
    }
}

export default $QiblaCompass = withNavigation(connect(mapStateToProps,mapDispatchToProps,null,{ withRef: true })((QiblaCompass)));