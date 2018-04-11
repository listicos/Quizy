import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import Button from '../index'

test('Render Button', () => {
  const wrapper = shallow(<Button />)
  expect(wrapper).toMatchSnapshot()
})
