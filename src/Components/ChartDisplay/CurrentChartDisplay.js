import {
    START_TIMER, STOP_TIMER, RESET_TIMER,
    DAY_CHANGED, TIMER_NEXT_PRAYER,
    FETCH_COORDS, FETCHING_COORDS, FETCHED_COORDS,
    SWIPED_CHART, SWIPE_TO_NOW
} from "../../action-types";

import { connect } from 'react-redux'
import { DateTime } from 'luxon'

import ChartDisplay from '../ChartDisplay/ChartDisplay'

function returnToNow(scroller) {

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

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        returnToNow: (scroller) => dispatch(returnToNow(scroller))
    }
}

const mapStateToProps = ({ coords, date, currentChartDate, index, limit }, ownProps) => {
    return {
        ...ownProps,
        currentChartDate,
        index,
        limit,
    }
};


export const CurrentChartDisplay = connect(mapStateToProps, mapDispatchToProps)(ChartDisplay)