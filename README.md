Fork from [react-chessboardjs](https://github.com/siansell/react-chessboardjs)

There are several major differences react-chessboardjs

* Images are imported dynamically and loaded directly into the bundle. This elimnates need for next-images or further configuration
* Board is not draggable which reduces the bundle size considerably.
* There are no piece themes in order to minimize bundle size
* The last move can be highlighted as an active square

## Installation

```
npm install reactjs-chessboard --save
```

## Usage

```
import Chessboard from 'reacjs-chessboard'

class Example extends React.Component {

  render() {
    return (
      <Chessboard
        blackSquareColour="steelblue"
        whiteSquareColour="white"
        width={600}
        style={{
          border: '2px solid lightgrey',
        }}
        orientation="b"
      />
      )
  }
}
```

## Properties

| Prop | Type | Default | Explanation |
| --- | :---: | :------: | :-------: |
| activeSquare | string | null | The last square that has been moved for highlight, ex. e4 |
| blackSquareColor | string | SteelBlue | color of the dark squares |
| whiteSquareColor | string | AliceBlue | color of the light squares |
| orientation | string | 'w' | board orientation |
| style | object | - | boarder border style |
| width | string (%) or number (px) | 600 | Width of the board and move list. The board will be 2/3rds of the width. |
| showCoordinates | boolean | true | should show coordinates along the A file and first Rank |

## Contributing

To run the examples:

```
npm install
npm run dev

# copy index.html from examples into the dist folder
```

Then open `localhost:8020` in a browser.

Tested with React 16.3
