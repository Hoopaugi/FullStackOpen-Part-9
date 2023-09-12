import { IDiaryEntry } from "../types"

interface DiaryEntryProps {
  entry: IDiaryEntry
}

const DiaryEntry = (props: DiaryEntryProps) => {
  const entry = props.entry

  return (
    <>
      <h3>{entry.date}</h3>
      <p>Visibility: {entry.visibility}</p>
      <p>Weather: {entry.weather}</p>
    </>
  )
}

export default DiaryEntry
