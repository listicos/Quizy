import * as actions from '../actions'
import * as types from '../constants'
import OpenTDBApi from '../../../Services/OpenTDBApi'

const api = OpenTDBApi.create()

describe('Quiz Actions', () => {
  it('FETCH_QUESTIONS', () => {
    const expectedAction = {
      type: types.FETCH_QUESTIONS,
      payload: api.getQuestions()
    }
    expect(actions.fetchQuestions()).toEqual(expectedAction)
  })

  it('ANSWER_QUESTION', () => {
    const mockAnswer = true
    const expectedAction = {
      type: types.ANSWER_QUESTION,
      payload: mockAnswer
    }
    expect(actions.answerQuestion(mockAnswer)).toEqual(expectedAction)
  })

  it('CLEAR_QUESTIONS', () => {
    const expectedAction = {
      type: types.CLEAR_QUESTIONS
    }
    expect(actions.clearQuestions()).toEqual(expectedAction)
  })
})
