import { REFRESH_LOCATION, SHOW_COORD_PROMPT } from '@actionTypes'

export function refreshLocation(){
    return {
        type: REFRESH_LOCATION,

    }
}

export function showPrompt(){
    return {
        type: SHOW_COORD_PROMPT,
    }
}