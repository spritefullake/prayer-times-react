
import { connect } from 'react-redux'


import ChartDisplay from './main'
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


export default $ChartDisplay = connect(mapStateToProps, mapDispatchToProps)(ChartDisplay)