//utility functions to help in calculations


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
