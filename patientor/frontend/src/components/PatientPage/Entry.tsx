import { Entry as IEntry } from "../../types"
import HealthCheckEntry from "./HealthCheckEntry"
import HospitalEntry from "./HospitalEntry"
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry"
import { assertNever } from "../../utils"

interface EntryProps {
  entry: IEntry
}

const Entry = (props: EntryProps) => {
  const entry = props.entry
  
  switch(entry.type) {
    case 'HealthCheck':
      return (
        <HealthCheckEntry entry={entry} />
      )
    case 'Hospital':
      return (
        <HospitalEntry entry={entry} />
      )
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcareEntry entry={entry} />
      )
    default:
      return assertNever(entry)
  }
}

export default Entry
