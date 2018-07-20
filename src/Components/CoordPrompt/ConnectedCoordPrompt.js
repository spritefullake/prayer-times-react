import { connect } from 'react-redux'

import CoordPrompt from './CoordPrompt'
import {reflowCoordinates} from './action-creators'



const mapStateToProps = ({coords}, ownProps) => {
    return {
        ...ownProps,
        //since the coordprompt uses the indices
        //of the coords array,,, if there are no 
        //coords currently (aka coords = null)
        //then we use [null,null] instead
        coords: coords || [null,null],
    }   
};
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        reflowCoordinates: (coords) => dispatch(reflowCoordinates(coords))
    }
};


export const ConnectedCoordPrompt = connect(mapStateToProps, mapDispatchToProps)(CoordPrompt)