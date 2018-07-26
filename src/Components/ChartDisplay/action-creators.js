import { DateTime } from 'luxon'
import {
    START_TIMER, STOP_TIMER, RESET_TIMER,
    DAY_CHANGED, TIMER_NEXT_PRAYER,
    FETCH_COORDS, FETCHING_COORDS, FETCHED_COORDS,
    SWIPED_CHART, SWIPE_TO_NOW
} from "@actionTypes";


export function returnToNow(scroller) {

    const data = scroller.props.data;
    const index =
        data.indexOf(data.filter(i => {

            return i.toLocaleString(DateTime.DATE_SHORT) ==
                DateTime.local().startOf('day').toLocaleString(DateTime.DATE_SHORT)
        })[0])

    scroller.scrollToIndex({
        index,
        viewOffset: 0,
    });

    return {
        type: SWIPED_CHART,
        index,
    }
}