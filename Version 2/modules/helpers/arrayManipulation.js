import { myHeaders } from "./header.js";

// Adds two equal length arrays together, item by item
function arrayAddition(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    }
    return array1.map((item, index) => item + array2[index]);
}

// Subtracts two equal length arrays from each other, item by item
function arraySubtraction(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    }
    return array1.map((item, index) => item - array2[index]);
}

function arrayCompare(array1, array2) {
    return array1.toString() === array2.toString();
}

export { arrayAddition, arraySubtraction, arrayCompare };