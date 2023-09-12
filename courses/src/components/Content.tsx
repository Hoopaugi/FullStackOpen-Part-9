import { CoursePart } from "../types"
import Part from "./Part"

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = (props: ContentProps) => {
  return (
    <>
      {
        props.courseParts.map((coursePart) => <Part key={coursePart.name} coursePart={coursePart} />)
      }
    </>
  )
}

export default Content
