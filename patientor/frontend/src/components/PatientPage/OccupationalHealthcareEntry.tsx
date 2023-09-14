import { OccupationalHealthcareEntry as IOccupationalHealthcareEntry } from "../../types"
import Diagnosis from "./Diagnosis"

interface OccupationalHealthcareEntryProps {
  entry: IOccupationalHealthcareEntry
}

const OccupationalHealthcareEntry = (props: OccupationalHealthcareEntryProps) => {
  const entry = props.entry
  const codes = entry.diagnosisCodes ? entry.diagnosisCodes : []
  return (
    <>
      <p>{entry.date} <b>Employer Healthcare</b> by {entry.employerName}</p>
      <i>{entry.description}</i>
      {
        entry.sickLeave ? <p>Sickleave<li>{entry.sickLeave.startDate} - {entry.sickLeave.endDate}</li></p> : <></>
      }
      <p>Diagnose by {entry.specialist}</p>
      {
        codes.map(code => <Diagnosis key={code} code={code} />)
      }
    </>
  )
}

export default OccupationalHealthcareEntry
