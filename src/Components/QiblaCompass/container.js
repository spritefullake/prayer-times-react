import { connect } from 'react-redux'
import QiblaCompass from './main'

import { startWatchingHeading, endWatchingHeading } from './action-creators'

const mapStateToProps = ({coords, heading, accuracy, subscription},ownProps) => {
    return {
        ...ownProps,
        coords,
        heading,
        accuracy,
        subscription,
    }
}
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        startWatching: () => dispatch(startWatchingHeading()),
        endWatching: () => dispatch(endWatchingHeading())
    }
}

export default $QiblaCompass = connect(mapStateToProps,mapDispatchToProps,null,{ withRef: true })(QiblaCompass);