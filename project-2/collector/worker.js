import { parentPort } from "worker_threads";

let count = 0;
let running = 0;

function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) return false;
    }
    
    return true;
}