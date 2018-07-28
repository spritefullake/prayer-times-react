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


//take the prayer data 
//and actually calculate 
//the offsets and the
//heights for the 
//individual prayers
//represented onscreen
const dummyRenderArgs = {
    date: DateTime.local(),
    coords: [0, 0],
    ctx: Interval.fromDateTimes(DateTime.local(), DateTime.local()),
    dataFunction: (d = DateTime.local(), c = [0, 0]) => [
       {name: "", time: Interval.fromDateTimes(DateTime.local(), DateTime.local())}]
};


export function renderPrayerData({ date, coords, ctx, dataFunction } = dummyRenderArgs) {
    //ctx is a luxon interval
    let data = dataFunction(date.toJSDate(), coords)

    //orepending the isha that ends at fajr 
    //during the same day (it actually started 
    //on the previous day but extends into the next day)

    data = [{
        name: "isha",
        time: Interval.fromDateTimes(
            date.startOf('day'),
            ...data.filter(i => i.name == "fajr").map(i => i.time.end)
        )
    }].concat(data);

    //choose how many decimal places we will
    //round to by setting the # of zeros after 1
    const decPlaces = 1000;
    //more places means more precision
    //with respect to rendering 
    const { tops, heights } = getSizing(data, ctx, decPlaces);


    data[0].time = Interval.fromDateTimes(...dataFunction(date.minus({ days: 1 }).toJSDate(), coords)
        .filter(i => i.name == "isha")
        .map(i => i.time.start),
        data[1].time.start
    )

    return data.map((i, index, arr) => {


        /*
        
                    if (i.name == "isha" && i.time.end == arr.filter(i => i.name = "fajr")
                .map(i => i.time.start)[0] ) {
                        //patching in the starting time
                        //for the isha that started the
                        //previous day by changing the 
                        //time property after the heights
                        //have been calculated
                        const revisedIshaTime = Interval.fromDateTimes(
                            ...getData(this.props.date.minus({ days: 1 }).toJSDate(), this.props.coords)
                                .filter(i => i.name == "isha")
                                .map(i => i.time.start),
                            ...data
                                .filter(i => i.name == "isha" && i.time.abutsStart(
                                    ...arr.filter(i => i.name == "fajr").map(i => i.time)
                                ))
                                .map(i => i.time.end)
                        );
                        console.log("ISHA TIME CHASNE")
                        i.time = revisedIshaTime;
                    }
                    */


        return {
            ...i,
            top: tops[index],
            height: heights[index]
        }
    })

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

export function findTimeZone(coords) {

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