import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `https://playing-eagles-api.herokuapp.com/v1`,
    headers: {
      'Authorization': localStorage.getItem('user-token')
    }
  })
}