//Prayer Times Example
//const geolocation = require('windows.devices.geolocation');
import "babel-polyfill";
import { OrderedTimeBlock, Time, PrayerTime, xmlns, conversions } from 'time-classes';
const PrayerTimes = require("prayer-times");
//const Vue = require('vue').default;

/* modernize the getCurrentPosition api */
function getCoords() {
    return new Promise((resolve, reject) => {
        const nav = window.navigator.geolocation;
        let coords;
        /*first check if we can obtain
        the location*/
        if (nav) {
            /* use async & await for cleaner
            handling of asynchronous data*/
            nav.getCurrentPosition(
                (position) => {
                    coords = [position.coords.latitude, position.coords.longitude];
                    resolve(coords);
                },
                (error) => {
                    reject("Location access denied/unavailable");
                    coordPrompt(processPrayers.bind(Time.today()))
                }, { enableHighAccuracy: true });
        }
        else {
            reject("No navigator present!")
            coordPrompt(processPrayers.bind(Time.today()))
        }
    })
}
/* The dialog that pops up for the user to enter their
coordiantes manually

callback accepts the coords as an argument*/
function coordPrompt(callback) {
    let mainCont = document.querySelector(".main-cont");
    let coordDialog = document.querySelector(".coord-dialog");
    let buttonCoord = document.querySelector("button.coord");
    let coords;
    // @ts-ignore
    mainCont.style.setProperty("--dialog-up", "blur(10px)");
    // @ts-ignore
    coordDialog.style.display = "flex";
    buttonCoord.addEventListener("click", (e) => {
        // @ts-ignore
        mainCont.style.setProperty("--dialog-up", "");
        // @ts-ignore
        coordDialog.style.display = "none";
        // @ts-ignore
        coords = [document.querySelector(".lat").value, document.querySelector(".long").value];
        /* Basically had to work backwards instead of using await/async because
        we are waiting on an event to complete */
        callback(coords);
    });
}
function processPrayers(date, coords) {
    let times = (new PrayerTimes()).getTimes(date, coords);
    /*
    ORDER in this array is important because some prayers
    begin when other ones end
    
    USED for processing & showing functions
    */
    const prayers = ["fajr", "dhuhr", "asr", "maghrib", "isha"];
    /* d will be used to recombine
    with the time of the prayer
    to give the start and end dates for
    new time objects that will represent
    the prayer time periods
    
    #toDateString only gives us as
    specific as the day, so no hours or seconds
    */
    let d = date.toDateString();
    /*makes formatting a little cleaner*/
    let format = (time) => d + " " + time;
    /*Turn each prayer into a blocked time period
    beginning at the start of the prayer time and
    ending at the end of the prayer time.
    
    Implmented using the Time class which will later
    be converted into an on-screen representation*/
    return (

        prayers
            //grab the prayer times
            .map(prayer => times[prayer])
            //create the Time objects
            .map((time, index, arr) => {
                let nextTime;
                let todayStart = (new Date(date));
                    todayStart.setHours(0, 0, 0, 0);
                    todayStart = todayStart.toDateString();

                //increment the date to the next day
                let tomorrow = new Date(date)
                    tomorrow.setHours(0, 0, 0, 0)
                    tomorrow.setDate(date.getDate() + 1)
                    tomorrow = tomorrow.toDateString()

                /* the next times will be in the format of javascript date objects */
                if (time == times["fajr"]) {
                    //fajr ends at sunrise
                    nextTime = new Date(`${todayStart} ${times["sunrise"]}`);
                }
                else if (time == times["isha"]) {
                    //isha ends when fajr begins

                    const fajrTime = (new PrayerTimes()).getTimes(new Date(tomorrow), coords)["fajr"]
                    nextTime = new Date(`${tomorrow} ${fajrTime}`)

                    console.log("NEXT TIME :", tomorrow, " AND ", fajrTime + " & " + nextTime)
                    //console.log("NEXT TIME ", new Date(date.setDate(date.getDate() + 1)))
                }
                else {
                    nextTime = new Date(`${todayStart} ${arr[index + 1]}`);
                }
                return new PrayerTime(prayers[index], new Date(format(time)), nextTime);
            })

    );
}

/*funtions for the the physical representation of a prayer*/


async function getData(date) {
    return processPrayers(date, await getCoords());
}
/* basically a helpers for the vuejs components 

the following one is for collecting ALL of the prayer properties; dis-assembled*/
async function getAggregateData(ctx) {
    const prayerTimes = await getData(ctx.start)

    const ordered = prayerTimes.map(time => OrderedTimeBlock.fromTime(time, ctx));

    const offsets = ordered.map(time => Math.abs(time.startOffsetPercent) * 100)

    const sizes = ordered.map(time => Math.abs(time.percent) * 100)

    let lastIndex = prayerTimes.length - 1;
    sizes[lastIndex] = ishaShorten(offsets[lastIndex], sizes[lastIndex])

    return {
        prayers: prayerTimes,
        names: prayerTimes.map(time => time.name),
        ordered: ordered,
        offsets: offsets,
        sizes: sizes,
    }
}

async function getTidyData(ctx) {
    const data = await getAggregateData(ctx)
    const tidy = [];

    for (let i = 0; i < data.names.length; i++) {
        tidy.push({
            name: data.names[i],
            time: data.ordered[i],
            offset: data.offsets[i],
            size: data.sizes[i]
        })
    }
    return tidy;
}

//calculation helper
function ishaShorten(offset, height) {
    /* shorten the height of isha since it often goes offscreen */
    while (offset + height >= 100) {
        height -= 0.01;
    }
    return height;
}




module.exports = { getTidyData, getAggregateData, Time, conversions };
