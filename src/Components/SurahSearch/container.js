import { connect } from 'react-redux'
import { makeQuranURI, quranApiURL } from '@common/utils'
import { showQuranView, hideQuranView } from './action-creators'

import SurahSearch from './main'


const mapStateToProps = ({quranViewVisible},ownProps) => {
    return {
        ...ownProps,
        quranViewVisible,
        defaultURL: quranApiURL
    }
}

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        show: () => dispatch(showQuranView()),
        hide: () => dispatch(hideQuranView()),
        makeURI: query => makeQuranURI(query),
    }
}

export default $SurahSearch = connect(mapStateToProps,mapDispatchToProps)(SurahSearch);