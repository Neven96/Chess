const myHeaders = new Headers();

myHeaders.set("Access-Control-Allow-Origin", "*");
myHeaders.set("Cross-Origin-Opener-Policy", "same-origin");
myHeaders.set("Cross-Origin-Embedder-Policy", "require-corp");

export { myHeaders };