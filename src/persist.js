import Reactotron from 'reactotron-react-native'

import { rootReducer, } from './reducers'

import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import createSecureStore from "redux-persist-expo-securestore";
import { persistStore, persistReducer, createTransform, persistCombineReducers } from 'redux-persist'
// defaults to localStorage for web and AsyncStorage for react-native
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const initialState = ({
    coords: null,
    //the index of the
    //chart currently displayed
    index: 5,
    //the number of charts 
    //to be rendered initially 
    limit: 10,

    address: null,
});

const persistConfig = {
    key: 'root',
    //using securestorage becuase
    //there is a bug with AsyncStorage
    storage: createSecureStore(),
    stateReconciler: autoMergeLevel2,
    debug: true,
};

const pPreducer = persistReducer(persistConfig, rootReducer)

const logger = createLogger();

export const appStore = Reactotron.createStore(pPreducer, initialState,
    applyMiddleware(thunkMiddleware, logger)
)
export const persistor = persistStore(appStore)