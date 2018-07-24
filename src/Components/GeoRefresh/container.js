import { connect } from 'react-redux'
import { refreshLocation } from './action-creators'
import  GeoRefresh  from './main'

const mapStateToProps = (state,ownProps) => ({

})

const mapDispatchToProps = (dispatch,ownProps) => ({
    geoRefresh: () => dispatch(refreshLocation())
})


export default $GeoRefresh = connect(mapStateToProps, mapDispatchToProps)(GeoRefresh)
