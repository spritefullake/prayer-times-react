import { connect } from 'react-redux'
import QiblaCompass from './main'

const mapStateToProps = ({coords},ownProps) => {
    return {
        ...ownProps,
        coords,
    }
}

export default $QiblaCompass = connect(mapStateToProps,null)(QiblaCompass);