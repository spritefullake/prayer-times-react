import { startTimer, rollNextPrayer, autoGrabNext } from './action-creators'
import { connect } from 'react-redux'

import { DateTime } from 'luxon'
import PrayerTimer from './main'

import { fetchAddress } from '@actionCreators'

//two linking constants between redux & react


//dispatches inform the store of when an action happens
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        startTicking: () => dispatch(startTimer()),
        rollNextPrayer: () => dispatch(rollNextPrayer(ownProps.coords)),
    }
}

const mapStateToProps = ({ coords, address }, ownProps) => {
    return {
        ...ownProps,
        coords,
        address,
        ...autoGrabNext({ coords, date: DateTime.local() }),
    }
};


export default $PrayerTimer = connect(mapStateToProps, mapDispatchToProps)(PrayerTimer)