import { connect } from 'react-redux'
import { makeQuranURI, quranApiURL } from '@common/utils'
import { showQuranView, hideQuranView } from './action-creators'
import { withNavigation } from 'react-navigation';

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
        show: () => ownProps.navigation.navigate('QuranWeb', {
            defaultURL: quranApiURL
        }),
        hide: () => ownProps.navigation.goBack(),
        makeURI: query => makeQuranURI(query),
    }
}

export default $SurahSearch = withNavigation(connect(mapStateToProps,mapDispatchToProps)(SurahSearch));