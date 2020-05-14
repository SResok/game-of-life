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
    case "SET_ISACTIVE":
      return {
        ...state,
        isActive: action.payload,
      }
    case "SET_SECONDS":
      return {
        ...state,
        seconds: action.payload,
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
  const tileSize = 30
  const rows = Math.floor(((window.innerHeight / 100) * 50) / tileSize) 
  const cols = Math.floor(((window.innerWidth / 100) * 75) / tileSize)
  


  const [globalState, globalDispatch] = useReducer(reducer, {
    isActive: false,
    tiles: [],
    speed: 10,
    seconds: 0,
    iteration: 0,



    config: {
      rowSize: rows,
      columnSize: cols,
      tileSize: tileSize,
    },
  })

  return { globalState, globalDispatch }
}

export default useGlobalState
