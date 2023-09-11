import { isString, isObject, getProp } from "../../utils";
import { PatientData, NewPatientData } from "./patients";

export const parseId = (id: unknown): string => {
  if (!id || !isString(id)) {
    throw new Error('Incorrect or missing id');
  }

  return id;
};

export const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

export const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error('Incorrect or missing dateOfBirth');
  }

  return dateOfBirth;
};

export const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

export const parseGender = (gender: unknown): string => {
  if (!gender || !isString(gender)) {
    throw new Error('Incorrect or missing gender');
  }

  return gender;
};

export const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

export const parsePatient = (object: unknown): PatientData => {
  if (!object || !isObject(object)) {
    throw new Error('Incorrect or missing data');
  }

  const newPatientData: PatientData = {
    id: parseId(getProp(object, 'id')),
    name: parseName(getProp(object, 'name')),
    dateOfBirth: parseDateOfBirth(getProp(object, 'dateOfBirth')),
    ssn: parseSsn(getProp(object, 'ssn')),
    gender: parseGender(getProp(object, 'gender')),
    occupation: parseOccupation(getProp(object, 'occupation'))
  };
  
  return newPatientData;
};

export const parseNewPatient = (object: unknown): NewPatientData => {
  if (!object || !isObject(object)) {
    throw new Error('Incorrect or missing data');
  }

  const newPatientData: NewPatientData = {
    name: parseName(getProp(object, 'name')),
    dateOfBirth: parseDateOfBirth(getProp(object, 'dateOfBirth')),
    ssn: parseSsn(getProp(object, 'ssn')),
    gender: parseGender(getProp(object, 'gender')),
    occupation: parseOccupation(getProp(object, 'occupation'))
  };
  
  return newPatientData;
};
