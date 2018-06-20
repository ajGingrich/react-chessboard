import React, { Component } from 'react'
import Chessboard from '../src/index'

class App extends Component { // eslint-disable-line
  render() {
    return (
      <div>
        <h2>reactjs-chessboard</h2>
        <Chessboard
          blackSquareColour="steelblue"
          whiteSquareColour="white"
          style={{
            border: '2px solid lightgrey',
          }}
          orientation="b"
        />
        <h3>a second board</h3>
        <Chessboard
          blackSquareColour="steelblue"
          whiteSquareColour="white"
          style={{
            border: '2px solid lightgrey',
          }}
          orientation="b"
        />
      </div>
    )
  }
}

export default App
