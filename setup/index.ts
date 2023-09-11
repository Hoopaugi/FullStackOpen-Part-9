import express from 'express'

import calculateBmi from './bmiCalculator';

const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if(!height || !weight || isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: 'malformed parameters' })
  }

  const bmi = calculateBmi(height, weight)

  const result = {
    height,
    weight,
    bmi
  }

  return res.json(result);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});