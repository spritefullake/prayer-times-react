
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

export const REFRESH_LOCATION = "Refreshing the location";

export const SHOW_COORD_PROMPT = "Displaying the coodinates prompt";
export const HIDE_COORD_PROMPT = "Hiding the coordinates prompt";

export const FIND_ADDRESS = "Begin finding the address";
export const FINDING_ADDRESS = "Finding the address";
export const FINDING_ADDRESS_FAILED = "Failed to find the address";
export const ADDRESS_FOUND = "Reverse geocoding returned the address!";
export const ADDRESS_PRESENT = "Address persisted"

export const SWITCH_LIST = "Switching list to ";

export const SHOW_QURAN_VIEW = "Showing the quran WebView";
export const HIDE_QURAN_VIEW = "Hiding the quran WebView";

export const COMPASS_STARTED = "Started watching compass heading";
export const COMPASS_SUBSCRIBED = "Compass subscribed to heading"
export const COMPASS_ENDED = "Ended watching compass heading";
//error types
export const LOCATION_OFF = "Location is turned off or unable to get location";
export const MANUAL_ENTRY = "Coordinates entered manually";


