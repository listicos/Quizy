import Immutable from 'seamless-immutable'
import {
  FETCH_QUESTIONS_PENDING,
  FETCH_QUESTIONS_FULFILLED,
  FETCH_QUESTIONS_REJECTED,
  ANSWER_QUESTION,
  CLEAR_QUESTIONS
} from './constants'
import { parseQuestion, QuizState } from './models'

const INITIAL_STATE: QuizState = Immutable({
  results: [],
  isFetching: false,
  error: false,
  currentQuestionIndex: 0
})

export default function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_QUESTIONS_PENDING:
      return {
        ...state,
        results: [],
        isFetching: true
      }
    case FETCH_QUESTIONS_FULFILLED:
      return {
        ...state,
        isFetching: false,
        results: action.payload.data.results.map((result) => parseQuestion(result))
      }
    case FETCH_QUESTIONS_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: true
      }
    case ANSWER_QUESTION:
      const results = state.results.map((result, index) => {
        if (index === state.currentQuestionIndex) {
          result.isCorrect = action.payload === result.correctAnswer
        }
        return result
      })
      const isLastQuestion = state.results.length === state.currentQuestionIndex + 1
      return {
        ...state,
        results,
        currentQuestionIndex: !isLastQuestion ? state.currentQuestionIndex + 1 : state.currentQuestionIndex
      }
    case CLEAR_QUESTIONS:
      return INITIAL_STATE
    default:
      return state
  }
}
