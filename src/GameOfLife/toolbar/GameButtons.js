import React, { useContext,useEffect,useState } from "react"
import Context from "../store/context"



function GameButtons() {
  const { globalState, globalDispatch } = useContext(Context)

  
  const { seconds, isActive,speed } = globalState

   useEffect(() => {
     let interval = null
     if (isActive) {
       interval = setInterval(() => {

         globalDispatch({
           type: "SET_SECONDS",
           payload: seconds + 1,
         })
         
       }, 1000/speed)
     } else if (!isActive && seconds !== 0) {
       clearInterval(interval)
     }
     return () => clearInterval(interval)
   }, [isActive, seconds])


  
   function toggle() {
     globalDispatch({
       type: "SET_ISACTIVE",
       payload: !isActive
     })
   }

   function reset() {
    
     globalDispatch({
       type: "SET_SECONDS",
       payload: 0,
     })
     globalDispatch({
       type: "SET_ISACTIVE",
       payload: false,
     })
     globalDispatch({
       type: "SET_ITERATION",
       payload: 0,
     })
   }
  
  const handleSpeed = speed => {
    globalDispatch({
      type: "SET_SPEED",
      payload: speed,
    })
  }



  return (
    <div>
      <label>
        Iteration(s) per second:
        <input
          type="number"
          value={globalState.speed}
          onChange={e => handleSpeed(e.target.value)}
        />
      </label>
      <div className="row">
        <button
          className={`button button-primary button-primary-${
            isActive ? "active" : "inactive"
          }`}
          onClick={toggle}
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default GameButtons
