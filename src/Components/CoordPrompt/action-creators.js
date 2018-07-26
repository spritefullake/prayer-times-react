import { MANUAL_ENTRY, HIDE_COORD_PROMPT,
    FINDING_ADDRESS, FIND_ADDRESS, FIND_ADDRESS_FAILED, ADDRESS_FOUND  } from '@actionTypes'

import { findAddress } from '@common/utils';
//changes the coords in the redux store
//to be consistent with what was manually
//entered in the coords prompt
export function reflowCoordinates(coords){
    return {
        type: MANUAL_ENTRY,
        coords,
    }
}

export function hidePrompt(){
    return {
        type: HIDE_COORD_PROMPT,

    }
}