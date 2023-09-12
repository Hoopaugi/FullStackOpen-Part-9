import { CoursePart } from "../types"

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = (props: ContentProps) => {
  return (
    <>
      {
        props.courseParts.map((coursePart) => <p key={coursePart.name}>{coursePart.name} {coursePart.exerciseCount}</p>)
      }
    </>
  )
}

export default Content
