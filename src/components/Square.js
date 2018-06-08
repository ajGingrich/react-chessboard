import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Square extends Component {
  render() {
    const {
      activeSquare,
      algebraic,
      children,
      blackSquareColour,
      isBlackSquare,
      whiteSquareColour,
    } = this.props

    return (
      <div
        className={`square square-${algebraic} square-${isBlackSquare ? 'b' : 'w'}`}
        role="presentation"
        style={{
          alignItems: 'center',
          backgroundColor: isBlackSquare ? blackSquareColour : whiteSquareColour,
          boxShadow: activeSquare === algebraic ? 'inset 3px 3px 8px yellow, inset -3px -3px 8px yellow' : 'none',
          color: isBlackSquare ? whiteSquareColour : blackSquareColour,
          display: 'flex',
          height: algebraic === 'spare' ? '100%' : '12.5%',
          justifyContent: 'center',
          position: 'relative',
          width: '12.5%',
        }}
      >
        {children}
      </div>
  )
  }
}

Square.propTypes = {
  blackSquareColour: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  isBlackSquare: PropTypes.bool.isRequired,
  whiteSquareColour: PropTypes.string.isRequired,
  algebraic: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
}

Square.defaultProps = {
  activeSquare: null,
  children: null,
}

const mapState = state => ({
  blackSquareColour: state.blackSquareColour,
  fen: state.fen,
  orientation: state.orientation,
  whiteSquareColour: state.whiteSquareColour,
})

export default connect(mapState)(Square)
