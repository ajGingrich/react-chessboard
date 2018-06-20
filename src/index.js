import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import uuidv4 from 'uuid/v4'

import Chessboard from './components/Chessboard'

import { orientationTypes } from './types'

import createStoreWithId, {
  initialState,
  setBlackSquareColourAction,
  setFenAction,
  setEventFuncAction,
  setOrientationAction,
  setShowCoordinatesAction,
  setWhiteSquareColourAction,
} from './store'

class ChessboardProvider extends Component {
  componentWillMount() {
    const id = uuidv4()
    // unique id, required for multiple chessboards on a single page
    // the redux store and reducers etc are namespaced with this
    // There will be a unique store for each Chessboard instance
    this.uuid = id
    this.store = createStoreWithId(id)
    const { store, uuid } = this

    // set state from passed in props
    const {
      blackSquareColour,
      dropOffBoard,
      fen,
      onChange,
      orientation,
      showCoordinates,
      whiteSquareColour,
    } = this.props
    // other props
    if (blackSquareColour !== initialState.blackSquareColour) {
      store.dispatch(setBlackSquareColourAction(uuid, blackSquareColour))
    }
    if (dropOffBoard !== initialState.dropOffBoard) {
      store.dispatch(setDropOffBoardAction(uuid, dropOffBoard))
    }
    if (fen !== initialState.fen) {
      store.dispatch(setFenAction(uuid, fen))
    }
    if (orientation !== initialState.orientation) {
      store.dispatch(setOrientationAction(uuid, orientation))
    }
    if (showCoordinates !== initialState.showCoordinates) {
      store.dispatch(setShowCoordinatesAction(uuid, showCoordinates))
    }
    if (whiteSquareColour !== initialState.whiteSquareColour) {
      store.dispatch(setWhiteSquareColourAction(uuid, whiteSquareColour))
    }
    // set event handlers
    store.dispatch(setEventFuncAction(uuid, 'onChange', onChange))
  }

  componentWillReceiveProps(nextProps) {
    // update state if props have changed
    const {
      blackSquareColour,
      dropOffBoard,
      fen,
      orientation,
      showCoordinates,
      whiteSquareColour,
    } = nextProps
    const { store, uuid } = this
    if (blackSquareColour !== this.props.blackSquareColour) {
      store.dispatch(setBlackSquareColourAction(uuid, blackSquareColour))
    }
    if (dropOffBoard !== this.props.dropOffBoard) {
      store.dispatch(setDropOffBoardAction(uuid, dropOffBoard))
    }
    if (fen !== this.props.fen) {
      store.dispatch(setFenAction(uuid, fen))
    }
    if (orientation !== this.props.orientation) {
      store.dispatch(setOrientationAction(uuid, orientation))
    }
    if (showCoordinates !== this.props.showCoordinates) {
      store.dispatch(setShowCoordinatesAction(uuid, showCoordinates))
    }
    if (whiteSquareColour !== this.props.whiteSquareColour) {
      store.dispatch(setWhiteSquareColourAction(uuid, whiteSquareColour))
    }
  }

  render() {
    const { width, style, activeSquare } = this.props
    return (
      <Provider store={this.store}>
        <Chessboard
          activeSquare={activeSquare}
          uuid={this.uuid}
          style={style}
          width={width}
        />
      </Provider>
    )
  }
}

ChessboardProvider.propTypes = {
  activeSquare: PropTypes.string,
  blackSquareColour: PropTypes.string,
  dropOffBoard: PropTypes.bool,
  fen: PropTypes.string,
  onChange: PropTypes.func,
  orientation: PropTypes.oneOf(orientationTypes),
  showCoordinates: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  whiteSquareColour: PropTypes.string,
}

ChessboardProvider.defaultProps = {
  activeSquare: null,
  blackSquareColour: initialState.blackSquareColour,
  dropOffBoard: initialState.dropOffBoard,
  fen: initialState.fen,
  onChange: initialState.events.onChange,
  orientation: initialState.orientation,
  showCoordinates: initialState.showCoordinates,
  width: initialState.width,
  style: {},
  whiteSquareColour: initialState.whiteSquareColour,
}

export default ChessboardProvider
