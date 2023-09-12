import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from "./diaries.types";
import toNewDiaryEntry from "./diaries.utils";
import diaryEntries from "../../../data/entries.json";

const diaries: DiaryEntry[] = diaryEntries.data.map(obj => {
  const object = toNewDiaryEntry(obj)  as DiaryEntry;

  object.id = obj.id;

  return object;
});

const getAll = (): DiaryEntry[] => {
  return diaries;
};

const getAllNonSensitive = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find(d => d.id === id);

  return entry;
};

const create = ( entry: NewDiaryEntry ): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...entry
  };

  diaries.push(newDiaryEntry);

  return newDiaryEntry;
};

export default { getAll, getAllNonSensitive, findById, create };
