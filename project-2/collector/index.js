import express from 'express';
import { Worker } from "worker_threads";


const PORT = process.env.PORT || 3000;
const app = express();

let primesFound = 0;

const worker = new Worker('./worker.js');



app.use(express.json());

app.get('/status', (req, res) => {
    res.status(200).json({
        primesFound,
        pid: process.pid,
        timestamp: new Date().toISOString()
    });
});

app.post('/metrics', (req, res) => {
    const { data } = req.body;

    if(!data) { res.status(400).send("No data"); }
    else {
        metrics.push(data);
        res.status(200).send("saved");
    }
});

app.listen(PORT, () => {
    console.log('Collector running on ${PORT}')
});
