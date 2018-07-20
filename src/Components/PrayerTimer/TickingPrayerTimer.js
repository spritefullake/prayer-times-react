import { startTimer, rollNextPrayer, addressFound, autoGrabNext } from './action-creators'
import { connect } from 'react-redux'

import { DateTime } from 'luxon'
import PrayerTimer from '../PrayerTimer/PrayerTimer'



//two linking constants between redux & react


//dispatches inform the store of when an action happens
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        startTicking: () => dispatch(startTimer()),
        rollNextPrayer: () => dispatch(rollNextPrayer(ownProps.coords)),
        addressFound: (a) => dispatch(addressFound(a)),
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


export const TickingPrayerTimer = connect(mapStateToProps, mapDispatchToProps)(PrayerTimer)