const myHeaders = new Headers();

myHeaders.set("Access-Control-Allow-Origin", "*");
myHeaders.set("Cross-Origin-Opener-Policy", "same-origin");
myHeaders.set("Cross-Origin-Embedder-Policy", "require-corp");

// For measuring the speed of various functions
const timeKeeper = {
    start: 0,

    timeStart() {
        this.start = performance.now();
    },

    timeStop() {
        return performance.now() - this.start;
    }
};

export { timeKeeper };