//utility functions to help in calculations
import getData from './data'
import { DateTime, Interval } from 'luxon'

import { Location, SQLite, FileSystem, Asset } from 'expo'


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


export async function findAddress(address, coords) {
    //if the address was already 
    //reverse geocoded, there
    //is no use in using an 
    //expensive operation again
    if (address) {
        return address;
    }

    let res = await Location.reverseGeocodeAsync({ latitude: coords[0], longitude: coords[1] });
    return res;
}

export function findTimeZone(coords){
    
}

export async function downloadTimeZoneData() {

    const dbName = 'newbie.db';

    //if the db has already been populated,
    //skip having to execute expensive sql statements
    if ((await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}/SQLite/${dbName}`)).exists) {
        return;
    }

    //use Asset expo lib to get uri
    const localURI = Asset.fromModule(require(`./db/times.sql`)).uri;
    const targetURI = `${FileSystem.documentDirectory}/SQLite/timmy.db`;

    //download the db file to the device

    await FileSystem.downloadAsync(
        localURI,
        targetURI
    );

    const dbString = await FileSystem
        .readAsStringAsync(
            targetURI
        );



    //split the sql file into statements, making sure 
    //to include the semicolons that delimit statements
    const dbStatements = dbString.split(";")
        .filter(statement => statement != "")
        .map(statement => statement + ";");


    const db = SQLite.openDatabase(dbName)

    db.transaction(async tx => {

        for (let statement of dbStatements) {
            doStatement(tx, statement);
        }


    },
        function txError(err) {
            console.log("An error occured with the transaction ", err);
        },
        function txSuccess() {
            console.log("The transaction was successful!!!")
        }
    );
}


function doStatement(tx, statement, arr = [],
    onSuccess = (suc, res) => console.log("The result of the tx is ", res),
    onError = (err) => console.log("there was a db error, ", err)) {

    tx.executeSql(statement, arr, onSuccess, onError);
}