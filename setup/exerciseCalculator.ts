interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface CalculateExerciseValues {
  days: number[]
  target: number
}

const parseArguments = (args: string[]): CalculateExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments')

  const [bin, sourcePath, t, ...d] = args

  if(isNaN(Number(t))) throw new Error(`${t} is not a valid target value`)

  const days = d.map((day) => {
    if(isNaN(Number(day))) throw new Error(`${day} is not a valid value`)
    return Number(day)
  })

  return {
    days: days,
    target: Number(t)
  }
}

const calculateExercises = (days: Array<number>, target: number): Result => {
  const average = days.reduce((a, c) => a + c, 0) / days.length;

  const rating = average >= target ? 3 : average > target / 2 ? 2 : 1

  const ratingStrings = ["Try harder next time", "Not too bad but could be better", "Well done"]

  const result = {
    periodLength: days.length,
    trainingDays: days.filter((day) => day > 0).length,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingStrings[rating-1],
    target: target,
    average: average
  }

  return result
}

try {
  const {target, days} = parseArguments(process.argv)

  console.log(calculateExercises(days, target))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'

  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }

  console.log(errorMessage);
}
