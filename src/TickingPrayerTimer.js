import {
    START_TIMER, STOP_TIMER, RESET_TIMER,
    DAY_CHANGED, TIMER_NEXT_PRAYER,
    FETCH_COORDS, FETCHING_COORDS, FETCHED_COORDS,
    SWIPED_CHART
} from "./action-types";

import { connect } from 'react-redux'

import { nextPrayer } from './common/utils'
import {DateTime} from 'luxon'
import PrayerTimer from './PrayerTimer'


function startTimer() {
    return {
        type: START_TIMER,
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
        type: DAY_CHANGED,
        date: DateTime.local(),
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



//two linking constants between redux & react


//dispatches inform the store of when an action happens
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        startTicking: () => dispatch(startTimer()),
        rollNextPrayer: () => dispatch(rollNextPrayer(ownProps.coords)),
        rollNextDay: () => dispatch(nextDay())
    }
}

const mapStateToProps = ({ coords, date, currentChartDate }, ownProps) => {
    return {
        ...ownProps,
        currentChartDate,
        date,
        ...autoGrabNext({ coords, date }),
    }
};


export const TickingPrayerTimer = connect(mapStateToProps, mapDispatchToProps)(PrayerTimer)