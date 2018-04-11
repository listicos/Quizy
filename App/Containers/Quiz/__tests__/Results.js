import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import Results from '../Results'

const initialState = {}
const mockStore = configureStore()
let store

beforeEach(() => {
  store = mockStore(initialState)
})

test('Render Results', () => {
  const wrapper = shallow(<Results store={store} />)
  expect(wrapper).toMatchSnapshot()
})
