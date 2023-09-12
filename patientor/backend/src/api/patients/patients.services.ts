import { v1 as uuid } from 'uuid';

import patientData from '../../../data/patients.json';
import { PatientData, NonSensitivePatientData, NewPatientData } from './patients.types';
import { toNewPatient } from './patients.utils';

const patients: PatientData[] = patientData.data.map(obj => {
  const patient = toNewPatient(obj) as PatientData;

  patient.id = obj.id;

  return patient;
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
    ...patient
  };

  patients.push(newPatient);

  return newPatient;
};

export default { getAll, getAllNonSensitive, findById, create };
