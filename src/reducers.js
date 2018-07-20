import {
    START_TIMER, STOP_TIMER, RESET_TIMER,
    DAY_CHANGED, TIMER_NEXT_PRAYER,
    FETCH_COORDS, FETCHED_COORDS,
    SWIPED_CHART, 
    MANUAL_ENTRY,
    LOCATION_OFF, ADDRESS_FOUND
} from "./action-types";


import { REHYDRATE } from 'redux-persist/lib/constants'

//reducer manages state changes
//and responds to actions
//completely pure
export const rootReducer = (state = initialState, action) => {
    const {

        type,

        coords,
        nextPrayerName, nextPrayerEnd,
        index, limit,
        address,



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
        case SWIPED_CHART:
            return {
                ...state,
                index,

            }
        case MANUAL_ENTRY:
            return {
                ...state,
                coords
            }

        case ADDRESS_FOUND:
            return {
                ...state,
                address,
            }

        default:
            return state;
    }
}