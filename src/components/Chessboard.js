import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Coordinate from './Coordinate'
import Piece from './Piece'
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
        squares.push(
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
        )
      }
    }
    return squares
  }

  render() {
    const {
      height,
      style,
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
        <div
          className="chessboard"
          ref={(el) => { this.container = el }}
          style={combinedStyles}
        >
          {this.renderSquares()}
        </div>
      </div>
    )
  }
}

Chessboard.propTypes = {
  fen: PropTypes.string.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  orientation: PropTypes.oneOf(orientationTypes).isRequired,
  setHeight: PropTypes.func.isRequired,
  showCoordinates: PropTypes.bool.isRequired,
  style: PropTypes.object,
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
  orientation: state.orientation,
  showCoordinates: state.showCoordinates,
})

const mapDispatch = (dispatch, ownProps) => ({
  setHeight: height => dispatch(setHeightAction(ownProps.uuid, height)),
})

export default connect(mapState, mapDispatch)(Chessboard)
