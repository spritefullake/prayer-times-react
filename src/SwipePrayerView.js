import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native'

import { Location, Permissions } from 'expo'
import { DateTime, Interval } from 'luxon'
import getData from './common/data'



import { connect, Provider } from 'react-redux'

import PrayerView from './PrayerView'


//This component represents the ability to
//swipe through days on the prayer chart

//Action Types
const FETCH_COORDS = "FETCH_COORDS"

const TIMER_NEXT_PRAYER = "TIMER::NEXT_PRAYER"
const START_TIMER = "TIMER::START"
const STOP_TIMER = "TIMER::STOP"
const RESET_TIMER = "TIMER::RESET"

export const initialState = {
    coords: [0, 0],
    interval: Interval
        .fromDateTimes(DateTime.local(),
            DateTime.local().plus({ days: 1 })),
};


function startTimer(interval = initialState.interval) {
    return {
        type: START_TIMER,
        interval: Interval.fromDateTimes(DateTime.local(), interval.end),
    }
}
function rollNextPrayer() {

    const { nextPrayerName, nextPrayerEnd } = 
nextPrayer(DateTime.local());
    return {
        type: TIMER_NEXT_PRAYER,
        interval: 
Interval.fromDateTimes(DateTime.local(), nextEnd),
	nextPrayerName,
    }
}


function stopTimer() {
    return {
        type: STOP_TIMER
    }
}

function resetTimer() {
    return {
        type: RESET_TIMER
    }
}



function handleCoords(coords) {
    return {
        type: FETCH_COORDS,
        coords,
    }
}
const mapStateToProps = ({ coords, interval }, ownProps) => {

    const { nextPrayerName, nextPrayerEnd } = nextPrayer({ coords, interval })
    return {
        ...ownProps,
        coords,
        date: interval.start.startOf('day').toJSDate(),
        nextPrayerName,
        nextPrayerEnd,

    }
};


function nextPrayer({ interval, coords }) {

    //first calculate all the next prayer times
    const data = getData(
        interval.start.toJSDate(), coords,
        Interval.fromDateTimes(DateTime.local().startOf('day'),
            DateTime.local().endOf('day'))
    );

    /// get the prayer that comes next 
    let names = data.map(i => i.name).concat(["fajr"]); //gotta add next day fajr
    let times = data.map(i => {
        return i.time.start
    }).concat(
        //add the next day's fajr time
        data.filter(i => i.name == "isha").map(i => i.time.end)
    );

    //find the smallest time after now
    //DateTime.local() is in essence == to (new Date())
    let min = Math.min(...times.filter(i => i >= DateTime.local()));

    const nextPrayerTime = times.filter(i => i == min)[0];


    return {
        nextPrayerName: names[times.indexOf(nextPrayerTime)],
        nextPrayerEnd: nextPrayerTime
    }
}

async function fetchCoords() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)

    const location = await Location.getCurrentPositionAsync(
        {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
        })

    const coords = [location.coords.latitude, location.coords.longitude]

    return handleCoords(coords)
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchCoords: () => fetchCoords().then(res => dispatch(res)),
        startTicking: () => dispatch(startTimer()),
        rollNextPrayer: () => dispatch(rollNextPrayer()),
    }
};

//reducer manages state changes
//and responds to actions
//completely pure
export const rootReducer = (state = initialState, action) => {
    const { type, interval, coords, nextPrayerName } = 
action;
    switch (type) {
        case START_TIMER:
            return {
                ...state,
                interval,
            };
        case STOP_TIMER:
            return {
                ...state,
            }
        case FETCH_COORDS:
            return {
                ...state,
                coords,
            };
        case TIMER_NEXT_PRAYER:
            return {
                ...state,
                interval,
                nextPrayerName,
		name
            };
        default:
            return state;
    }
}


export const SwipePrayerView = connect(mapStateToProps, mapDispatchToProps)(PrayerView)
