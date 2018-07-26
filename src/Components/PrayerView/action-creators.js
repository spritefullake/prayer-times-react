import {
    FETCHING_COORDS, FETCHED_COORDS, FETCHING_COORDS_FAILED, COORDS_PRESENT,
    SWIPED_CHART,
    MANUAL_ENTRY
} from "@actionTypes";
import { Location, Permissions } from 'expo';

import storage from 'redux-persist/lib/storage'
import { AsyncStorage } from 'react-native'
//This component represents the ability to
//swipe through days on the prayer chart

async function launchCoordPrompt() {
    //todo 
}

function handleManualCoords(coords) {
    return {
        type: MANUAL_ENTRY,
        coords,
    }
}
export function handleSwipe(newIndex) {
    return {
        type: SWIPED_CHART,
        index: newIndex,
    };
}