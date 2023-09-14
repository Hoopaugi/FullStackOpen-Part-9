import { useState, useEffect } from "react"

import { Diagnosis as IDiagnosis } from "../../types"
import diagnosesServices from "../../services/diagnoses"

interface DiagnosisProps {
  code: string
}

const Diagnosis = (props: DiagnosisProps) => {
  const [diagnosis, setDiagnosis] = useState<IDiagnosis>()
  const code = props.code

  useEffect(() => {
    const getDiagnosis = async () => {
      if(code) {
        const d = await diagnosesServices.getByCode(code)

        setDiagnosis(d)
      }
      
    }
    void getDiagnosis()
  }, [code]);

  if (!diagnosis) {
    return (
      <li>Loading...</li>
    )
  }
  return (
    <li>{diagnosis.code} {diagnosis.name}</li>
  )
}

export default Diagnosis
