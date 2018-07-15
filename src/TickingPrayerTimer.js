import { START_TIMER, TIMER_NEXT_PRAYER, STOP_TIMER, RESET_TIMER, NEXT_DAY, FETCH_COORDS, FETCHING_COORDS, FETCHED_COORDS } from "./action-types";

import { connect } from 'react-redux'

import { nextPrayer } from './common/utils'


import PrayerTimer from './PrayerTimer'


function startTimer() {
    return {
        type: START_TIMER,
    }
}

function rollNextPrayer(coords) {
    return dispatch => {
        dispatch({
            type: TIMER_NEXT_PRAYER,
            ...autoGrabNext({ date: DateTime.local(), coords, }),
        })
    }
}


function stopTimer() {
    return {
        type: STOP_TIMER
    }
}

function resetTimer() {
    return {
        type: RESET_TIMER
    }
}

function nextDay() {
    return {
        type: NEXT_DAY,
        date: DateTime.local(),
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        startTicking: () => dispatch(startTimer()),
        rollNextPrayer: () => dispatch(rollNextPrayer(ownProps.coords)),
        rollNextDay: () => dispatch(nextDay())
    }
}


const mapStateToProps = ({ coords, date }, ownProps) => {


    return {
        ...ownProps,
        ...autoGrabNext({ coords, date }),
    }
};


function autoGrabNext({ coords, date }) {
    //error handles the case where 
    //we haven't located the coordinates
    //yet 

    if (coords) {
        return nextPrayer({ coords, date });
    }
    else {
        return { nextPrayerName: null, nextPrayerEnd: null };
    }
}

export const TickingPrayerTimer = connect(mapStateToProps, mapDispatchToProps)(PrayerTimer)