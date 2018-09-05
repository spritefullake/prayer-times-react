import { connect } from 'react-redux'
import LocationBar from './main'


const mapStateToProps = ({ address },ownProps) => ({
    ...ownProps,
    address,
});

export default $LocationBar = connect(mapStateToProps,null)(LocationBar);