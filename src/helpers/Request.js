// import store from '../store'
import router from '../router'
import axios from 'axios'

const Request = {
  timeout: 30000, // ajustado devido a chamado por conta de limite de tempo atingido (era 15000)

  interceptors: {
    success: (response) => {
      return response
    },

    error: (error) => {
      // 401 || 403: Usuário sem sessão no Turbina ou permissão negada.
      // if ((error && error.response) && (error.response.status === 401 || error.response.status === 403)) {
      console.log('403')
      router.push({ name: 'Uso' })
      // setTimeout() here is a hack to push this message to snackBar after any other message
      // that the component making the request may send. This must be fixed in the components
      // making the requests, validating if (error.response.status === 401 || 403) and not trying to
      // show the snackbar in those cases.
      // window.setTimeout(() => store.commit('showSnackBar', 'Você está sem sessão.'), 1)
      // }

      return Promise.reject(error)
    },
    config (primaryConfig = {}) {
      return (secondaryConfig) => {
        const config = secondaryConfig || primaryConfig
        // Merge param config with default config
        const http = axios.create(Object.assign({
          baseURL: '/',
          timeout: this.timeout
        }, { ...config }))

        http.interceptors.response.use(this.interceptors.success, this.interceptors.error)
        return http
      }
    }
  }
}

export default Request
