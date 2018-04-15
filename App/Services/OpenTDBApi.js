import apisauce from 'apisauce'

const create = (baseURL = 'https://opentdb.com') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    }
  })

  const getQuestions = (amount = 10, difficulty = 'hard', type = 'boolean') =>
    api.get(`/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}`)

  return {
    getQuestions,
    axiosInstance: api.axiosInstance
  }
}

export default {
  create
}
