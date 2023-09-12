import { CoursePart } from "../types"

interface TotalProps {
  courseParts: CoursePart[]
}

const Total = (props: TotalProps) => {
  const total = props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)

  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}

export default Total
