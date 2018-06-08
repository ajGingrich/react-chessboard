import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { DragSource } from 'react-dnd'
// import { getEmptyImage } from 'react-dnd-html5-backend'
import classNames from 'classnames'

// import { makeMove as getNewFen } from '../fen'
import { orientationTypes, pieceTypes, pieceThemeTypes } from '../types'

// import { makeMoveAction } from '../store'

class Piece extends Component {
  state = {
    isLoaded: false,
    pieceImage: null,
  }

  componentDidMount() {
    this.mounted = true
    const { piece, pieceTheme } = this.props
    this.loadImage(piece, pieceTheme)
  }

  componentWillReceiveProps(nextProps) {
    const { piece, pieceTheme } = nextProps
    const { piece: currentPiece, pieceTheme: currentPieceTheme } = this.props
    if (pieceTheme !== currentPieceTheme || piece !== currentPiece) {
      this.loadImage(piece, pieceTheme)
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  loadImage = (piece, pieceTheme) => {
    const pieceColour = piece.toUpperCase() === piece ? 'w' : 'b'

    if (!this.mounted) return

    // import(`./assets/chesspieces/${pieceTheme}/${pieceColour}${piece.toUpperCase()}.svg`)
    // import('./assets/chesspieces/uscf/wK.svg')
    //   .then(image => this.setState({ isLoaded: true, pieceImage: image }))
    //   .catch(error => console.log(error))
    // template literals????

    if (pieceColour === 'w') {
      if (piece.toUpperCase() === 'K') {
        import('./assets/chesspieces/alpha/wK.svg')
          .then(image => this.setState({ isLoaded: true, pieceImage: image }))
          .catch(error => console.log(error))
      } else if (piece.toUpperCase() === 'Q') {
        import('./assets/chesspieces/alpha/wQ.svg')
          .then(image => this.setState({ isLoaded: true, pieceImage: image }))
          .catch(error => console.log(error))
      } else if (piece.toUpperCase() === 'R') {
        import('./assets/chesspieces/alpha/wR.svg')
          .then(image => this.setState({ isLoaded: true, pieceImage: image }))
          .catch(error => console.log(error))
      } else if (piece.toUpperCase() === 'B') {
        import('./assets/chesspieces/alpha/wB.svg')
          .then(image => this.setState({ isLoaded: true, pieceImage: image }))
          .catch(error => console.log(error))
      } else if (piece.toUpperCase() === 'N') {
        import('./assets/chesspieces/alpha/wN.svg')
          .then(image => this.setState({ isLoaded: true, pieceImage: image }))
          .catch(error => console.log(error))
      } else {
        import('./assets/chesspieces/alpha/wP.svg')
          .then(image => this.setState({ isLoaded: true, pieceImage: image }))
          .catch(error => console.log(error))
      }
    } else if (pieceColour === 'b') {
      if (piece.toUpperCase() === 'K') {
        import('./assets/chesspieces/alpha/bK.svg')
          .then(image => this.setState({ isLoaded: true, pieceImage: image }))
          .catch(error => console.log(error))
      } else if (piece.toUpperCase() === 'Q') {
        import('./assets/chesspieces/alpha/bQ.svg')
          .then(image => this.setState({ isLoaded: true, pieceImage: image }))
          .catch(error => console.log(error))
      } else if (piece.toUpperCase() === 'R') {
        import('./assets/chesspieces/alpha/bR.svg')
          .then(image => this.setState({ isLoaded: true, pieceImage: image }))
          .catch(error => console.log(error))
      } else if (piece.toUpperCase() === 'B') {
        import('./assets/chesspieces/alpha/bB.svg')
          .then(image => this.setState({ isLoaded: true, pieceImage: image }))
          .catch(error => console.log(error))
      } else if (piece.toUpperCase() === 'N') {
        import('./assets/chesspieces/alpha/bN.svg')
          .then(image => this.setState({ isLoaded: true, pieceImage: image }))
          .catch(error => console.log(error))
      } else {
        import('./assets/chesspieces/alpha/bP.svg')
          .then(image => this.setState({ isLoaded: true, pieceImage: image }))
          .catch(error => console.log(error))
      }
    }
    // we use our own <PieceDragLayer /> component
    // this.props.connectDragPreview(getEmptyImage())
  }

  render() {
    const { isLoaded, pieceImage } = this.state
    if (!isLoaded) return null

    const {
      // connectDragSource,
      // isDragging,
      // isDraggable,
      piece,
      square,
    } = this.props

    const colour = piece === piece.toUpperCase() ? 'w' : 'b'

    const pieceClasses = classNames(
      { piece: true },
      { [`piece-${piece}`]: true },
      { [`piece-${colour}`]: true },
      { 'piece-spare': square === 'spare' },
    )

    return (
      <img
        alt={piece}
        className={pieceClasses}
        ref={(el) => { this.pieceImage = el }}
        src={pieceImage}
        style={{
          cursor: isDraggable ? 'pointer' : 'auto',
          flex: square === 'spare' ? 1 : null,
          height: '100%',
          opacity: isDragging ? 0.2 : 1,
          pointerEvents: isDraggable ? 'auto' : 'none',
        }}
      />
    )
  }
}

Piece.propTypes = {
  // connectDragPreview: PropTypes.func.isRequired, // injected by react-dnd
  // connectDragSource: PropTypes.func.isRequired, // injected by react-dnd
  // isDragging: PropTypes.bool.isRequired, // injected by react-dnd
  // isDraggable: PropTypes.bool.isRequired, // injected by react-redux
  piece: PropTypes.oneOf(pieceTypes).isRequired,
  pieceTheme: PropTypes.oneOf(pieceThemeTypes).isRequired, // injected by react-redux
  /* eslint-disable react/no-unused-prop-types */
  // dropOffBoard: PropTypes.bool.isRequired, // injected by react-redux
  fen: PropTypes.string.isRequired, // injected by react-redux
  makeMove: PropTypes.func.isRequired, // injected by react-redux
  // onDragStart: PropTypes.func.isRequired, // injected by react-redux
  // onDrop: PropTypes.func.isRequired, // injected by react-redux
  // onSnapbackEnd: PropTypes.func.isRequired, // injected by react-redux
  orientation: PropTypes.oneOf(orientationTypes).isRequired, // injected by react-redux
  square: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  /* eslint-enable react/no-unused-prop-types */
}


<<<<<<< HEAD
const pieceSource = {
  canDrag(props) {
    return props.isDraggable
  },

  beginDrag(props) {
    const {
      fen,
      height,
      onDragStart,
      orientation,
      piece,
      pieceTheme,
      square,
    } = props

    const item = {
      fromSquare: square,
      piece,
      pieceTheme,
      pieceColour: piece.toUpperCase() === piece ? 'w' : 'b',
      size: height / 8,
    }

    onDragStart(square, piece, fen, orientation)
    return item
  },

  endDrag(props, monitor) {
    const item = monitor.getItem()
    const { piece, fromSquare } = item
    const {
      dropOffBoard,
      fen,
      makeMove,
      onDrop,
      onSnapbackEnd,
      orientation,
      square,
    } = props

    // dropResult is null if dropped off board, { dropEffect "move", toSquare: "d5" } if dropped on a square
    const dropResult = monitor.getDropResult()
    let toSquare = dropResult ? dropResult.toSquare : null

    // we still pass this, even if onDrop returns 'snapback'
    // otherwise needs a refactor
    const newPosition = getNewFen(fen, piece, fromSquare, toSquare)

    const onDropResult = onDrop(square, toSquare, piece, newPosition, fen, orientation)
    if (onDropResult === 'trash') toSquare = null // the piece is removed

    const shouldDropOffBoard = !monitor.didDrop() && dropOffBoard && onDropResult !== 'snapback'
    const shouldMovePiece = dropResult && onDropResult !== 'snapback'

    if (shouldDropOffBoard || shouldMovePiece) {
      return makeMove(piece, fromSquare, toSquare)
    }

    // else it's a snapback
    return onSnapbackEnd(piece, square, fen, orientation)
  },
}

const collect = (dndConnect, monitor) => ({
  connectDragSource: dndConnect.dragSource(),
  connectDragPreview: dndConnect.dragPreview(),
  isDragging: monitor.isDragging(),
})

const mapState = state => ({
  dropOffBoard: state.dropOffBoard,
  fen: state.fen,
  height: state.height,
  isDraggable: state.isDraggable,
  onDragStart: state.events.onDragStart,
  onDrop: state.events.onDrop,
  onSnapbackEnd: state.events.onSnapbackEnd,
  orientation: state.orientation,
  pieceTheme: state.pieceTheme,
})

const mapDispatch = (dispatch, ownProps) => ({
  makeMove: (piece, fromSquare, toSquare) => dispatch(makeMoveAction(ownProps.uuid, piece, fromSquare, toSquare)),
})

export default connect(mapState, mapDispatch)(DragSource('piece', pieceSource, collect)(Piece))
=======
// const pieceSource = {
//   canDrag(props) {
//     return props.isDraggable
//   },
//
//   beginDrag(props) {
//     const {
//       fen,
//       height,
//       onDragStart,
//       orientation,
//       piece,
//       pieceTheme,
//       square,
//     } = props
//
//     const item = {
//       fromSquare: square,
//       piece,
//       pieceTheme,
//       size: height / 8,
//     }
//
//     onDragStart(square, piece, fen, orientation)
//     return item
//   },
//
//   endDrag(props, monitor) {
//     const item = monitor.getItem()
//     const { piece, fromSquare } = item
//     const {
//       dropOffBoard,
//       fen,
//       makeMove,
//       onDrop,
//       onSnapbackEnd,
//       orientation,
//       square,
//     } = props
//
//     // dropResult is null if dropped off board, { dropEffect "move", toSquare: "d5" } if dropped on a square
//     const dropResult = monitor.getDropResult()
//     let toSquare = dropResult ? dropResult.toSquare : null
//
//     // we still pass this, even if onDrop returns 'snapback'
//     // otherwise needs a refactor
//     const newPosition = getNewFen(fen, piece, fromSquare, toSquare)
//
//     const onDropResult = onDrop(square, toSquare, piece, newPosition, fen, orientation)
//     if (onDropResult === 'trash') toSquare = null // the piece is removed
//
//     const shouldDropOffBoard = !monitor.didDrop() && dropOffBoard && onDropResult !== 'snapback'
//     const shouldMovePiece = dropResult && onDropResult !== 'snapback'
//
//     if (shouldDropOffBoard || shouldMovePiece) {
//       return makeMove(piece, fromSquare, toSquare)
//     }
//
//     // else it's a snapback
//     return onSnapbackEnd(piece, square, fen, orientation)
//   },
// }

// const collect = (dndConnect, monitor) => ({
//   connectDragSource: dndConnect.dragSource(),
//   connectDragPreview: dndConnect.dragPreview(),
//   isDragging: monitor.isDragging(),
// })

// const mapState = state => ({
//   // dropOffBoard: state.dropOffBoard,
//   fen: state.fen,
//   height: state.height,
//   // isDraggable: state.isDraggable,
//   // onDragStart: state.events.onDragStart,
//   // onDrop: state.events.onDrop,
//   // onSnapbackEnd: state.events.onSnapbackEnd,
//   orientation: state.orientation,
//   pieceTheme: state.pieceTheme,
// })

// const mapDispatch = (dispatch, ownProps) => ({
//   makeMove: (piece, fromSquare, toSquare) => dispatch(makeMoveAction(ownProps.uuid, piece, fromSquare, toSquare)),
// })

export default Piece
>>>>>>> wip for removing drag
