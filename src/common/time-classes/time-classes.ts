
    export const conversions = {
        millisecond: 1,
        second: 1000,
        minute: 60000,
        hour: 3600000,
        day: 86400000
    };
    export const xmlns = "http://www.w3.org/2000/svg";

    /*
represents a time with
a start and an end
= essentially an event with a start & an end
*/
    export class Time {
        start: Date;
        end: Date;

        constructor(start: Date, end: Date) {
            this.start = start;
            this.end = end;
        }

        /*returns the time object for
        the current day
        
        n is the # of days after/before today*/
        static today(n = 0) {
            let start = (new Date((new Date()).getTime() + conversions.day * n)).toDateString();
            /*end is 24 hours after start*/
            let end = (new Date(start)).getTime() + conversions.day;

            return new Time(new Date(start), new Date(end));
        }

        /* basically check if a certain test date is within range of the target */
        static edge(target: Date | number, tester: Date | number, tolerance: Date | number) {
            return tester >= +target - +tolerance && tester <= +target + +tolerance;
        }
        /*
        duration gets 
        recomputed whenever start
        or end change
        */
        get duration(): number {
            return +this.end - +this.start;
        }

        /* see if a given date falls in the time range */
        contains(date: Date, tolerance = 0) {
            const t = date.getTime();
            return t >= this.start.getTime() - tolerance && t <= this.end.getTime() + tolerance;
        }

        edgeStart(date: Date, tolerance = 0) {
            return Time.edge(this.start.getTime(), date.getTime(), tolerance);
        }

        edgeEnd(date: Date, tolerance = 0) {
            return Time.edge(this.end.getTime(), date.getTime(), tolerance);
        }

    }

    export class PrayerTime extends Time {

        name: string;
        start: Date;
        end: Date;
        tolerance: number;
        constructor(name: string, start: Date, end: Date) {
            super(start, end);
            //the name of the prayer
            this.name = name;

            this.tolerance = conversions.minute * 15;
        }

        get notifiable() {
            //check if we should notify the user now
            return this.contains(new Date());
        }

        get onEdge() {
            //checks if we're on the edge of a prayer about to start
            return this.edgeStart(new Date(), this.tolerance);
        }


    }


    /*
    like TimeBlock but now **positions**
    the TimeBlock within a context time 
    with a given scaling function
    */

    export class OrderedTimeBlock extends Time {
        ctx: Time;

        constructor(start: Date, end: Date, context: Time) {
            super(start, end);

            /*
            the context Time
            assume it's is greater than
            or equal to the OrderedTimeBlock
            in timespan
            */
            this.ctx = context;

            /*
            the scaling function
            expects the time in ms
            and converts it to a size unit
            */
        }

        static fromTime(time: Time, ctx: Time) {
            return new OrderedTimeBlock(time.start, time.end, ctx);
        }
        /* with the start offset
        we can position the OrderedTimeBlock
        within the context
        
        **NOTE**: 
          (#start - #end) returns a negative number when
          the TimeBlock begins after the context
          (which is for usual use)
        */
        get startOffset(): number {
            return +this.ctx.start - +this.start;
        }
        /*
        get what percent of the context
        the block is offset
        */
        get startOffsetPercent(): number {
            return this.startOffset / (+this.ctx.end - +this.ctx.start);
        }
        /*
        get what percent of the context
        is taken up by the specific time block
      
        returns the duration as a percentage
        of a larger container
        useful for non-linear representations
        especially
        */
        get percent() {
            return this.duration / this.ctx.duration;
        }

        /*
        turns the duration into pixels
        based on a scaling function
        */
        get pixel(): number {
            return this.duration;
        }

    }


/*
module.exports = {
    Time: Time,
    Ordered: OrderedTimeBlock,
    Prayer: PrayerTime,
    Conversions: conversions,
    XMLNS: xmlns
}
*/
