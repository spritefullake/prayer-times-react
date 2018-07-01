
const PrayerTimes = require('prayer-times')
import { DateTime, Interval } from 'luxon'
import { Dimensions } from 'react-native'
export default function getData(date, coords, ctx) {
  //ctx is a luxon interval
  const data = processPrayers(date, coords)


  //mapping intervals; remember we tacked  
  //on the name property in #processPrayers
  const names = data.map(invl => invl.name)


  const tops = data.map(invl => {
    const total = ctx.length('seconds')

    //get the offset of invl from ctx
    const offset = ctx.start.diff(invl.start).as('seconds')

    // offset/total gives the percent offset
    // multiplying by window height gives us non-percent units


    return Math.abs(offset / total) * Dimensions.get('window').height / 10
  })

  // heights are given first as what percent one interval is of the ctx
  // and then the heights are converted to non-percent units
  const heights = data.map(invl => Math.abs(invl.length('seconds') / ctx.length('seconds')) * Dimensions.get('window').height)

  //let lastIndex = data.length - 1;
  //heights[lastIndex] = ishaShorten(tops[lastIndex], heights[lastIndex])

  const tidy = [];

  for (let i = 0; i < data.length; i++) {
    tidy.push({
      name: names[i],
      time: data[i].start,
      top: Math.round(tops[i]),
      height: Math.round(heights[i])
    })
  }
  return tidy;
}

function processPrayers(date, coords) {

  //important!
  //format the times in 24 hours format for this code to work correctly!
  let times = (new PrayerTimes()).getTimes(date, coords, 'auto', 'auto', '24h');

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
        let todayStart = DateTime.local().startOf('day');
        /* the next times will be in the format of javascript date objects */
        if (time == times["fajr"]) {
          //fajr ends at sunrise
          const sunrise = times["sunrise"]
          //substrings work because the 
          //prayer times module returns the times
          //in 24 hour time; ex: 04:23
          //so the length is always fixed
          nextTime = todayStart.plus({
            hours: +sunrise.substring(0, 2),
            minutes: +sunrise.substring(3, 5)
          })
        }
        else if (time == times["isha"]) {
          //isha ends when fajr begins


          const fajrTime = (new PrayerTimes())
            .getTimes(new Date(todayStart.plus({ days: 1 }).toISO()), coords, 'auto', 'auto', '24h')["fajr"]
          //similar substrings approach as above
          nextTime = todayStart.plus({
            days: 1,
            hours: +fajrTime.substring(0, 2),
            minutes: +fajrTime.substring(3, 5)
          })
        }
        else {
          let following = arr[index + 1]
          nextTime = todayStart.plus({
            hours: +following.substring(0, 2),
            minutes: +following.substring(3, 5)
          })

        }

        let startTime = todayStart.plus({
          hours: +time.substring(0, 2),
          minutes: +time.substring(3, 5)
        })

        let interval = Interval.fromDateTimes(startTime, nextTime)


        interval.name = prayers[index]

        return interval
      })

  );
}

//calculation helper
function ishaShorten(offset, height) {
  /* shorten the height of isha since it often goes offscreen */
  while (offset + height >= 100) {
    height -= 0.01;
  }
  return height;
}
