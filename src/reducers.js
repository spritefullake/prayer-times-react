import {
    START_TIMER, STOP_TIMER, RESET_TIMER,
    DAY_CHANGED, TIMER_NEXT_PRAYER,
    FETCH_COORDS, FETCHED_COORDS,
    SWIPED_CHART, 
    MANUAL_ENTRY,
    LOCATION_OFF, ADDRESS_FOUND,
    SHOW_COORD_PROMPT, HIDE_COORD_PROMPT,
    SWITCH_LIST,
    SHOW_QURAN_VIEW, HIDE_QURAN_VIEW,
    COMPASS_STARTED, COMPASS_SUBSCRIBED, COMPASS_ENDED,
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

        listType,

        heading, accuracy, subscription
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
        
        case SHOW_COORD_PROMPT:
            return {
                ...state,
                coordPromptVisible: true,
            }
        case HIDE_COORD_PROMPT:
            return {
                ...state,
                coordPromptVisible: false,
            }

        case SWITCH_LIST: 
            return {
                ...state,
                listType,
            }

        case SHOW_QURAN_VIEW: 
            return {
                ...state,
                quranViewVisible: true,
            }
        case HIDE_QURAN_VIEW:
            return {
                ...state,
                quranViewVisible: false,
            }


        case COMPASS_STARTED: 
            return {
                ...state,
                heading,
                accuracy,
            }

        case COMPASS_SUBSCRIBED: 
            return {
                ...state,
                subscription,
            }

        case COMPASS_ENDED:
            return {
                ...state,
                //only one compass can be subscribed 
                //to heading readings at any time
                subscription: {remove: () => null},
            }

        default:
            return state;
    }
}
