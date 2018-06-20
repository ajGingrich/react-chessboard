import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragLayer } from 'react-dnd'

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
}

const getItemStyles = (props) => {
  const { currentOffset } = props
  if (!currentOffset) {
    return {
      display: 'none',
    }
  }

  const { x, y } = currentOffset
  const transform = `translate(${x}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform,
  }
}

class PieceDragLayer extends Component {
  state = { image: null }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.item) return

    if (!this.props.item) {
      const { piece, pieceColour } = nextProps.item

      if (pieceColour === 'w') {
        if (piece.toUpperCase() === 'K') {
          import('./assets/chesspieces/alpha/wK.svg')
            .then(image => this.setState({ image }))
            .catch(error => console.log(error))
        } else if (piece.toUpperCase() === 'Q') {
          import('./assets/chesspieces/alpha/wQ.svg')
            .then(image => this.setState({ image }))
            .catch(error => console.log(error))
        } else if (piece.toUpperCase() === 'R') {
          import('./assets/chesspieces/alpha/wR.svg')
            .then(image => this.setState({ image }))
            .catch(error => console.log(error))
        } else if (piece.toUpperCase() === 'B') {
          import('./assets/chesspieces/alpha/wB.svg')
            .then(image => this.setState({ image }))
            .catch(error => console.log(error))
        } else if (piece.toUpperCase() === 'N') {
          import('./assets/chesspieces/alpha/wN.svg')
            .then(image => this.setState({ image }))
            .catch(error => console.log(error))
        } else {
          import('./assets/chesspieces/alpha/wP.svg')
            .then(image => this.setState({ image }))
            .catch(error => console.log(error))
        }
      } else if (pieceColour === 'b') {
        if (piece.toUpperCase() === 'K') {
          import('./assets/chesspieces/alpha/bK.svg')
            .then(image => this.setState({ image }))
            .catch(error => console.log(error))
        } else if (piece.toUpperCase() === 'Q') {
          import('./assets/chesspieces/alpha/bQ.svg')
            .then(image => this.setState({ image }))
            .catch(error => console.log(error))
        } else if (piece.toUpperCase() === 'R') {
          import('./assets/chesspieces/alpha/bR.svg')
            .then(image => this.setState({ image }))
            .catch(error => console.log(error))
        } else if (piece.toUpperCase() === 'B') {
          import('./assets/chesspieces/alpha/bB.svg')
            .then(image => this.setState({ image }))
            .catch(error => console.log(error))
        } else if (piece.toUpperCase() === 'N') {
          import('./assets/chesspieces/alpha/bN.svg')
            .then(image => this.setState({ image }))
            .catch(error => console.log(error))
        } else {
          import('./assets/chesspieces/alpha/bP.svg')
            .then(image => this.setState({ image }))
            .catch(error => console.log(error))
        }
      }
    }
  }

  renderItem = (itemType, item) => (
    <img
      alt={itemType}
      className={`piece piece-draglayer piece-${item.piece}`}
      src={this.state.image}
      style={{
        height: item.size,
        width: item.size,
      }}
    />
  )

  render() {
    const { item, itemType, isDragging } = this.props
    if (!isDragging) {
      return null
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {this.renderItem(itemType, item)}
        </div>
      </div>
    )
  }
}

PieceDragLayer.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  item: PropTypes.object, // injected by react-dnd
  /* eslint-enable react/forbid-prop-types */
  itemType: PropTypes.string, // injected by react-dnd
  isDragging: PropTypes.bool.isRequired, // injected by react-dnd
  /* eslint-disable react/no-unused-prop-types */
  uuid: PropTypes.string.isRequired,
  /* eslint-enable react/no-unused-prop-types */
}

PieceDragLayer.defaultProps = {
  item: {},
  itemType: null,
}

const collect = monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
})

export default DragLayer(collect)(PieceDragLayer)
