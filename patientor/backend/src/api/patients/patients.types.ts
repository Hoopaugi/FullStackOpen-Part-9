import { Diagnosis } from "../diagnoses/diagnoses.types";

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "healthy" = 0,
  "lowRisk" = 1,
  "highRisk" = 2,
  "criticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface Discharge {
  date: string
  criteria: string
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge
}

export interface SickLeave {
  startDate: string
  endDate: string
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string
  sickLeave: SickLeave
}

export type Entry = | HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface PatientData {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[]
}

export type NonSensitivePatientData = Omit<PatientData, 'ssn' | 'entries'>;

export type NewPatientData = Omit<PatientData, 'id' | 'entries'>;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewEntry = UnionOmit<Entry, 'id'>;
