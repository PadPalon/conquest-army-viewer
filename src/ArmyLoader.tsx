import { useState } from "react"
import { Army, Unit } from "./ArmyTypes.ts"

const ArmyLoader = ({ setArmy }: { setArmy: (army: Army) => void }) => {
  const [inputVisible, setInputVisible] = useState(false)
  const [inputContent, setInputContent] = useState("")
  const toggleInput = () => setInputVisible(!inputVisible)
  return (
    <div id={"armyLoader"}>
      <button
        onClick={() => {
          if (inputVisible) {
            toggleInput()
            const army = loadArmy(inputContent)
            setArmy(army)
            setInputContent("")
          } else {
            setInputContent("")
            toggleInput()
          }
        }}
      >
        {inputVisible ? "Save" : "Load army"}
      </button>
      {inputVisible && (
        <textarea
          onChange={(event) => setInputContent(event.target.value)}
          value={inputContent}
        />
      )}
    </div>
  )
}

export default ArmyLoader

const loadArmy = (input: string): Army => {
  const units = input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map(parseUnit)
    .filter((unit) => unit != null)
  return {
    units,
  }
}

const characterRegex = /== (?:\(Warlord\))?([A-Za-z ]*) \[\d*]:(.*)/
const unitRegex = /\* ([A-Za-z ]*) \(\d*\) \[\d*]:(.*)/

const parseUnit = (line: string): Unit | null => {
  const characterResult = characterRegex.exec(line)
  if (characterResult != null && characterResult.length > 1) {
    return buildUnit(characterResult)
  }

  const unitResult = unitRegex.exec(line)
  if (unitResult != null && unitResult.length > 1) {
    return buildUnit(unitResult)
  }

  return null
}

const buildUnit = (result: RegExpExecArray): Unit => {
  return {
    name: result[1].trim(),
    enhancements: result[2].split(",").map((enhancement) => enhancement.trim()),
  }
}
