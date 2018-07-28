import {
    SWIPED_CHART,
} from "@actionTypes";

export function handleSwipe(newIndex) {
    return {
        type: SWIPED_CHART,
        index: newIndex,
    };
}