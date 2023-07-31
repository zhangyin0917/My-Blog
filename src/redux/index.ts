import thunk, { type ThunkAction, type ThunkDispatch } from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
