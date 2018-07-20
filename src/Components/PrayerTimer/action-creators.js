import { DateTime } from 'luxon'
import { Location, Permissions } from 'expo';
import {
    START_TIMER, STOP_TIMER, RESET_TIMER,
    DAY_CHANGED, TIMER_NEXT_PRAYER,
    FETCH_COORDS, FETCHING_COORDS, FETCHED_COORDS,
    SWIPED_CHART, SWIPE_TO_NOW,
    ADDRESS_FOUND
} from "../../action-types";
import { nextPrayer } from '../../common/utils'

export function startTimer() {
    return {
        type: START_TIMER,
    }
}


export function rollNextPrayer(coords) {
    return dispatch => {
        dispatch({
            type: TIMER_NEXT_PRAYER,
            ...autoGrabNext({ date: DateTime.local(), coords, }),
        })
    }
}

export function autoGrabNext({ coords, date }) {
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

export function addressFound(address) {
    return {
        type: ADDRESS_FOUND,
        address,
    }
}