import { SHOW_QURAN_VIEW, HIDE_QURAN_VIEW, } from '@actionTypes'

export function showQuranView(){
    return {
        type: SHOW_QURAN_VIEW,
    }
}

export function hideQuranView(){
    return {
        type: HIDE_QURAN_VIEW,
    }
}