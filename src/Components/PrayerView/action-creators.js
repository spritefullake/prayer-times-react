import {
    FETCHING_COORDS, FETCHED_COORDS, FETCHING_COORDS_FAILED, COORDS_PRESENT,
    SWIPED_CHART,
    MANUAL_ENTRY
} from "../../action-types";
import { Location, Permissions } from 'expo';

import storage from 'redux-persist/lib/storage'
import { AsyncStorage } from 'react-native'
//This component represents the ability to
//swipe through days on the prayer chart
function handleCoords(coords) {
    return {
        type: FETCHED_COORDS,
        coords,
    };
}

async function launchCoordPrompt() {
    //todo 
}

function handleManualCoords(coords) {
    return {
        type: MANUAL_ENTRY,
        coords,
    }
}

export function fetchCoords() {
    //fetchCoords itself cannot be 
    //an async function because then
    //it would be returning a promise 
    //and not a plain object like a function


    //fetch the coordinates whenever location
    //is available to stay updated, otherwise
    //keep the currently persisted location
    //or switch to asking the user to manually
    //enter the coordinates
    return async (dispatch, getState) => {
        if (getState().coords) {
            dispatch({
                type: COORDS_PRESENT,

            });
        }

        try {
            //ask for location permissions before geolocating
            const { status } = await Permissions.askAsync(Permissions.LOCATION);
            try {
                dispatch({ type: FETCHING_COORDS });
                const location = await Location.getCurrentPositionAsync({
                    enableHighAccuracy: true,
                    timeout: 20000,
                    maximumAge: 1000
                });
                const coords = [location.coords.latitude, location.coords.longitude];
                dispatch(handleCoords(coords));
            }
            catch (err) {
                dispatch({ type: FETCHING_COORDS_FAILED });
                /*
                await launchCoordPrompt();
                dispatch(handleManualCoords(coords));
                */
                let coords = JSON.parse(await AsyncStorage.getItem("persist:root"))

                dispatch(handleCoords(coords))
            }
        }
        catch (err) {
            console.log("Location permissions denied")
        }
    };
}
export function handleSwipe(newIndex) {
    return {
        type: SWIPED_CHART,
        index: newIndex,
    };
}