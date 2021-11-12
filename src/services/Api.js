import axios from 'axios'
import store from '@/store/store'

const ipRegex = require('ip-regex')
var ipAddress = window.location.host
var match = ipAddress.match(ipRegex())
var backendUrl = window.location.protocol + '//' + match[0] + ":8081/";


export default () => {
  return axios.create({
    baseURL: backendUrl,
    headers: {
      Authorization: `${store.state.token}`,
    }
  })
}