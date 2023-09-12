import { useState, useEffect } from 'react';
import axios from 'axios';

import NewDiaryEntryForm from './components/NewDiaryEntryForm';
import DiaryEntries from "./components/DiaryEntries";
import { IDiaryEntry, INewDiaryEntry } from './types';

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<IDiaryEntry[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/diaries').then(response => {
      setDiaryEntries(response.data)
    })
  }, [])

  const newEntryHandler = async (newEntry: INewDiaryEntry) => {
    const entry = { ...newEntry, id: diaryEntries.length + 1}

    axios.post('http://localhost:5000/api/diaries', entry).then(response => {
      setDiaryEntries(diaryEntries.concat(response.data))
    })
  };

  return (
    <>
      <NewDiaryEntryForm newEntryHandler={newEntryHandler} />
      <DiaryEntries entries={diaryEntries}/>
    </>
  );
};

export default App;
