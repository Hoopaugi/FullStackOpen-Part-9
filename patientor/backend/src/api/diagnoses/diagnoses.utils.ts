import { getProp, isObject, isString, isObjectArray } from "../../utils";
import { Diagnosis } from "./diagnoses.types";

export const parseCode = (code: unknown): string => {
  if (!code || !isString(code)) {
    throw new Error('Incorrect or missing code');
  }

  return code;
};

export const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

export const parseLatin = (latin: unknown): string | undefined => {
  if (!isString(latin)) {
    throw new Error('Incorrect latin');
  }

  return latin ? latin : undefined;
};

const parseDiagnosis = (obj: unknown): Diagnosis => {
  if (!obj || !isObject(obj)) {
    throw new Error('Incorrect or missing diagnosis');
  }
  const diagnosis = {
    code: parseCode(getProp(obj, 'code')),
    name: parseName(getProp(obj, 'name')),
    latin: parseLatin(getProp(obj, 'latin'))
  };

  return diagnosis;
};

export const parseDiagnoses = (arr: unknown): Diagnosis[] => {
  if (!arr || !isObjectArray(arr)) {
    throw new Error('Incorrect or missing diagnoses');
  }

  const diagnoses = arr.map(d => parseDiagnosis(d));

  return diagnoses;
};