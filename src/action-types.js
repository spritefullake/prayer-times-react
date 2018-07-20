
//Action Types
export const FETCH_COORDS = "FETCH_COORDS";
export const FETCHING_COORDS = "Fetching Coords";
export const FETCHED_COORDS = "Coords Received";
export const FETCHING_COORDS_FAILED = "Failed to fetch the coordinates"
export const COORDS_PRESENT = "Coordinates were already persisted"

export const START_TIMER = "TIMER::START";
export const STOP_TIMER = "TIMER::STOP";
export const RESET_TIMER = "TIMER::RESET";

export const DAY_CHANGED = "TIMER::DAY CHANGED";
export const TIMER_NEXT_PRAYER = "TIMER::NEXT_PRAYER";

export const SWIPED_CHART = "CHART::SWIPED";
export const SWIPE_TO_NOW = "CHART::SWIPE BACK TO NOW";

//error types
export const LOCATION_OFF = "Location is turned off or unable to get location";
export const MANUAL_ENTRY = "Coordinates entered manually"

export const ADDRESS_FOUND = "Reverse geocoding returned the address!"