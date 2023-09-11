import { v1 as uuid } from 'uuid';

import patientData from '../../../data/patients.json';
import { PatientData, NonSensitivePatientData, NewPatientData } from './patients';

const patients: PatientData[] = patientData.data;

export const getAllNonSensitive = (): NonSensitivePatientData[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

export const getAll = (): PatientData[] => {
  return patients;
};

export const findById = (id: string): PatientData | undefined => {
  return patients.find(patient => patient.id === id);
};

export const create = (newPatient: NewPatientData): PatientData => {
  const id = uuid();
  const patient = { ...newPatient, id };

  patients.push(patient);

  return patient;
};

export default { getAll, getAllNonSensitive, findById, create };
