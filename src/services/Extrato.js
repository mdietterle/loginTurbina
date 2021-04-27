import Request from 'src/helpers/Request'

// export const config = Request.config({ baseUrl: '/api/extrato' })

export const config = Request.config({ baseUrl: '/api/extrato' })

const extrato = {
  getTotalTime (params) {
    return config()
      .then(http => http.get('/', { params }))
  }
}

export default extrato
