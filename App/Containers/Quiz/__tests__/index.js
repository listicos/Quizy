import 'react-native'
import React from 'react'
import thunk from 'redux-thunk'
import sinon from 'sinon'
import renderer from 'react-test-renderer'
import Quiz from '../index'
import createStore from '../../../Store/Redux'
import { openTDBApi } from '../../../Store/Api'
import * as types from '../constants'
import { parseQuestion } from '../types'

const questions = {
  data: {
    results: [
      parseQuestion({
        category: 'Entertainment: Video Games',
        type: 'multiple',
        difficulty: 'easy',
        question: 'What year was the game Team Fortress 2 released?',
        correct_answer: '2007'
      }),
      parseQuestion({
        category: 'Geography',
        type: 'multiple',
        difficulty: 'medium',
        question: 'In which city, is the Big Nickel located in Canada?',
        correct_answer: 'Sudbury, Ontario'
      })
    ]
  }
}

describe('Quiz Container', () => {
  let store

  beforeEach(() => {
    sinon.stub(openTDBApi, 'getQuestions')
    openTDBApi.getQuestions.returns(new Promise((resolve) => resolve(questions)))
    store = createStore(false)
  })

  afterEach(() => {
    openTDBApi.getQuestions.restore()
  })

  it('Renders Quiz', async () => {
    const QuizComponent = renderer.create(<Quiz store={store} />)
    expect(QuizComponent).toMatchSnapshot()
  })

  it('Starts with question #1', () => {
    renderer.create(<Quiz store={store} />)
    const state = store.getState()
    expect(state.quiz.currentQuestionIndex + 1).toEqual(1)
  })

  it('Fetchs the questions', () => {
    const QuizComponent = renderer.create(<Quiz store={store} />)
    store.dispatch({
      type: types.FETCH_QUESTIONS_FULFILLED,
      payload: questions
    })
    const state = store.getState()
    expect(state.quiz.results).toEqual(questions.data.results)
  })

  it('Increases the currentQuestionIndex onPress the YES button', () => {
    const QuizComponent = renderer.create(<Quiz store={store} />)
    store.dispatch({
      type: types.FETCH_QUESTIONS_FULFILLED,
      payload: questions
    })
    QuizComponent.root.findByProps({ id: 'answerButtonYes' }).props.onPress()
    expect(store.getState().quiz.currentQuestionIndex).toEqual(1)
  })

  it('Increases the currentQuestionIndex onPress the NO button', () => {
    const QuizComponent = renderer.create(<Quiz store={store} />)
    store.dispatch({
      type: types.FETCH_QUESTIONS_FULFILLED,
      payload: questions
    })
    QuizComponent.root.findByProps({ id: 'answerButtonYes' }).props.onPress()
    expect(store.getState().quiz.currentQuestionIndex).toEqual(1)
  })

  it('Restart the state when the component renders', () => {
    const QuizComponent = renderer.create(<Quiz store={store} />)
    store.dispatch({
      type: types.FETCH_QUESTIONS_FULFILLED,
      payload: questions
    })
    QuizComponent.root.findByProps({ id: 'answerButtonYes' }).props.onPress()
    expect(store.getState().quiz.currentQuestionIndex).toEqual(1)
    const QuizComponent2 = renderer.create(<Quiz store={store} />)
    expect(store.getState().quiz.currentQuestionIndex).toEqual(0)
  })
})
