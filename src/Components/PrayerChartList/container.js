import { handleSwipe } from "./action-creators";

import { connect } from 'react-redux'

import PrayerChartList from './main'



//two important variables
//that connect the redux 
//state to the react component props
const mapStateToProps = ({ coords, index, listType }, ownProps) => {
    return {
        ...ownProps,
        coords,
        index,
        listType,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleSwipe: i => dispatch(handleSwipe(i)),
    }
};


//with ref allows the use of refs with connected components
export default $PrayerChartList = connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(PrayerChartList)
