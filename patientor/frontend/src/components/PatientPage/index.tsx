import { useEffect, useState } from "react"
import { Button } from '@mui/material';
import { useParams } from "react-router-dom"
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import axios from "axios";

import { Patient } from "../../types"
import patientsServices from '../../services/patients'
import Entries from "./Entires";
import { EntryFormValues } from "../../types";
import AddEntryModal from "../AddEntryModal";

const PatientPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [patient, setPatient] = useState<Patient>()
  const { id } = useParams()

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if (!id || !patient) {
        throw new Error(`No patient found with ID ${id}`)
      }

      const entry = await patientsServices.createEntry(id, values);
      
      const p = patient

      p.entries.push(entry)

      setPatient(p);
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  useEffect(() => {
    const getPatient = async () => {
      if(id) {
        const p = await patientsServices.getById(id)

        setPatient(p)
      }
      
    }
    void getPatient()
  }, [id]);

  if (!patient) {
    return (
      <p>Loading...</p>
    )
  }

  return (
    <>
      <h2>{patient.name} {patient.gender === 'male' ? <MaleIcon /> : patient.gender === 'female' ? <FemaleIcon /> : <TransgenderIcon />}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <Entries entries={patient.entries}/>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </>
  )
}

export default PatientPage
