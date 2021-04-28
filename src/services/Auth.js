import axios from 'axios'
// const Speech2TextLib = require('../pages/utils/Speech2TextLib')
import Request from '../helpers/Request'
// import router from '../router'
import { Cookies } from 'quasar'

const AuthInstance = axios.create({
  baseURL: 'http://localhost/api/auth',
  timeout: Request.timeout
})

// const http = axios.create(Object.assign({
//   timeout: 30000
// }))
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
    // const response = fetch(url, {
    //   method: 'POST',
    //   resolveWithFullResponse: true,
    //   json: true,
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   // redirect: 'manual',
    //   body: JSON.stringify(data)
    // })

    // const response = http.post(url, data, {
    //   resolveWithFullResponse: true,
    //   json: true,
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // })

    // const response = http.post(url, {
    //   form: {
    //     username: data.username,
    //     password: data.password
    //   }
    // })

    var request = require('request')
    var options = {
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        // 'Cookie': 'TURBINA-SESSIONID=95d192fb2c864e5d9b5fc48ad18dce6f; TURBINA-SSO-SESSIONID=95d192fb2c864e5d9b5fc48ad18dce6f'
      },
      form: {
        username: 'spch2txt',
        password: 'spch2txt!@#'
      }
    }
    const response = request(options, function (error, response) {
      if (error) throw new Error(error)
      console.log(response.body)
      const cookies = Cookies.getAll()
      console.log('Cookies ', cookies)
      return response.body
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
    await this.postData('/auth/login', userData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
      .then(data => {
        console.log('datassss ', data)
        this.$route.push('pages/Uso')
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
