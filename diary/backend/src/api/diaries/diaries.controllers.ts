import { Request, Response } from "express";

import diariesServices from "./diaries.services";
import { parseNumber  } from "../../utils";
import toNewDiaryEntry from "./diaries.utils";

const getAllNonSensitive = (_req: Request, res: Response) => {
  const nonSensitiveDiaries = diariesServices.getAllNonSensitive();

  res.send(nonSensitiveDiaries);
};

const getById = (req: Request, res: Response) => {
  const id = parseNumber(Number(req.params.id));

  const diary = diariesServices.findById(id);

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
};

const create = (req: Request, res: Response) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);

    const addedEntry = diariesServices.create(newDiaryEntry);

    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';

    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }

    res.status(400).send(errorMessage);
  }
};

export default { getAllNonSensitive, getById, create };
