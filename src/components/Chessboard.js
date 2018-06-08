import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { DragDropContext } from 'react-dnd'
// import HTML5Backend from 'react-dnd-html5-backend'

import Coordinate from './Coordinate'
import Piece from './Piece'
// import PieceDragLayer from './PieceDragLayer'
import SparePieces from './SparePieces'
import Square from './Square'

import { setHeightAction } from '../store'
import { getFenParts } from '../fen'
import { orientationTypes } from '../types'

class Chessboard extends Component {
  componentDidMount() {
    this.props.setHeight(this.container.offsetWidth)
  }

  setHeight = () => {
    if (!this.container) return
    this.props.setHeight(this.container.offsetWidth)
  }

  renderSquares = () => {
    const {
      activeSquare,
      fen,
      orientation,
      showCoordinates,
      uuid,
    } = this.props
    const fenParts = getFenParts(fen)
    const squares = []
    for (let i = 0; i < 8; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        const rank = orientation === 'w' ? i : Math.abs(i - 7)
        const file = orientation === 'w' ? j : Math.abs(j - 7)
        const fileChar = String.fromCharCode(file + 97)
        const rankChar = (Math.abs(rank - 7) + 1).toString()
        const algebraic = `${fileChar}${rankChar}`
        const isBlackSquare = (rank + file) % 2 !== 0
        const piece = fenParts[rank].charAt(file)
        /* eslint-disable function-paren-newline */
        squares.push(
        /* eslint-enable function-paren-newline */
          <Square
            key={algebraic}
            algebraic={algebraic}
            activeSquare={activeSquare}
            isBlackSquare={isBlackSquare}
            piece={piece !== '1' ? piece : null}
            uuid={uuid}
          >
            {showCoordinates && ((orientation === 'w' && rank === 7) || (orientation === 'b' && rank === 0))
              && <Coordinate display="file" text={fileChar} uuid={uuid} />}
            {showCoordinates && ((orientation === 'w' && file === 0) || (orientation === 'b' && file === 7))
              && <Coordinate display="rank" text={rankChar} uuid={uuid} />}
            {piece !== '1' && (
              <Piece
                piece={piece}
                square={algebraic}
                uuid={uuid}
              />
            )}
          </Square>,
        /* eslint-disable function-paren-newline */
        )
        /* eslint-enable function-paren-newline */
      }
    }
    return squares
  }

  render() {
    const {
      height,
      // isDraggable,
      orientation,
      style,
      sparePieces,
      uuid,
      width,
    } = this.props

    const baseStyles = {
      display: 'flex',
      flexWrap: 'wrap',
      height: this.container ? this.container.offsetWidth : height,
      width,
    }
    const combinedStyles = Object.assign({}, baseStyles, style)

    return (
      <div
        className="chessboardContainer"
        ref={(el) => { this.outerContainer = el }}
      >
        {sparePieces && (
          <SparePieces
            colour={orientation === 'w' ? 'b' : 'w'}
            uuid={uuid}
            width={width}
          />
        )}
        <div
          className="chessboard"
          ref={(el) => { this.container = el }}
          style={combinedStyles}
        >
          {this.renderSquares()}
          {/* {isDraggable && <PieceDragLayer uuid={uuid} />} */}
        </div>
        {sparePieces && (
          <SparePieces
            colour={orientation}
            uuid={uuid}
            width={width}
          />
        )}
      </div>
    )
  }
}

Chessboard.propTypes = {
  activeSquare: PropTypes.string,
  fen: PropTypes.string.isRequired, // injected by react-redux
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // injected by react-redux
  // isDraggable: PropTypes.bool.isRequired, // injected by react-redux
  orientation: PropTypes.oneOf(orientationTypes).isRequired, // injected by react-redux
  setHeight: PropTypes.func.isRequired, // injected by react-redux
  showCoordinates: PropTypes.bool.isRequired, // injected by react-redux
  /* eslint-disable react/forbid-prop-types */
  sparePieces: PropTypes.bool.isRequired,
  style: PropTypes.object,
  /* eslint-enable react/forbid-prop-types */
  uuid: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

Chessboard.defaultProps = {
  activeSquare: null,
  height: null,
  style: {},
}

const mapState = state => ({
  fen: state.fen,
  height: state.height,
  isDraggable: state.isDraggable,
  orientation: state.orientation,
  showCoordinates: state.showCoordinates,
  sparePieces: state.sparePieces,
})

const mapDispatch = (dispatch, ownProps) => ({
  setHeight: height => dispatch(setHeightAction(ownProps.uuid, height)),
})

export default connect(mapState, mapDispatch)(Chessboard)
