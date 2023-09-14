import { Request, Response } from "express";

import patientsServices from "./patients.services";
import { parseId, toNewPatient, toNewEntry } from "./patients.utils";

export const getAll = (_req: Request, res: Response) => {
  const patients = patientsServices.getAllNonSensitive();

  res.json(patients);
};

export const findById = (req: Request, res: Response) => {
  try {
    const id = parseId(req.params.id);

    const patient = patientsServices.findById(id);
  
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({error: `no patient with id ${id} found`});
    }
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';

    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }

    res.status(400).send(errorMessage);
  }
};

export const create = (req: Request, res: Response) => {
  try {
    const newPatientData = toNewPatient(req.body);

    const newPatient = patientsServices.create(newPatientData);
  
    res.json(newPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';

    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }

    res.status(400).send(errorMessage);
  }
};

export const createEntry = (req: Request, res: Response) => {
  try {
    const id = parseId(req.params.id);

    const newEntryData = toNewEntry(req.body);

    const newEntry = patientsServices.createEntry(id, newEntryData);
  
    res.json(newEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';

    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }

    res.status(400).send(errorMessage);
  }
};

export default { getAll, findById, create, createEntry };
