import { Request, Response } from "express";

import diagnosesServices from "./diagnoses.services";
import { parseCode } from "./diagnoses.utils";

export const getAll = (_req: Request, res: Response) => {
  const diagnoses = diagnosesServices.getAll();

  res.json(diagnoses);
};

export const findByCode = (_req: Request, res: Response) => {
  const code = parseCode(_req.params.code);

  const diagnosis = diagnosesServices.findByCode(code);

  if (!diagnosis) {
    res.status(404).json({error: `no code ${code} found`});
  }

  res.json(diagnosis);
};

export default { getAll, findByCode };
