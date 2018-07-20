import { MANUAL_ENTRY } from '../../action-types'

//changes the coords in the redux store
//to be consistent with what was manually
//entered in the coords prompt
export function reflowCoordinates(coords){
    return {
        type: MANUAL_ENTRY,
        coords,
    }
}