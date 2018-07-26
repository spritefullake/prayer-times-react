import { connect } from 'react-redux'
import { refreshLocation, showPrompt } from './action-creators'
import { fetchCoords, fetchAddress } from "@actionCreators"

import  GeoRefresh  from './main'

const mapStateToProps = (state,ownProps) => ({
    ...ownProps
})

const mapDispatchToProps = (dispatch,ownProps) => ({
    geoRefresh: async () => {
        dispatch(refreshLocation());
        //we must have the coordinates change before
        //we decide to fetch the address again
        await dispatch(fetchCoords());
        dispatch(fetchAddress());
    },
    showPrompt: () => {
        dispatch(showPrompt());
    }
})


export default $GeoRefresh = connect(mapStateToProps, mapDispatchToProps)(GeoRefresh)
