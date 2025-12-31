import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const getAll = () => {
  console.log("Fetching countries data")
  return axios.get(`${baseUrl}api/all`)
}

export default getAll
