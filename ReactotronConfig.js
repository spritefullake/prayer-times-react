import Reactotron, {
    trackGlobalErrors,
    openInEditor,
    overlay,
    asyncStorage,
    networking
} from 'reactotron-react-native'

import { reactotronRedux } from 'reactotron-redux'

Reactotron
    .configure({
        name: 'React Native Demo'
    })
    .use(trackGlobalErrors())
    .use(reactotronRedux())
    .use(openInEditor())
    .use(overlay())
    .use(asyncStorage())
    .use(networking())
    .connect()