import { HealthCheckEntry as IHealthCheckEntry } from "../../types"
import Diagnosis from "./Diagnosis"

interface HealthCheckEntryProps {
  entry: IHealthCheckEntry
}

const HealthCheckEntry = (props: HealthCheckEntryProps) => {
  const entry = props.entry
  const codes = entry.diagnosisCodes ? entry.diagnosisCodes : []
  return (
    <>
      <p>{entry.date} <b>Health Check</b></p>
      <i>{entry.description}</i>
      <p>{entry.healthCheckRating}</p>
      <p>Diagnose by {entry.specialist}</p>
      {
        codes.map(code => <Diagnosis key={code} code={code} />)
      }
    </>
  )
}

export default HealthCheckEntry
