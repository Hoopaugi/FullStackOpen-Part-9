import { isString, isObject, getProp, isStringArray, isObjectArray, isNumber, assertNever } from "../../utils";
import { NewPatientData, PatientData, Gender, Entry, HealthCheckRating, Discharge, SickLeave, NewEntry } from "./patients.types";

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

export const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

export const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender ${gender}`);
  }

  return gender;
};

export const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }

  return description;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date)) {
    throw new Error('Incorrect or missing date');
  }

  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }

  return specialist;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).map(r => r).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(`Incorrect or missing healthCheckRating ${healthCheckRating}`);
  }

  return healthCheckRating;
};

const parseDiagnosisCode = (diagnosisCode: unknown): string => {
  if (!diagnosisCode || !isString(diagnosisCode)) {
    throw new Error('Incorrect or missing diagnosisCode');
  }

  return diagnosisCode;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] => {
  if (!diagnosisCodes) {
    return [];
  }

  if (!isStringArray(diagnosisCodes)) {
    throw new Error('Incorrect or missing diagnosisCodes');
  }

  return diagnosisCodes.map(c => parseDiagnosisCode(c));
};

export const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error('Incorrect or missing criteria');
  }

  return criteria;
};

const parseDischarge = (obj: unknown): Discharge => {
  if (!obj || !isObject(obj)) {
    throw new Error('Incorrect or missing discharge');
  }

  const discharge = {
    date: parseDate(getProp(obj, 'date')),
    criteria: parseCriteria(getProp(obj, 'criteria'))
  };

  return discharge;
};

export const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employerName');
  }

  return employerName;
};

const parseSickLeave = (obj: unknown): SickLeave |undefined => {
  if (!obj) {
    return undefined;
  }
  if (!isObject(obj)) {
    throw new Error('Incorrect or missing sickLeave');
  }

  const sickLeave = {
    startDate: parseDate(getProp(obj, 'startDate')),
    endDate: parseDate(getProp(obj, 'endDate'))
  };

  return sickLeave;
};

const parseEntry = (obj: unknown): Entry => {
  if(!obj || !isObject(obj)) {
    throw new Error('Incorrect or missing entry');
  }

  const entry = obj as Entry;

  const e = {
    id: parseId(getProp(entry, 'id')),
    description: parseDescription(getProp(entry, 'description')),
    date: parseDate(getProp(entry, 'date')),
    specialist: parseSpecialist(getProp(entry, 'specialist')),
    diagnosisCodes: parseDiagnosisCodes(getProp(entry, 'diagnosisCodes', true))
  };

  switch(entry.type) {
    case 'HealthCheck':
      const healthCheckEntry = {
        ...e,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(getProp(entry, 'healthCheckRating'))
      };

      return healthCheckEntry as Entry;
    case 'Hospital':
      const hospitalEntry = {
        ...e,
        type: 'Hospital',
        discharge: parseDischarge(getProp(entry, 'discharge')),
      };

      return hospitalEntry as Entry;
    case 'OccupationalHealthcare':
      const occupationalHealthcareEntry = {
        ...e,
        type: 'OccupationalHealthcare',
        employerName: parseEmployerName(getProp(entry, 'employerName')),
        sickLeave: parseSickLeave(getProp(entry, 'sickLeave', true))
      };

      return occupationalHealthcareEntry as Entry;
    default:
      return assertNever(entry);
  }
};

const parseNewEntry = (obj: unknown): NewEntry => {
  if(!obj || !isObject(obj)) {
    throw new Error('Incorrect or missing entry');
  }

  const entry = obj as NewEntry;

  const e = {
    description: parseDescription(getProp(entry, 'description')),
    date: parseDate(getProp(entry, 'date')),
    specialist: parseSpecialist(getProp(entry, 'specialist')),
    diagnosisCodes: parseDiagnosisCodes(getProp(entry, 'diagnosisCodes', true))
  };

  switch(entry.type) {
    case 'HealthCheck':
      const healthCheckEntry = {
        ...e,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(getProp(entry, 'healthCheckRating'))
      };

      return healthCheckEntry as NewEntry;
    case 'Hospital':
      const hospitalEntry = {
        ...e,
        type: 'Hospital',
        discharge: parseDischarge(getProp(entry, 'discharge')),
      };

      return hospitalEntry as NewEntry;
    case 'OccupationalHealthcare':
      const occupationalHealthcareEntry = {
        ...e,
        type: 'OccupationalHealthcare',
        employerName: parseEmployerName(getProp(entry, 'employerName')),
        sickLeave: parseSickLeave(getProp(entry, 'sickLeave', true))
      };

      return occupationalHealthcareEntry as NewEntry;
  }
};

const parseEntries = (arr: unknown): Entry[] => {
  if(!arr || !isObjectArray(arr)) {
    throw new Error('Incorrect or missing entries');
  }

  return arr.map(e => parseEntry(e));
};

export const parsePatient = (object: object): PatientData => {
  const patientData: PatientData = {
    id: parseName(getProp(object, 'id')),
    name: parseName(getProp(object, 'name')),
    dateOfBirth: parseDateOfBirth(getProp(object, 'dateOfBirth')),
    ssn: parseSsn(getProp(object, 'ssn')),
    gender: parseGender(getProp(object, 'gender')),
    occupation: parseOccupation(getProp(object, 'occupation')),
    entries: parseEntries(getProp(object, 'entries'))
  };
  
  return patientData;
};

export const parseNewPatient = (object: object): NewPatientData => {
  const newPatientData: NewPatientData = {
    name: parseName(getProp(object, 'name')),
    dateOfBirth: parseDateOfBirth(getProp(object, 'dateOfBirth')),
    ssn: parseSsn(getProp(object, 'ssn')),
    gender: parseGender(getProp(object, 'gender')),
    occupation: parseOccupation(getProp(object, 'occupation'))
  };
  
  return newPatientData;
};

export const toNewPatient = (body: unknown): NewPatientData => {
  if(!body || !isObject(body)) {
    throw new Error('Missing or malformed request body');
  }

  const patientData = parseNewPatient({ ...body });

  return patientData;
};

export const toNewEntry = (body: unknown): NewEntry => {
  if(!body || !isObject(body)) {
    throw new Error('Missing or malformed request body');
  }

  const entryData = parseNewEntry({ ...body });

  return entryData;
};
