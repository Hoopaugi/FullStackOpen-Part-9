import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Patient } from "../../types"
import patientsServices from '../../services/patients'
import Entries from "./Entires";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>()
  const { id } = useParams()

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
    </>
  )
}

export default PatientPage
