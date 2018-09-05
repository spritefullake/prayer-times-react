import { connect } from 'react-redux'
import ListSwitch from './main'
import { switchListType } from './action-creators'

const mapStateToProps = ({ listType }, ownProps) => {
    return {
        ...ownProps,
        listType
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        switchListType: (listType) => dispatch(switchListType(listType))
    }
}
export default $ListSwitch = connect(mapStateToProps,mapDispatchToProps)(ListSwitch)    