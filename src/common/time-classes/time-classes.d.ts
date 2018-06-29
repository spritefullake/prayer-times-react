export declare const conversions: {
    millisecond: number;
    second: number;
    minute: number;
    hour: number;
    day: number;
};
export declare const xmlns = "http://www.w3.org/2000/svg";
export declare class Time {
    start: Date;
    end: Date;
    constructor(start: Date, end: Date);
    static today(n?: number): Time;
    static edge(target: Date | number, tester: Date | number, tolerance: Date | number): boolean;
    readonly duration: number;
    contains(date: Date, tolerance?: number): boolean;
    edgeStart(date: Date, tolerance?: number): boolean;
    edgeEnd(date: Date, tolerance?: number): boolean;
}
export declare class PrayerTime extends Time {
    name: string;
    start: Date;
    end: Date;
    tolerance: number;
    constructor(name: string, start: Date, end: Date);
    readonly notifiable: boolean;
    readonly onEdge: boolean;
}
export declare class OrderedTimeBlock extends Time {
    ctx: Time;
    constructor(start: Date, end: Date, context: Time);
    static fromTime(time: Time, ctx: Time): OrderedTimeBlock;
    readonly startOffset: number;
    readonly startOffsetPercent: number;
    readonly percent: number;
    readonly pixel: number;
}
