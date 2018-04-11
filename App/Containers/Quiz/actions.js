import { FETCH_QUESTIONS, ANSWER_QUESTION, CLEAR_QUESTIONS } from './constants'
import OpenTDBApi from '../../Services/OpenTDBApi'

const api = OpenTDBApi.create()

export function fetchQuestions () {
  return {
    type: FETCH_QUESTIONS,
    payload: api.getQuestions()
  }
}

export function answerQuestion (answer) {
  return {
    type: ANSWER_QUESTION,
    payload: answer
  }
}

export function clearQuestions () {
  return {
    type: CLEAR_QUESTIONS
  }
}
