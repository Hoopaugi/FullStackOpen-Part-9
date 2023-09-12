export interface PatientData {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type NonSensitivePatientData = Omit<PatientData, 'ssn'>;

export type NewPatientData = Omit<PatientData, 'id'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}
