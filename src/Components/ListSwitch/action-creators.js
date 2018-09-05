import { SWITCH_LIST } from '@actionTypes'

export function switchListType(listType){
    if(listType == 'perspective'){
        return {
            type: SWITCH_LIST,
            listType: 'normal'
        }
    }
    return {
        type: SWITCH_LIST,
        listType: 'perspective'
    };
}