import { CoursePart } from "../types"
import { assertNever } from "../utils"

interface PartProps {
  coursePart: CoursePart
}

const Part = (props: PartProps) => {
  const part = props.coursePart

  switch (part.kind) {
    case 'basic':
      return (
        <>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p>{part.description}</p>
        </>
      )
    case 'group':
      return (
        <>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p>Project exercises {part.groupProjectCount}</p>
        </>
      )
    case 'background':
      return (
        <>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p>{part.description}</p>
          <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
        </>
      )
    case 'special':
      return (
        <>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p>{part.description}</p>
          <p>required skills: {part.requirements.join(', ')}</p>
        </>
      )
    default:
      return assertNever(part)
  }

}

export default Part
