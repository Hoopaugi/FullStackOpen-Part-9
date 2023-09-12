import React, { useState } from "react"

import { INewDiaryEntry, Weather, Visibility } from "../types"

interface NewDiaryEntryFormProps {
  newEntryHandler: (newEntry: INewDiaryEntry) => void
}

const NewDiaryEntryForm = (props: NewDiaryEntryFormProps) => {
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState<Weather>(Weather.Cloudy)
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good)
  const [comment, setComment] = useState('')

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()

    const newEntry = {
      date, weather, visibility, comment
    }

    props.newEntryHandler(newEntry)

    setDate('')
    setWeather(Weather.Sunny)
    setVisibility(Visibility.Good)
    setComment('')
  };

  return (
    <>
      <h2>Add new entry</h2>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)} 
        /><br/>
        <label>
          Weather
          <select
            defaultValue={Weather.Sunny}
            onChange={(event) => setWeather(event.target.value as Weather)}
          >
            {
              Object.keys(Weather).map(w => <option key={w} value={w}>{w}</option>)
            }
          </select>
        </label><br/>
        <label>
          Visibility
          <select
            defaultValue={Visibility.Good}
            onChange={(event) => setVisibility(event.target.value as Visibility)}
          >
            {
              Object.keys(Visibility).map(v => <option key={v} value={v}>{v}</option>)
            }
          </select>
        </label><br/>
        <input
          placeholder="Comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)} 
        />
      <button type='submit'>add</button>
    </form>
  </>
  )
}

export default NewDiaryEntryForm
