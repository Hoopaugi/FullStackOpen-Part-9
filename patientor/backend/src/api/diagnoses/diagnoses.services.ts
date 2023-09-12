import diagnosesData from '../../../data/diagnoses.json';
import { Diagnosis } from './diagnoses.types';

const data: Diagnosis[] = diagnosesData.data;

export const getAll = (): Diagnosis[] => {
  return data;
};

export const findByCode = (code: string): Diagnosis | undefined => {
  return data.find(e => e.code === code);
};

export default { getAll, findByCode };
