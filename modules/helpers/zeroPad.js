import { myHeaders } from "./header.js";

// Adds zeros in front of a string to pad it correctly
function zeroPad(length, num) {
    return num.toString().padStart(length, "0");
}

export { zeroPad };