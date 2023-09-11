import { Request, Response } from "express";

import patientsServices from "./patients.services";
import { parseId } from "./patients.utils";

export const getAll = (_req: Request, res: Response) => {
  const patients = patientsServices.getAllNonSensitive();

  res.json(patients);
};

export const findById = (_req: Request, res: Response) => {
  const id = parseId(_req.params.id);

  const patient = patientsServices.findById(id);

  if (!patient) {
    res.status(404).json({error: `no patient with id ${id} found`});
  }

  res.json(patient);
};

export default { getAll, findById };
