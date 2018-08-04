//this file holds globally used action creators

import { FETCHING_COORDS, FETCHING_COORDS_FAILED, COORDS_PRESENT, FETCHED_COORDS,
    FINDING_ADDRESS, FIND_ADDRESS, FINDING_ADDRESS_FAILED, ADDRESS_FOUND, ADDRESS_PRESENT } from "@actionTypes";
import { Location, Permissions } from 'expo';
import { AsyncStorage } from 'react-native';

import { findAddress, ableToLocate } from '@common/utils'


function handleCoords(coords) {
    return {
        type: FETCHED_COORDS,
        coords,
    };
}

export function fetchCoords() {
    //fetchCoords itself cannot be 
    //an async function because then
    //it would be returning a promise 
    //and not a plain object like a function

    //fetch the coordinates whenever location
    //is available -- so we can stay updated, otherwise
    //keep the currently persisted location
    //or switch to asking the user to manually
    //enter the coordinates
    return async (dispatch, getState) => {

        //simply telling us that the coords
        //were already persisted
        if (getState().coords) {
            dispatch({
                type: COORDS_PRESENT,
            });
        }

        
        try {
            ableToLocate();
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
                dispatch({ type: FETCHING_COORDS_FAILED, err, });
                /*
                await launchCoordPrompt();
                dispatch(handleManualCoords(coords));
                */
                let coords = JSON.parse(await AsyncStorage.getItem("persist:root"));
                dispatch(handleCoords(coords));
            }
        }
        catch (err) {
            console.log(err);
        }
    };
}


export function fetchAddress({persist} = {persist: false}){
    
    return async (dispatch,getState) => {

        //exist early if we want to avoid
        //making an expensive reverse geocode operation
        if(persist && getState().address){
            dispatch({ type: ADDRESS_PRESENT })
            return;
        }

        dispatch({ type: FINDING_ADDRESS });
        try{
            console.log("The coords are ",getState().coords)
            const res = (await findAddress(null,getState().coords));

            console.log("The address is to be ",res)
            const address = res[0]  ? 
                (res[0].city ? res[0].city : res[0].region) :
                "Unknown"
            
            //change the address if the addresses we found \
            //are different from each other
            if(getState().address != address){
                dispatch({ type: ADDRESS_FOUND, address, })
            }
        }
        catch(error){
            dispatch({ type: FINDING_ADDRESS_FAILED, error, });
            
        }
        
    }

}