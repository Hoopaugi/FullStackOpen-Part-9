import { Request, Response } from "express";

import patientsServices from "./patients.services";

export const getAll = (_req: Request, res: Response) => {
  const patients = patientsServices.getAllNonSensitive();

  res.json(patients);
};

export default { getAll };
