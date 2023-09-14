import { Entry as IEntry } from "../../types"
import Diagnosis from "./Diagnosis"

interface EntryProps {
  entry: IEntry
}

const Entry = (props: EntryProps) => {
  const entry = props.entry
  const codes = entry.diagnosisCodes ? entry.diagnosisCodes : []
  return (
    <>
      <p>{entry.date} <i>{entry.description}</i></p>
      {
        codes.map(code => <Diagnosis key={code} code={code} />)
      }
    </>
  )
}

export default Entry
