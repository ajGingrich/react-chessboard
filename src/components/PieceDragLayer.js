import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragLayer } from 'react-dnd'

const loadPieceImages = (item) => {
  const { piece, pieceTheme } = item
  const pieceColour = piece.toUpperCase() === piece ? 'w' : 'b'

  import('./assets/chesspieces/wikipedia/wN.svg')
    .then(image => this.setState({ isLoaded: true, pieceImage: image }))
    .catch(error => console.log(error))
}

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
    if (!this.props.item || (nextProps.item.pieceTheme !== this.props.item.pieceTheme)) {
      loadPieceImages(nextProps.item)
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
