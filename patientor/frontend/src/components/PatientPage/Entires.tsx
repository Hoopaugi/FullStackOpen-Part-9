import { Entry as IEntry } from "../../types"
import Entry from "./Entry"

interface EntriesProps {
  entries: IEntry[]
}

const Entries = (props: EntriesProps) => {
  const entries = props.entries

  return (
    <>
      <h3>entries</h3>
      {
        entries.map(entry => <Entry key={entry.id} entry={entry} />)
      }
    </>
  )
}

export default Entries
