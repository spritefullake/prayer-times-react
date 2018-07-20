
import { connect } from 'react-redux'


import ChartDisplay from '../ChartDisplay/ChartDisplay'
import { returnToNow } from './action-creators'


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