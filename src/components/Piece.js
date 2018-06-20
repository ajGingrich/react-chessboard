import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { orientationTypes, pieceTypes } from '../types'

import { makeMoveAction } from '../store'

class Piece extends Component {
  state = {
    isLoaded: false,
    pieceImage: null,
  }

  componentDidMount() {
    this.mounted = true
    const { piece } = this.props
    this.loadImage(piece)
  }

  componentWillReceiveProps(nextProps) {
    const { piece } = nextProps
    const { piece: currentPiece } = this.props
    if (piece !== currentPiece) {
      this.loadImage(piece)
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  loadImage = (piece) => {
    const pieceColour = piece.toUpperCase() === piece ? 'w' : 'b'

    if (!this.mounted) return

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
  }

  render() {
    const { isLoaded, pieceImage } = this.state
    if (!isLoaded) return null

    const {
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
          cursor: 'auto',
          flex: square === 'spare' ? 1 : null,
          height: '100%',
          opacity: 1,
          pointerEvents: 'none',
        }}
      />
    )
  }
}

Piece.propTypes = {
  piece: PropTypes.oneOf(pieceTypes).isRequired,
  fen: PropTypes.string.isRequired,
  makeMove: PropTypes.func.isRequired,
  orientation: PropTypes.oneOf(orientationTypes).isRequired,
  square: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
}

const mapState = state => ({
  fen: state.fen,
  height: state.height,
  orientation: state.orientation,
})

const mapDispatch = (dispatch, ownProps) => ({
  makeMove: (piece, fromSquare, toSquare) => dispatch(makeMoveAction(ownProps.uuid, piece, fromSquare, toSquare)),
})

export default connect(mapState, mapDispatch)(Piece)
