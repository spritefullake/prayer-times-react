import { 
    START_TIMER,  STOP_TIMER, RESET_TIMER, 
    DAY_CHANGED, TIMER_NEXT_PRAYER,
    FETCH_COORDS, FETCHING_COORDS, FETCHED_COORDS,
    SWIPED_CHART } from "./action-types";

import { Location, Permissions } from 'expo'
import { DateTime } from 'luxon'

import { connect } from 'react-redux'

import PrayerView from './PrayerView'


export const initialState = {
    coords: null,
    //date represents today's date
    date: DateTime.local(),
    //the date represented by the current chart
    //it can change depending on how the chart is swiped
    currentChartDate: DateTime.local(),
};


//This component represents the ability to
//swipe through days on the prayer chart


function handleCoords(coords) {
    return {
        type: FETCHED_COORDS,
        coords,
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

function handleSwipe(dateSwipedTo){
    return {
        type: SWIPED_CHART,
        currentChartDate: dateSwipedTo,
    };
}

//two important variables
//that connect the redux 
//state to the react component props
const mapStateToProps = ({ coords, date, currentChartDate }, ownProps) => {
    return {
        ...ownProps,
        coords,
        currentChartDate: currentChartDate.startOf('day'),
        date: date.startOf('day'),
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchCoords: () => dispatch(fetchCoords()),
        handleSwipe: d => dispatch(handleSwipe(d)),
    }
};

//reducer manages state changes
//and responds to actions
//completely pure
export const rootReducer = (state = initialState, action) => {
    const { 

        type, 
        date, coords, 
        nextPrayerName, nextPrayerEnd, 
        currentChartDate,

    } = action;


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
        case DAY_CHANGED:
            return {
                ...state,
                date
            }
        case SWIPED_CHART:
            return {
                ...state,
                currentChartDate,
            }
        default:
            return state;
    }
}


export const SwipePrayerView = connect(mapStateToProps, mapDispatchToProps)(PrayerView)
