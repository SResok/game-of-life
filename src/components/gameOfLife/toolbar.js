import React from 'react'

function Toolbar(props) {
	return (
    <div>
      {Object.entries(props.config).map(([key, value]) => (
        <label>
          {key}:
          <input
            type="number"
            key={key}
            name={key}
            id={key}
            value={value}
            onChange={props.handleInput}
          />
        </label>
      ))}
      sdfdsbfsdjb
      <button onClick={props.setTiles}>REGEN</button>
    </div>
  )
}

export default Toolbar
