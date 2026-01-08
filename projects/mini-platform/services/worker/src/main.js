let running = true;

function worker() {
    console.log("[WORKER]: started");

    const interval = setInterval(() => {
        if(!running) {
            console.log("[WORKER]: stopping loop");
            clearInterval(interval);
            process.exit(0);
        }

        console.log("[WORKER]: This is a message from the worker")
    }, 1000);
}

function shutdown(signal) {
    console.log("[WORKER]: received signal " + signal);
    running = false;
}

/**
 * Signals
 */
process.on("SIGINT", shutdown);   // Ctrl+C
process.on("SIGTERM", shutdown);  // Docker / Kubernetes stop
process.on("SIGQUIT", shutdown);

worker();