import { myHeaders } from "./header.js";

// Adds two equal length arrays together, item by item
function arrayAddition(array1, array2) {
    if (!Array.isArray(array1) || !Array.isArray(array2)) {
        throw new Error('Invalid argument, this function only accepts types of Arrays')
    }
    if (array1.length !== array2.length) {
        throw new Error('This function can only accept arrays of equal length');
    }
    return array1.map((item, index) => item + array2[index]);
}

// Subtracts two equal length arrays from each other, item by item
function arraySubtraction(array1, array2) {
    if (!Array.isArray(array1) || !Array.isArray(array2)) {
        throw new Error('Invalid argument, this function only accepts types of Arrays')
    }
    if (array1.length !== array2.length) {
        throw new Error('This function can only accept arrays of equal length');
    }
    return array1.map((item, index) => item - array2[index]);
}

function arrayCompare(array1, array2) {
    if (!Array.isArray(array1) || !Array.isArray(array2)) {
        throw new Error('Invalid argument, this function only accepts types of Arrays')
    }
    return array1.toString() === array2.toString();
}

export { arrayAddition, arraySubtraction, arrayCompare };