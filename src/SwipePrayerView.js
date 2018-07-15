import { START_TIMER, TIMER_NEXT_PRAYER, STOP_TIMER, RESET_TIMER, NEXT_DAY, FETCH_COORDS, FETCHING_COORDS, FETCHED_COORDS } from "./action-types";

import { Location, Permissions } from 'expo'
import { DateTime } from 'luxon'



import { connect } from 'react-redux'

import PrayerView from './PrayerView'
import { nextPrayer } from './common/utils'


export const initialState = {
    coords: null,
    date: DateTime.local(),
};


//This component represents the ability to
//swipe through days on the prayer chart


function startTimer(date = initialState.date) {
    return {
        type: START_TIMER,
        date: DateTime.local()
    }
}
function rollNextPrayer(coords) {

        
    return dispatch => {
        dispatch({
            type: TIMER_NEXT_PRAYER,
            ...autoGrabNext({date: DateTime.local(), coords,}),
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

function handleCoords(coords) {
    return {
        type: FETCHED_COORDS,
        coords,
    }
}
const mapStateToProps = ({ coords, date }, ownProps) => {


    return {
        ...ownProps,
        coords,
        date: date.startOf('day'),
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

function fetchCoords() {
   //fetchCoords itself cannot be 
   //an async function because then
   //it would be returning a promise 
   //and not a plain object like a function


    return async dispatch => {
        dispatch({ type: FETCHING_COORDS })

        try{
            const { status } = await Permissions.askAsync(Permissions.LOCATION)
            const location = await Location.getCurrentPositionAsync(
                {
                    enableHighAccuracy: true,
                    timeout: 20000,
                    maximumAge: 1000
                })

            const coords = [location.coords.latitude, location.coords.longitude]

            dispatch(handleCoords(coords))

        }
        catch(err){
            dispatch({type: "ERROR" })
        }

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchCoords: () => dispatch(fetchCoords()),
        startTicking: () => dispatch(startTimer()),
        rollNextPrayer: () => dispatch(rollNextPrayer(ownProps.coords)),
        rollNextDay: () => dispatch(nextDay())
    }
};

//reducer manages state changes
//and responds to actions
//completely pure
export const rootReducer = (state = initialState, action) => {
    const { type, date, coords, nextPrayerName, nextPrayerEnd } =
        action;
    switch (type) {
        case STOP_TIMER:
            return {
                ...state,
            }
        case FETCHED_COORDS:
            return {
                ...state,
                coords,
            };
        case TIMER_NEXT_PRAYER:
            return {
                ...state,
                nextPrayerName,
                nextPrayerEnd,
            };
        case NEXT_DAY:
            return {
                ...state,
                date
            }
        default:
            return state;
    }
}


export const SwipePrayerView = connect(mapStateToProps, mapDispatchToProps)(PrayerView)
