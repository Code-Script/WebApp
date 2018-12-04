import _ from 'lodash';

// range = 3
export function getStars(range) {
    // range--;
    let a = "star",
        b = "star_half",
        c = "star_border";

    let stars = [c, c, c, c, c];

    let int = Math.trunc(range);
    let dec = range - int;

    let i = 0;

    while(i < int && i < 5) {
        stars[i] = a;
        i++;
    }

    if(dec >= 0.5 && dec < 1 && i < 5) {
        stars[i] = b;
    }

    return stars;
}