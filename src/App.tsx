import "./App.css"
import { useState } from "react"
import ArmyLoader from "./ArmyLoader.tsx"
import ArmyDisplay from "./ArmyDisplay.tsx"
import { Army } from "./ArmyTypes.ts"

const App = () => {
  const [army, setArmy] = useState<Army>()
  return (
    <>
      <ArmyLoader setArmy={setArmy} />
      {army && <ArmyDisplay army={army} />}
    </>
  )
}

export default App
