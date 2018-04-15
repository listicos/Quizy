import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import Results from '../Results'
import createStore from '../../../Store/Redux'

describe('Quiz Container', () => {
  let store

  beforeEach(() => {
    store = createStore(false)
  })

  it('Renders Results', () => {
    const ResultsComponent = renderer.create(<Results store={store} />)
    expect(ResultsComponent).toMatchSnapshot()
  })
})
