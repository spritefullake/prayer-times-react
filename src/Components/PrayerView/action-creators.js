import { FETCHING_COORDS, FETCHED_COORDS, SWIPED_CHART,
MANUAL_ENTRY } from "../../action-types";
import { Location, Permissions } from 'expo';

//This component represents the ability to
//swipe through days on the prayer chart
function handleCoords(coords) {
    return {
        type: FETCHED_COORDS,
        coords,
    };
}

async function launchCoordPrompt(){
   //todo 
}

function handleManualCoords(coords){
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
    return async (dispatch) => {
        dispatch({ type: FETCHING_COORDS });
        try {
            const { status } = await Permissions.askAsync(Permissions.LOCATION);
            const location = await Location.getCurrentPositionAsync({
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            });
            const coords = [location.coords.latitude, location.coords.longitude];
            dispatch(handleCoords(coords));
        }
        catch (err) {
            await launchCoordPrompt();
            dispatch(handleManualCoords(coords));
        }
    };
}
export function handleSwipe(newIndex) {
    return {
        type: SWIPED_CHART,
        currentChartDate: newIndex,
        index: newIndex,
    };
}