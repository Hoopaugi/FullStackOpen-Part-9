import DiaryEntry from "./DiaryEntry"
import { IDiaryEntry } from "../types"

interface DiaryEntriesProps {
  entries: IDiaryEntry[]
}

const DiaryEntries = (props: DiaryEntriesProps) => {
  const entries = props.entries

  return (
    <>
      <h2>Diary entries</h2>
      {
        entries.map(entry => <DiaryEntry key={entry.id} entry={entry} />)
      }
    </>
  )
}

export default DiaryEntries
