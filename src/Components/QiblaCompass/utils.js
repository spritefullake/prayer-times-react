export const KAABA_COORDS = [21.4225, 39.8262];



function dot(u,v){
    return u.map((num,ind) => num * v[ind]).reduce((acc,cur) => acc + cur, 0);
}
function mag(u){
    return Math.sqrt(u.reduce((acc,cur) => cur*cur + acc,0));
}


//uses the spherical trigonometry solution 
//of finding the angle between two points on 
//a sphere (with the angle pointing 
//along a great circle curve)
function findBearingBetween(lat1, lon1, lat2, lon2) {
    const lonDelta = (lon2 - lon1);//delta phi
    const y = Math.sin(lonDelta) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lonDelta);
    return Math.atan2(y, x);
    //works
}

export function findQiblaBearing(coords){
    return findBearingBetween(...coords,...KAABA_COORDS);
}

export function prettyBearing(bearing){
    //since findQiblaBearing returns a North of East bearing
    //we need to rotate it to turn it into a East of North bearing
    return 90 - (bearing * 180 / Math.PI + 90);
}