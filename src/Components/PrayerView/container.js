import { handleSwipe } from "./action-creators";
import { fetchCoords, fetchAddress } from "@actionCreators"

import { connect } from 'react-redux'

import PrayerView from './main'



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
        fetchAddress: () => dispatch(fetchAddress({persist: false})),
        handleSwipe: i => dispatch(handleSwipe(i)),
    }
};



export default $PrayerView = connect(mapStateToProps, mapDispatchToProps)(PrayerView)
