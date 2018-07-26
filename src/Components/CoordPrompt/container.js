import { connect } from 'react-redux'

import CoordPrompt from './main'
import { reflowCoordinates, hidePrompt } from './action-creators'
import { fetchAddress } from '@actionCreators'


const mapStateToProps = ({coords, coordPromptVisible}, ownProps) => {
    return {
        ...ownProps,
        //since the coordprompt uses the indices
        //of the coords array,,, if there are no 
        //coords currently (aka coords = null)
        //then we use [null,null] instead
        coords: coords || [null,null],
        modalVisible: coordPromptVisible
    }   
};
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        reflowCoordinates: (coords) => dispatch(reflowCoordinates(coords)),
        fetchAddress: () => dispatch(fetchAddress()),
        hidePrompt: () => dispatch(hidePrompt())
    }
};


export default $CoordPrompt = connect(mapStateToProps, mapDispatchToProps)(CoordPrompt)