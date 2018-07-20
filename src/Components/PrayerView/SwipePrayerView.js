import { fetchCoords, handleSwipe } from "./action-creators";
import { connect } from 'react-redux'

import PrayerView from '../PrayerView/PrayerView'



//two important variables
//that connect the redux 
//state to the react component props
const mapStateToProps = ({ coords, limit, index }, ownProps) => {
    return {
        ...ownProps,
        coords,
        index, limit
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchCoords: () => dispatch(fetchCoords()),
        handleSwipe: i => dispatch(handleSwipe(i)),
    }
};



export const SwipePrayerView = connect(mapStateToProps, mapDispatchToProps)(PrayerView)
