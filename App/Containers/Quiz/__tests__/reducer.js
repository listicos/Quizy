import reducer from '../reducer'

describe('Quiz reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      results: [],
      dataFetched: false,
      isFetching: false,
      error: false,
      currentQuestionIndex: 0
    })
  })
})
