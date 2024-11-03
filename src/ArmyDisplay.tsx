import { Army } from "./ArmyTypes.ts"

const ArmyDisplay = ({ army }: { army: Army }) => {
  return (
    <ul>
      {army.units.map((unit) => (
        <li>{unit.name}</li>
      ))}
    </ul>
  )
}

export default ArmyDisplay
