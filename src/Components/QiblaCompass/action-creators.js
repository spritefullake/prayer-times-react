import { COMPASS_STARTED, COMPASS_SUBSCRIBED, COMPASS_ENDED } from '@actionTypes'
import { ableToLocate } from '@common/utils'
import { Location } from 'expo'

function round(num){
    const precision = 1000;
    return Math.round(num * precision) / precision;
}

export function startWatchingHeading(){
    return async dispatch => {

        ableToLocate().then(async () => {
            const subscription = await Location.watchHeadingAsync(res => {
                dispatch({ type: COMPASS_STARTED, heading: round(res.trueHeading), accuracy: round(res.accuracy) })
            });

            dispatch({type: COMPASS_SUBSCRIBED, subscription})
        })
    }
}

export function endWatchingHeading(){
    return (dispatch,getState) => {
        getState().subscription.remove();
        dispatch({type: COMPASS_ENDED});
    }
}

