import express from 'express';

import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if(!height || !weight || isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: 'malformed parameters' });
  }

  const bmi = calculateBmi(height, weight);

  const result = {
    height,
    weight,
    bmi
  };

  return res.json(result);
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;

  if (!target || !daily_exercises) {
    return res.send({ error: 'missing parameter' });
  }

  if (isNaN(Number(target)) || !Array.isArray(daily_exercises)) {
    return res.send({ error: 'malformed parameter' });
  }

  let malformed = false;

  daily_exercises.forEach(element => {
    if(isNaN(Number(element))) {
      malformed = true;
    }
  });

  if (malformed) {
    return res.send({ error: 'malformed daily_exercises parameter' });
  }

  const result = calculateExercises(daily_exercises.map((day) => Number(day)), Number(target));

  return res.send({ result });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});