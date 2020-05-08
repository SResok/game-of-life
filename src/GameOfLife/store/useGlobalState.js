import { useReducer } from "react";

const reducer = (state, action) => {
	switch (action.type) {
    case "SET_TILES":
      return {
        ...state,
        tiles: action.payload,
      }
    case "SET_BOARD_CONFIG":
      return {
        ...state,
        config: action.payload,
      }
	
		case "TOGGLE_LIFE":
      return {
        ...state,
        tiles: action.payload,
      }
    default: {
      return state
    }
  }
}

const useGlobalState = () => {
	const [globalState, globalDispatch] = useReducer(reducer, {
    tiles: [],
    playing: false,
    config: {
      rowSize: 8,
      columnSize: 56,
      tileSize: 30,
    }
  })

	return {globalState,globalDispatch}
}

export default useGlobalState