import diagnosesData from '../../../data/diagnoses.json';
import { Diagnosis } from './diagnoses';

const data: Diagnosis[] = diagnosesData.data;

export const getAll = () => {
  return data;
};

export default { getAll };
