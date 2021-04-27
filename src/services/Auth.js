import axios from 'axios'
// const Speech2TextLib = require('../pages/utils/Speech2TextLib')
import Request from '../helpers/Request'
// import router from '../router'

const AuthInstance = axios.create({
  baseURL: 'http://localhost/api/auth',
  timeout: Request.timeout
})

// const turbinaRequest = Speech2TextLib.authRequest({
//   // baseUrl: apiUrl + '/api',
//   login: {
//     uri: 'http://localhost:3000/api/auth',
//     auth: {
//       turbina: {
//         username: 'spch2txt',
//         password: 'spch2txt!@#'
//       }
//     }
//   }
// })

AuthInstance.interceptors.response.use(Request.interceptors.success, Request.interceptors.error)

export default {
  postData (url = '', data = {}) {
    console.log('url', url)
    console.log('data ', data)
    const response = fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      referrerPolicy: 'no-referrer',
      // redirect: 'manual',
      body: JSON.stringify(data)
    })
    // var formBody = []
    // for (var property in data) {
    //   var encodedKey = encodeURIComponent(property)
    //   var encodedValue = encodeURIComponent(data[property])
    //   formBody.push(encodedKey + '=' + encodedValue)
    // }
    // formBody = formBody.join('&')

    // const response = fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    //   },
    //   body: formBody
    // })
    return response
  },

  async login (userData) {
    console.log('Userdata ', userData)
    await this.postData('http://skydev.icolabora.com.br/api/auth/login', userData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
      .then(data => {
        console.log('datassss ', data)
        // this.$route.push('pages/Uso')
        return data.json()
      })
      .catch(error => {
        console.log('erro no login ', error)
      })
    // return AuthInstance.post('/login', userData) // , { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
    // await turbinaRequest.then(http => http({
    //   uri: '/login',
    //   method: 'POST',
    //   json: true
    // }))
    //   .then((response) => {
    //     console.log('resp', response)
    //   })
    //   .catch(error => {
    //     console.log('err', error)
    //   })
  },

  hasSession (userCookie) {
    return AuthInstance.get('/hassession', userCookie)
  },

  logout (userCookie) {
    return AuthInstance.post('/logout', userCookie, {
      timeout: 3500
    })
  },

  ping () {
    return AuthInstance.head('/ping')
  }
}
