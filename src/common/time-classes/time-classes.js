"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversions = {
    millisecond: 1,
    second: 1000,
    minute: 60000,
    hour: 3600000,
    day: 86400000
};
exports.xmlns = "http://www.w3.org/2000/svg";
/*
represents a time with
a start and an end
= essentially an event with a start & an end
*/
var Time = /** @class */ (function () {
    function Time(start, end) {
        this.start = start;
        this.end = end;
    }
    /*returns the time object for
    the current day
    
    n is the # of days after/before today*/
    Time.today = function (n) {
        if (n === void 0) { n = 0; }
        var start = (new Date((new Date()).getTime() + exports.conversions.day * n)).toDateString();
        /*end is 24 hours after start*/
        var end = (new Date(start)).getTime() + exports.conversions.day;
        return new Time(new Date(start), new Date(end));
    };
    /* basically check if a certain test date is within range of the target */
    Time.edge = function (target, tester, tolerance) {
        return tester >= +target - +tolerance && tester <= +target + +tolerance;
    };
    Object.defineProperty(Time.prototype, "duration", {
        /*
        duration gets
        recomputed whenever start
        or end change
        */
        get: function () {
            return +this.end - +this.start;
        },
        enumerable: true,
        configurable: true
    });
    /* see if a given date falls in the time range */
    Time.prototype.contains = function (date, tolerance) {
        if (tolerance === void 0) { tolerance = 0; }
        var t = date.getTime();
        return t >= this.start.getTime() - tolerance && t <= this.end.getTime() + tolerance;
    };
    Time.prototype.edgeStart = function (date, tolerance) {
        if (tolerance === void 0) { tolerance = 0; }
        return Time.edge(this.start.getTime(), date.getTime(), tolerance);
    };
    Time.prototype.edgeEnd = function (date, tolerance) {
        if (tolerance === void 0) { tolerance = 0; }
        return Time.edge(this.end.getTime(), date.getTime(), tolerance);
    };
    return Time;
}());
exports.Time = Time;
var PrayerTime = /** @class */ (function (_super) {
    __extends(PrayerTime, _super);
    function PrayerTime(name, start, end) {
        var _this = _super.call(this, start, end) || this;
        //the name of the prayer
        _this.name = name;
        _this.tolerance = exports.conversions.minute * 15;
        return _this;
    }
    Object.defineProperty(PrayerTime.prototype, "notifiable", {
        get: function () {
            //check if we should notify the user now
            return this.contains(new Date());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrayerTime.prototype, "onEdge", {
        get: function () {
            //checks if we're on the edge of a prayer about to start
            return this.edgeStart(new Date(), this.tolerance);
        },
        enumerable: true,
        configurable: true
    });
    return PrayerTime;
}(Time));
exports.PrayerTime = PrayerTime;
/*
like TimeBlock but now **positions**
the TimeBlock within a context time
with a given scaling function
*/
var OrderedTimeBlock = /** @class */ (function (_super) {
    __extends(OrderedTimeBlock, _super);
    function OrderedTimeBlock(start, end, context) {
        var _this = _super.call(this, start, end) || this;
        /*
        the context Time
        assume it's is greater than
        or equal to the OrderedTimeBlock
        in timespan
        */
        _this.ctx = context;
        return _this;
        /*
        the scaling function
        expects the time in ms
        and converts it to a size unit
        */
    }
    OrderedTimeBlock.fromTime = function (time, ctx) {
        return new OrderedTimeBlock(time.start, time.end, ctx);
    };
    Object.defineProperty(OrderedTimeBlock.prototype, "startOffset", {
        /* with the start offset
        we can position the OrderedTimeBlock
        within the context
        
        **NOTE**:
          (#start - #end) returns a negative number when
          the TimeBlock begins after the context
          (which is for usual use)
        */
        get: function () {
            return +this.ctx.start - +this.start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderedTimeBlock.prototype, "startOffsetPercent", {
        /*
        get what percent of the context
        the block is offset
        */
        get: function () {
            return this.startOffset / (+this.ctx.end - +this.ctx.start);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderedTimeBlock.prototype, "percent", {
        /*
        get what percent of the context
        is taken up by the specific time block
      
        returns the duration as a percentage
        of a larger container
        useful for non-linear representations
        especially
        */
        get: function () {
            return this.duration / this.ctx.duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderedTimeBlock.prototype, "pixel", {
        /*
        turns the duration into pixels
        based on a scaling function
        */
        get: function () {
            return this.duration;
        },
        enumerable: true,
        configurable: true
    });
    return OrderedTimeBlock;
}(Time));
exports.OrderedTimeBlock = OrderedTimeBlock;
/*
module.exports = {
    Time: Time,
    Ordered: OrderedTimeBlock,
    Prayer: PrayerTime,
    Conversions: conversions,
    XMLNS: xmlns
}
*/
//# sourceMappingURL=time-classes.js.map