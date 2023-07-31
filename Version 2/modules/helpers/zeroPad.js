import { myHeaders } from "../header.js";

function zeroPad(length, num) {
    return num.toString().padStart(length, "0");
}

export { zeroPad };