interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (days: Array<number>, target: number): Result => {
  const average = days.reduce((a, c) => a + c, 0) / days.length;

  const rating = average > target ? 3 : average > target / 2 ? 2 : 1

  const ratingStrings = ["Try harder next time", "Not too bad but could be better", "Well done"]

  const result = {
    periodLength: days.length,
    trainingDays: days.filter((day) => day > 0).length,
    success: average > target,
    rating: rating,
    ratingDescription: ratingStrings[rating-1],
    target: target,
    average: average
  }

  return result
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
