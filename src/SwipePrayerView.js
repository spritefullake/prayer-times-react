import { fetchCoords, handleSwipe } from "./action-creators";

import { 
    START_TIMER,  STOP_TIMER, RESET_TIMER, 
    DAY_CHANGED, TIMER_NEXT_PRAYER,
    FETCH_COORDS, FETCHED_COORDS,
    SWIPED_CHART } from "./action-types";

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
    //the current chart index
    //and the number of charts 
    //to be rendered initially 
    index: 5,
    limit: 10
};



//two important variables
//that connect the redux 
//state to the react component props
const mapStateToProps = ({ coords, date, limit, index }, ownProps) => {
    return {
        ...ownProps,
        coords,
        date: date.startOf('day'),
        index, limit
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchCoords: () => dispatch(fetchCoords()),
        handleSwipe: i => dispatch(handleSwipe(i)),
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
        index, limit

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
                date,
                currentChartDate: date,
            }
        case SWIPED_CHART:
            return {
                ...state,
                currentChartDate,
                index,

            }
        default:
            return state;
    }
}


export const SwipePrayerView = connect(mapStateToProps, mapDispatchToProps)(PrayerView)
