import { FETCH_QUESTIONS, ANSWER_QUESTION, CLEAR_QUESTIONS } from './constants'
import { openTDBApi } from '../../Store/Api'

export function fetchQuestions () {
  return {
    type: FETCH_QUESTIONS,
    payload: openTDBApi.getQuestions()
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
