const KAABA_COORDS = [21.4225, 39.8262];

function tryFind(srcCoords, destCoords, radius = 1) {

    srcCoords = srcCoords.map(toRadians);
    destCoords = destCoords.map(toRadians);

    const src = sphereToRect([radius, ...srcCoords]);
    const dest = sphereToRect([radius, ...destCoords]);

    const normal = cross(src, dest);


    const sphereGrad = (x, y, z) => [2 * x, 2 * y, 2 * z];
    const tanAtSrc = cross(src,normal);

    return angleBetween([tanAtSrc[0],tanAtSrc[1]],[-src[1],src[0]]);

}
function toNVector(coords){
    return [ Math.cos(coords[0]) * Math.cos(coords[1]), Math.cos(coords[0]) * Math.sin(coords[1]), 
Math.sin(coords[0])];
}

function toRadians(degs) {
    return degs * Math.PI / 180;
}

function sphereToRect(coords) {
    const [p, theta, phi] = coords;

    const x = p * Math.sin(phi) * Math.cos(theta);
    const y = p * Math.sin(phi) * Math.sin(theta);
    const z = p * Math.cos(phi);

    return [x, y, z];

}
function rectToSphere(coords) {
    const [x, y, z] = coords;
    const p = Math.sqrt(x * x + y * y + z * z);
    const phi = Math.acos(z / p);
    const theta = Math.acos(x / p / Math.sin(phi));

    return [p, theta, phi];
}
function cross(u, v) {
    const [a, b, c] = u;
    const [e, f, g] = v;
    return [b * g - f * c, -(a * g - e * c), a * f - e * b];
}
function dot(u,v){
    return u.map((num,ind) => num * v[ind]).reduce((acc,cur) => acc + cur, 0);
}
function mag(u){
    return Math.sqrt(u.reduce((acc,cur) => cur*cur + acc,0));
}
function normalize(u){
    return u.map(val => val / mag(u));
}
function angleBetween(u,v){
    return Math.acos(dot(u,v)/  (mag(u) * mag(v)) );
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