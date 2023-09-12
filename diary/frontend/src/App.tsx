import { useState, useEffect } from 'react';
import axios from 'axios';

import NewDiaryEntryForm from './components/NewDiaryEntryForm';
import DiaryEntries from "./components/DiaryEntries";
import { IDiaryEntry, INewDiaryEntry } from './types';
import Notification from './components/Notification';

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<IDiaryEntry[]>([]);
  const [notification, setNotification] = useState('')

  useEffect(() => {
    axios.get('http://localhost:5000/api/diaries').then(response => {
      setDiaryEntries(response.data)
    })
  }, [])

  const notify = (message: string) => {
    setNotification(message)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const newEntryHandler = async (newEntry: INewDiaryEntry) => {
    const entry = { ...newEntry, id: diaryEntries.length + 1}

    axios.post('http://localhost:5000/api/diaries', entry).then(response => {
      setDiaryEntries(diaryEntries.concat(response.data))

      notify('Added a new diary entry!')
    }).catch (error => {
      const message = error.response.data

      console.error(error)

      notify(message)
    })
  };

  return (
    <>
      <Notification notification={notification} />
      <NewDiaryEntryForm newEntryHandler={newEntryHandler} />
      <DiaryEntries entries={diaryEntries}/>
    </>
  );
};

export default App;
