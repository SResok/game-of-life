import React, { useContext } from "react"
import Context from "./store/context"

import BoardConfig from "./toolbar/BoardConfig"
import GameButtons from "./toolbar/GameButtons"

function Toolbar() {
  const { globalState, globalDispatch } = useContext(Context)

  return (
    <div>
      <BoardConfig/>
      <br />
      <br />

      <GameButtons/>
      <hr />
    </div>
  )
}

export default Toolbar
