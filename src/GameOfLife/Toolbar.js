import React, { useContext } from "react"
import Context from "./store/context"

function Toolbar() {
  const { globalState, globalDispatch } = useContext(Context)

  const handleInput = e => {
    const key = e.target.name
    const value = parseInt(e.target.value)
    const oBoardConfig = { ...globalState.config }

    oBoardConfig[key] = value
    globalDispatch({
      type: "SET_BOARD_CONFIG",
      payload: oBoardConfig,
    })
  }

  return (
    <div>
      {Object.entries(globalState.config).map(([key, value]) => (
        <label key={key}>
          {key}:
          <input
            type="number"
            name={key}
            value={value}
            onChange={handleInput}
          />
        </label>
      ))}
    </div>
  )
}

export default Toolbar
