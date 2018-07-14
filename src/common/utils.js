//utility functions to help in calculations
import getData from './data'
import { DateTime, Interval } from 'luxon'

export function getSizing(data, ctx, decPlaces = 100) {

    const tops = data.map(i => i.time).map(invl => {
        const total = ctx.length('seconds');
        //get the offset of invl from ctx
        const offset = ctx.start.diff(invl.start).as('seconds');
        // offset/total gives the percent offset
        // multiplying by window height gives us non-percent units
        return Math.round(Math.abs(offset / total) * decPlaces) / decPlaces;
    });
    // heights are given first as what percent one interval is of the ctx
    // and then the heights are converted to non-percent units
    const heights = data.map(i => i.time).map(invl => {
        return Math.round(Math.abs(invl.length('milliseconds') / ctx.length('milliseconds')) * decPlaces) / decPlaces;
    });
    return { tops, heights };
}


export function nextPrayer({ date, coords }) {

    //first calculate all the next prayer times
    const data = getData(
        date.toJSDate(), coords,
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