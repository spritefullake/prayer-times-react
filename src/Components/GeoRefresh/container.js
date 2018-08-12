import { connect } from 'react-redux'
import { refreshLocation, showPrompt } from './action-creators'
import { fetchCoords, fetchAddress } from "@actionCreators"

import  GeoRefresh  from './main'


import { withNavigation } from 'react-navigation';


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
        //navigate to the coords prompt when triggered
        ownProps.navigation.navigate('Coord');
    }
})


export default $GeoRefresh = withNavigation(connect(mapStateToProps, mapDispatchToProps)(GeoRefresh))
