export interface Entry {

}

export interface PatientData {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[]
}

export type NonSensitivePatientData = Omit<PatientData, 'ssn' | 'entries'>;

export type NewPatientData = Omit<PatientData, 'id' | 'entries'>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}
