import { useState, SyntheticEvent } from "react";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';

import { EntryFormValues, HealthCheckRating, EntryType, Diagnosis } from "../../types";

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
  const [type, setType] = useState(EntryType.HealthCheck);

  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis['code'][]>([]);

  const [healthCheckRating, setHealtchCheckRating] = useState(HealthCheckRating.Healthy);

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
        console.log(healtchCheckRating)
        setHealtchCheckRating(healtchCheckRating);
      }
    }
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
          <TextField
            label="Diagnoses"
            fullWidth
            value={diagnosisCodes.join(', ')}
            onChange={({ target }) => setDiagnosisCodes(target.value.split(', '))}
          />
  
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
        <></>
      )
    case 'OccupationalHealthcare':
      return (
        <></>
      )
  }

  return (
    <></>
  );
};

export default AddEntryForm;
