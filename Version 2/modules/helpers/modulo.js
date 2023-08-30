import { myHeaders } from "./header.js";

// Proper modulo function for JavaScript
/**
* @param {number} [n] "Is the number that is to be checked"
* @param {number} [m] "Is the number that is divided by"
*/
function mod(n, m) {
    return ((n % m) + m) % m;
}

export {mod};