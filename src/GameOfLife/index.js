import React from 'react'
import GlobalStateProvider from './store/GlobalStateProvider'
import Board from './Board'

function GameOfLife() {
	return (
		<GlobalStateProvider>
			<Board/>
		</GlobalStateProvider>
	)
}

export default GameOfLife
