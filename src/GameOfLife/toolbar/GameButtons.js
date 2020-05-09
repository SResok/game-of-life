import React, { useContext } from "react"
import Context from "../store/context"

function GameButtons() {
  const { globalState, globalDispatch } = useContext(Context)

  const handlePlay = () => {
    globalDispatch({
      type: "SET_GAMESTATE",
      payload: 'active',
    })
  }
  const handlePause = () => {
    
     globalDispatch({
       type: "SET_GAMESTATE",
       payload: "paused",
     })
  }
  const handleStop = () => {
     globalDispatch({
       type: "SET_GAMESTATE",
       payload: "stop",
     })
  }
  const handleSpeed = speed => {
    //TODO  PARSE INT
    //TODO MIN & MAX
    globalDispatch({
      type: "SET_SPEED",
      payload: speed,
    })
  }

  const setIteration = () => {
    globalDispatch({
      type: "SET_ITERATION",
      payload: globalState.iteration + 1
    })
  }

  return (
    <div>
      <label>
        Times per second:
        <input
          type="number"
          value={globalState.speed}
          onChange={e => handleSpeed(e.target.value)}
        />
      </label>
      {globalState.gameState == "inactive" && (
        <button onClick={handlePlay}>Play</button>
      )}
      <label>
        <br/>
        <button onClick={setIteration}>+ITERATION+</button>
        {globalState.iteration}
      </label>
      {globalState.gameState == "active" && (
        <div>
          <button onClick={handlePause}>Pause</button>
          <button onClick={handleStop}>Stop</button>
        </div>
      )}
    </div>
  )
}

export default GameButtons
