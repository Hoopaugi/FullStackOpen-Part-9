import patientData from '../../../data/patients.json';
import { PatientData, NonSensitivePatientData } from './patients';

const data: PatientData[] = patientData.data;

export const getAllNonSensitive = (): NonSensitivePatientData[] => {
  return data.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

export const getAll = (): PatientData[] => {
  return data;
};

export default { getAll, getAllNonSensitive };
