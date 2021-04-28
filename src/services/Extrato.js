// import Request from 'src/helpers/Request'
import axios from 'axios'

// export const config = Request.config({ baseUrl: '/api/extrato' })
const http = axios.create(Object.assign({
  timeout: 60000
  // baseUrl: '/api/extrato'
}))

const extrato = {
  getTotalTime (params) {
    params.from = new Date(params.from)
    params.to = new Date(params.to)
    console.log('params ', params)
    return http.get('/api/extrato/tempo', { params })
  }
}

// export const config = Request.config({ baseUrl: '/api/extrato' })

// const extrato = {
//   getTotalTime (params) {
//     return config().then(http => {
//       return http.get('/api/extrato', { params })
//     })
//   }
// }

export default extrato
