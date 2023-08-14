import { myHeaders } from "./header.js";

function arrayAddition(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    }
    return array1.map((item, index) => item + array2[index]);
}

function arraySubtraction(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    }
    return array1.map((item, index) => item - array2[index]);
}

export { arrayAddition, arraySubtraction };