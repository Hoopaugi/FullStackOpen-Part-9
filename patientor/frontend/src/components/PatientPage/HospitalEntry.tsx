import { HospitalEntry as IHospitalEntry } from "../../types"
import Diagnosis from "./Diagnosis"

interface HospitalEntryProps {
  entry: IHospitalEntry
}

const HospitalEntry = (props: HospitalEntryProps) => {
  const entry = props.entry
  const codes = entry.diagnosisCodes ? entry.diagnosisCodes : []
  return (
    <>
      <p>{entry.date} <b>Hospital Visit</b></p>
      <i>{entry.description}</i>
      <p>Discharged {entry.discharge.date} - {entry.discharge.criteria}</p>
      <p>Diagnose by {entry.specialist}</p>
      {
        codes.map(code => <Diagnosis key={code} code={code} />)
      }
    </>
  )
}

export default HospitalEntry
