import { myHeaders } from "./header.js";

// Proper modulo function for JavaScript
/**
* @param {number} [a] "Is the number dividend"
* @param {number} [n] "Is the number divisor"
*/
function mod(a, n) {
    if (!Number.isInteger(a) || !Number.isInteger(n)) {
        throw new Error('Invalid arguments, this function only accepts types of integer')
    }
    return ((a % n) + n) % n;
}

export {mod};