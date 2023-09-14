import { useState, SyntheticEvent, useEffect } from "react";
import axios from "axios";
import OutlinedInput from '@mui/material/OutlinedInput';
import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

import { EntryFormValues, HealthCheckRating, EntryType, Diagnosis } from "../../types";
import { apiBaseUrl } from "../../constants";
import diagnosesServices from "../../services/diagnoses";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

interface TypeOption{
  value: EntryType;
  label: string;
}

const typeOptions: TypeOption[] = Object.values(EntryType).map(v => ({
  value: v, label: v.toString()
}));

interface HealthCheckRatingOption {
  value: HealthCheckRating;
  label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.values(HealthCheckRating).filter(v => typeof v === 'number').map(v => ({
  value: Number(v), label: v.toString()
}));


const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const [type, setType] = useState(EntryType.HealthCheck);

  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis['code'][]>([]);

  const [healthCheckRating, setHealtchCheckRating] = useState(HealthCheckRating.Healthy);

  const [dischargeDate, setDischargeDate] = useState('');
  const [criteria, setCriteria] = useState('');

  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesServices.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();

    if ( typeof event.target.value === "string") {
      const value = event.target.value;

      const type = Object.values(EntryType).find(g => g.toString() === value);

      if (type) {
        setType(type);
      }
    }
  };

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();

    if ( typeof event.target.value === "number") {
      const value = event.target.value;

      const healtchCheckRating = Object.values(HealthCheckRating).find(g => g === value);
      console.log(healtchCheckRating)
      // FIXME: Dumb hack
      if (healtchCheckRating && typeof healtchCheckRating !== 'string') {
        setHealtchCheckRating(healtchCheckRating);
      }
    }
  };

  const onDiagnosisCodesChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    event.preventDefault();

    const value = event.target.value;

    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value)
  };

  const addHealthCheckEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    onSubmit({
      description,
      date,
      specialist,
      diagnosisCodes,
      healthCheckRating,
      type: 'HealthCheck'
    });
  };

  const addHospitalEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    onSubmit({
      description,
      date,
      specialist,
      diagnosisCodes,
      discharge: {
        date: dischargeDate,
        criteria
      },
      type: 'Hospital'
    });
  };

  const addOccupationalHealthcareEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    onSubmit({
      description,
      date,
      specialist,
      diagnosisCodes,
      employerName,
      sickLeave: {
        startDate,
        endDate
      },
      type: 'OccupationalHealthcare'
    });
  };

  if (!diagnoses) {
    return (
      <>Loading...</>
    )
  }

  switch (type) {
    case EntryType.HealthCheck:
      return (
        <div>
        <form onSubmit={addHealthCheckEntry}>
        <Select
            label="Type"
            fullWidth
            value={type}
            onChange={onTypeChange}
          >
          {typeOptions.map(option =>
            <MenuItem
              key={option.label}
              value={option.value}
            >
              {option.label
            }</MenuItem>
          )}
          </Select>
          <TextField
            label="description"
            fullWidth 
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            label="Date"
            type="date"
            fullWidth
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
          <TextField
            label="Specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <InputLabel id="diagnosis-codes-label">Diagnoses</InputLabel>
          <Select
            labelId="diagnosis-codes-label"
            id="diagnosis-codes"
            label="Diagnoses"
            multiple
            fullWidth
            value={diagnosisCodes}
            onChange={onDiagnosisCodesChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(', ')}
          >
          {diagnoses.map((diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              <Checkbox checked={diagnosisCodes.indexOf(diagnosis.code) > -1} />
              <ListItemText primary={diagnosis.code} />
            </MenuItem>
          ))}
          </Select>
  
          <InputLabel style={{ marginTop: 20 }}>Health rating</InputLabel>
          <Select
            label="Health rating"
            fullWidth
            value={healthCheckRating.toString()}
            onChange={onHealthCheckRatingChange}
          >
          {healthCheckRatingOptions.map(option =>
            <MenuItem
              key={option.label}
              value={option.value}
            >{option.label}</MenuItem>
          )}
          </Select>
  
          <Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                style={{ float: "left" }}
                type="button"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{
                  float: "right",
                }}
                type="submit"
                variant="contained"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      )
    case 'Hospital':
      return (
        <div>
        <form onSubmit={addHospitalEntry}>
        <Select
            label="Type"
            fullWidth
            value={type}
            onChange={onTypeChange}
          >
          {typeOptions.map(option =>
            <MenuItem
              key={option.label}
              value={option.value}
            >
              {option.label
            }</MenuItem>
          )}
          </Select>
          <TextField
            label="description"
            fullWidth 
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            label="Date"
            type="date"
            fullWidth
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
          <TextField
            label="Specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <InputLabel id="diagnosis-codes-label">Diagnoses</InputLabel>
          <Select
            labelId="diagnosis-codes-label"
            id="diagnosis-codes"
            label="Diagnoses"
            multiple
            fullWidth
            value={diagnosisCodes}
            onChange={onDiagnosisCodesChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(', ')}
          >
          {diagnoses.map((diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              <Checkbox checked={diagnosisCodes.indexOf(diagnosis.code) > -1} />
              <ListItemText primary={diagnosis.code} />
            </MenuItem>
          ))}
          </Select>
          <InputLabel>Discharge</InputLabel>
          <TextField
            label="Criteria"
            fullWidth 
            value={criteria}
            onChange={({ target }) => setCriteria(target.value)}
          />
          <TextField
            label="Date"
            type="date"
            fullWidth
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
          />

  
          <Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                style={{ float: "left" }}
                type="button"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{
                  float: "right",
                }}
                type="submit"
                variant="contained"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      )
    case 'OccupationalHealthcare':
      return (
        <div>
        <form onSubmit={addOccupationalHealthcareEntry}>
        <Select
            label="Type"
            fullWidth
            value={type}
            onChange={onTypeChange}
          >
          {typeOptions.map(option =>
            <MenuItem
              key={option.label}
              value={option.value}
            >
              {option.label
            }</MenuItem>
          )}
          </Select>
          <TextField
            label="description"
            fullWidth 
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            label="Date"
            type="date"
            fullWidth
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
          <TextField
            label="Specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <InputLabel id="diagnosis-codes-label">Diagnoses</InputLabel>
          <Select
            labelId="diagnosis-codes-label"
            id="diagnosis-codes"
            label="Diagnoses"
            multiple
            fullWidth
            value={diagnosisCodes}
            onChange={onDiagnosisCodesChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(', ')}
          >
          {diagnoses.map((diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              <Checkbox checked={diagnosisCodes.indexOf(diagnosis.code) > -1} />
              <ListItemText primary={diagnosis.code} />
            </MenuItem>
          ))}
          </Select>
          <TextField
            label="Employer"
            fullWidth
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
          />
          <InputLabel>Sickleave</InputLabel>
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            value={startDate}
            onChange={({ target }) => setStartDate(target.value)}
          />
          <TextField
            label="End Date"
            type="date"
            fullWidth
            value={endDate}
            onChange={({ target }) => setEndDate(target.value)}
          />
  
          <Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                style={{ float: "left" }}
                type="button"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{
                  float: "right",
                }}
                type="submit"
                variant="contained"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      )
  }

  return (
    <></>
  );
};

export default AddEntryForm;
