import React, { Component } from 'react'
import Chessboard from '../src/index'

class App extends Component { // eslint-disable-line
  render() {
    return (
      <div>
        <h2>react-chessboardjs</h2>
        <Chessboard
          blackSquareColour="steelblue"
          whiteSquareColour="white"
          pieceTheme="wikipedia"
          style={{
            border: '2px solid lightgrey',
          }}
          orientation="b"
        />
        <h3>a second board</h3>
        <Chessboard
          blackSquareColour="steelblue"
          whiteSquareColour="white"
          pieceTheme="uscf"
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
