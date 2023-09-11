import { Request, Response } from "express";

import diagnosesServices from "./diagnoses.services";

export const getAll = (_req: Request, res: Response) => {
  const diagnoses = diagnosesServices.getAll();

  res.json(diagnoses);
};

export default { getAll };
