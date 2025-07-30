import express from 'express';
import os from 'os'

const app = express();
const PORT = 3000;
app.use(express.json());

app.get('/status', (req, res) => {
  console.log('Hostname ' + os.hostname)

  res.status(200).send('OK');
});

app.get('/reverse', (req, res) => {
  const { text = '' } = req.query;

  if(!text) return res.status(500).json({ error: "Must provide a text" });

  const reversed = text.split('').reverse().join('')
  
  return res.json({ text: reversed });
});

app.listen(PORT, () => {
  console.log(`APP LISTENING ON PORT ${PORT}`);
});

