import { Request, Response } from "express";

import patientsServices from "./patients.services";
import { parseId, parseNewPatient } from "./patients.utils";

export const getAll = (_req: Request, res: Response) => {
  const patients = patientsServices.getAllNonSensitive();

  res.json(patients);
};

export const findById = (_req: Request, res: Response) => {
  const id = parseId(_req.params.id);

  const patient = patientsServices.findById(id);

  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json({error: `no patient with id ${id} found`});
  }
};

export const create = (req: Request, res: Response) => {
  const data = parseNewPatient({ ...req.body });

  const patient = patientsServices.create(data);

  res.json(patient);
};

export default { getAll, findById, create };
