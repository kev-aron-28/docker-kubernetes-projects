import express from 'express';

const app = express();
const PORT = 3001;
app.use(express.json());

app.get('/status', (req, res) => {
  res.status(200).send('OK');
});

app.get('/multiply', (req, res) => {
  const { a = 0, b = 0 } = req.query;

  if(!a || !b) return res.status(500).json({ error: "Must provide both parameters" });

  const result = parseInt(a) * parseInt(b);
  
  return res.json({ result });
});

app.listen(PORT, () => {
  console.log(`APP LISTENING ON PORT ${PORT}`);
});

