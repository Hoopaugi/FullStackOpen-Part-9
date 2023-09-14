import { v1 as uuid } from 'uuid';

import patientData from '../../../data/patients.json';
import { PatientData, NonSensitivePatientData, NewPatientData, NewEntry, Entry } from './patients.types';
import { parsePatient } from './patients.utils';

const patients: PatientData[] = patientData.data.map(obj => {
  try {
    const patient = parsePatient(obj);

    return patient;
  } catch (error) {
    console.log(error);
    console.log(obj);

    throw error;
  }
});

export const getAllNonSensitive = (): NonSensitivePatientData[] => {
  const nonSensitivePatients = patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }));

  return nonSensitivePatients;
};

export const getAll = (): PatientData[] => {
  return patients;
};

export const findById = (id: string): PatientData | undefined => {
  const patient = patients.find(patient => patient.id === id);

  return patient;
};

export const create = (patient: NewPatientData): PatientData => {
  const newPatient = {
    id: uuid(),
    ...patient,
    entries: []
  };

  patients.push(newPatient);

  return newPatient;
};

export const createEntry = (id: string, entry: NewEntry): Entry | undefined => {
  const newEntry = {
    id: uuid(),
    ...entry
  } as Entry;

  const patient = patients.find(patient => patient.id === id);

  if (!patient) {
    throw new Error(`No patient with ID ${id} found`);
  }

  patient.entries.push(newEntry);

  return newEntry;
};

export default { getAll, getAllNonSensitive, findById, create, createEntry };
