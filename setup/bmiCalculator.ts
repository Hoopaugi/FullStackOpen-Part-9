interface CalculateBmiValues {
  height: number
  weight: number
}

const parseBmiArguments = (args: string[]): CalculateBmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const [, , h, w] = args;

  if(isNaN(Number(h))) throw new Error(`${h} is not a valid height value`);
  if(isNaN(Number(w))) throw new Error(`${w} is not a valid weight value`);

  return {
    height: Number(h),
    weight: Number(w)
  };
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi = (weight / ((height / 100) * (height / 100)));

  let bmiString = null;

  // Ranges from https://en.wikipedia.org/wiki/Body_mass_index

  if (bmi > 40 ) {
    bmiString = 'Obese (Class III)';
  } else if (bmi > 35) {
    bmiString = 'Obese (Class II)';
  } else if (bmi > 30) {
    bmiString = 'Obese (Class I)';
  } else if (bmi > 25) {
    bmiString = 'Overweight (Pre-obese)';
  } else if (bmi > 18.5) {
    bmiString = 'Normal range';
  } else if (bmi > 17) {
    bmiString = 'Underweight (Mild thinness)';
  } else if (bmi > 16) {
    bmiString = 'Underweight (Moderate thinness)';
  } else {
    bmiString = 'Underweight (Severe thinness)';
  }

  return `${bmiString}`;
};

try {
  const { height, weight } = parseBmiArguments(process.argv);

  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';

  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }

  console.log(errorMessage);
}

export default calculateBmi;
