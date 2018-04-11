import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import Quiz from '../index'

// I can improve the test coverage, but it's just a demo

const INITIAL_STATE = {
  quiz: {
    results: [],
    dataFetched: false,
    isFetching: false,
    error: false,
    currentQuestionIndex: 0
  }
}

describe('Quiz Container', () => {
  const mockStore = configureStore()
  let store

  beforeEach(() => {
    store = mockStore(INITIAL_STATE)
  })

  it('Render Quiz', () => {
    const wrapper = shallow(<Quiz store={store} />)
    expect(wrapper).toMatchSnapshot()
  })
})
