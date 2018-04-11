import { createStore, combineReducers, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import QuizReducer from '../Containers/Quiz/reducer'

export const reducers = combineReducers({
  quiz: QuizReducer
})

export default () => createStore(reducers, {}, applyMiddleware(thunkMiddleware, promiseMiddleware(), logger))
