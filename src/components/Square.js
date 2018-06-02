import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { DropTarget } from 'react-dnd'
// import { connect } from 'react-redux'

import { pieceTypes } from '../types'

class Square extends Component {
  constructor(props) {
    super(props)

    this.state = { dropToSquare: null, activeSquare: null }
  }
  componentWillReceiveProps(nextProps) {
    const {
      activeSquare,
      algebraic,
      fen,
      dropResult,
      isOver,
      item,
      orientation,
    } = nextProps
    const dropToSquare = this.props.dropResult && this.props.dropResult.toSquare
    const nextDropToSquare = dropResult && dropResult.toSquare

    if (!this.props.isOver && isOver) {
      const { fromSquare, piece } = item
      if (algebraic !== fromSquare) { // don't fire on picking up piece
        nextProps.onDragMove(algebraic, fromSquare, piece, fen, orientation)
      }
    }

    if (!dropToSquare && nextDropToSquare) {
      this.setState({ dropToSquare: nextDropToSquare, activeSquare: null })
    }

    if (this.props.activeSquare !== activeSquare) {
      this.setState({ dropToSquare: null, activeSquare })
    }
  }

  render() {
    const {
      algebraic,
      canDrop,
      children,
      connectDropTarget,
      blackSquareColour,
      isBlackSquare,
      isOver,
      fen,
      onMouseOutSquare,
      onMouseOverSquare,
      onSquareClick,
      orientation,
      piece,
      whiteSquareColour,
    } = this.props
    const { dropToSquare, activeSquare } = this.state

    let showBoxShadow = false

    if ((isOver && canDrop) || dropToSquare === algebraic || activeSquare === algebraic) {
      showBoxShadow = true
    }

    /* eslint-disable function-paren-newline */
    return connectDropTarget(
    /* eslint-enable function-paren-newline */
      <div
        className={`square square-${algebraic} square-${isBlackSquare ? 'b' : 'w'}`}
        onBlur={() => onMouseOutSquare(algebraic, piece, fen, orientation)}
        onFocus={() => onMouseOverSquare(algebraic, piece, fen, orientation)}
        onMouseOut={() => onMouseOutSquare(algebraic, piece, fen, orientation)}
        onMouseOver={() => onMouseOverSquare(algebraic, piece, fen, orientation)}
        onClick={(e) => {
          e.preventDefault()
          onSquareClick(e.type === 'contextmenu', algebraic, piece, fen, orientation)
        }}
        onContextMenu={(e) => {
          e.preventDefault()
          onSquareClick(e.type === 'contextmenu', algebraic, piece, fen, orientation)
        }}
        role="presentation"
        style={{
          alignItems: 'center',
          backgroundColor: isBlackSquare ? blackSquareColour : whiteSquareColour,
          boxShadow: showBoxShadow ? 'inset 3px 3px 8px yellow, inset -3px -3px 8px yellow' : 'none',
          color: isBlackSquare ? whiteSquareColour : blackSquareColour,
          display: 'flex',
          height: algebraic === 'spare' ? '100%' : '12.5%',
          justifyContent: 'center',
          position: 'relative',
          width: '12.5%',
        }}
      >
        {children}
      </div>,
    /* eslint-disable function-paren-newline */
    )
    /* eslint-enable function-paren-newline */
  }
}

Square.propTypes = {
  activeSquare: PropTypes.string,
  blackSquareColour: PropTypes.string.isRequired, // injected by react-redux
  canDrop: PropTypes.bool.isRequired, // injected by react-dnd
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  connectDropTarget: PropTypes.func.isRequired, // injected by react-dnd
  dropResult: PropTypes.object, // injected by react-dnd
  /* eslint-disable react/forbid-prop-types */
  fen: PropTypes.string.isRequired, // injected by react-redux
  isBlackSquare: PropTypes.bool.isRequired,
  isOver: PropTypes.bool.isRequired, // injected by react-dnd
  /* eslint-disable react/forbid-prop-types */
  item: PropTypes.object, // injected by react-dnd
  /* eslint-enable react/forbid-prop-types */
  onDragMove: PropTypes.func.isRequired, // injected by react-redux
  // onMouseOutSquare: PropTypes.func.isRequired, // injected by react-redux
  // onMouseOverSquare: PropTypes.func.isRequired, // injected by react-redux
  // onSquareClick: PropTypes.func.isRequired, // injected by react-redux
  orientation: PropTypes.string.isRequired, // injected by react-redux
  piece: PropTypes.oneOf(pieceTypes),
  whiteSquareColour: PropTypes.string.isRequired, // injected by react-redux
  /* eslint-disable react/no-unused-prop-types */
  algebraic: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  /* eslint-enable react/no-unused-prop-types */
}

Square.defaultProps = {
  activeSquare: null,
  children: null,
  item: {},
  piece: null,
}

// const squareTarget = {
//   drop(props) {
//     return { toSquare: props.algebraic }
//   },
// }

// const collect = (dndConnect, monitor) => ({
//   canDrop: monitor.canDrop(),
//   connectDropTarget: dndConnect.dropTarget(),
//   isOver: monitor.isOver(),
//   item: monitor.getItem(),
// })
//
// const mapState = state => ({
//   blackSquareColour: state.blackSquareColour,
//   fen: state.fen,
//   onDragMove: state.events.onDragMove,
//   onMouseOutSquare: state.events.onMouseOutSquare,
//   onMouseOverSquare: state.events.onMouseOverSquare,
//   onSquareClick: state.events.onSquareClick,
//   orientation: state.orientation,
//   whiteSquareColour: state.whiteSquareColour,
// })

export default Square
