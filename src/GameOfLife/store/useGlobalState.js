import { useReducer } from "react"

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TILES":
      return {
        ...state,
        tiles: action.payload,
      }
    case "SET_SPEED":
      return {
        ...state,
        speed: action.payload,
      }
    case "SET_GAMESTATE":
      return {
        ...state,
        gameState: action.payload,
      }
    case "SET_ITERATION":
      return {
        ...state,
        iteration: action.payload,
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
    case "SET_TILE_PROPS": 
      console.log(action.payload)
      return {
        ...state,
        tiles: action.payload
      }
    
    default: {
      return state
    }
  }
}

const useGlobalState = () => {
  const [globalState, globalDispatch] = useReducer(reducer, {
    gameState: "inactive",
    tiles: [],
    speed: 1,
    iteration: 0,

    config: {
      rowSize: 4,
      columnSize: 10,
      tileSize: 30,
    },
  })

  return { globalState, globalDispatch }
}

export default useGlobalState
