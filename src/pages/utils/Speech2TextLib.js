const requestPromise = require('request-promise')
const pino = require('pino')
const { isTypeOf, waitForBeTrusty } = require('icolabora-utils')

const logger = pino({
  name: 'gcgov-lib',
  level: 'debug',
  messageKey: 'message',
  formatters: {
    level (label) {
      return { level: label }
    }
  },
  timestamp: () => `,"timestamp":"${new Date().toISOString()}"`
})

const Speech2TextLib = {
  /**
   * Get access from some API. Only known methods by GCGov are supported
   * @param {!{ uri: string, auth?: { turbina: { username: string, password: string }, consumidorgov: { clientId: string, code: string, clientSecret: string } } }} config - If passed turbina to auth object the login method will try get cookie credentials form Turbina. If passed consumidorgov it will try get access_token form consumidor.gov.br
   * @param {Object} config.auth - Authentication object to send to API
   * @return {Promise<string>}
   */
  login ({ uri = '', auth = {} }) {
    const defaultOptions = {
      resolveWithFullResponse: true,
      json: true,
      method: 'POST'
    }

    // Prevent wrong uri
    uri = new URL(uri)

    if (isTypeOf(auth.turbina, 'object') && isTypeOf(auth.turbina.username, 'string') && isTypeOf(auth.turbina.password, 'string')) {
      uri.pathname = '/api/auth/login'

      const options = {
        ...defaultOptions,
        uri,
        form: {
          username: auth.turbina.username,
          password: auth.turbina.password
        }
      }

      return requestPromise(options).then(({ headers = {} }) => {
        const [cookie] = headers['set-cookie'] || ['']
        const [sessionId] = cookie.split(';')

        if (sessionId) {
          return sessionId
        }

        throw new Error(`Error in authenticate with ${uri}. The headers['set-cookie'] is unreachable`)
      }, (error) => {
        throw error
      })
    }

    return Promise.reject(new Error('Auth object is not supported by GCGovLib'))
  },

  /**
   * Do request to any website, with authentication. It try again get access credentials if the API returns status code 401
   * @function
   * @param {Object} configurations
   * @param {!{ uri?: string, auth: { turbina: { username: string, password: string }, consumidorgov: { clientId: string, code: string, clientSecret: string } } }} configurations.login - Configuration for get access credentials
   * @param {...Object} configurations.defaultConfig - Configuration to [request.js](https://github.com/request/request) defaults configurations
   * @returns {Promise<function>}
   */
  authRequest ({
    login = {
      uri: '',
      auth: {}
    },
    ...defaultConfig
  }) {
    login.uri = login.uri || defaultConfig.baseUrl
    const authType = login.auth.turbina ? 'Cookie' : 'Authorization'

    return waitForBeTrusty(Speech2TextLib.login, { timer: 3000, limiter: 2, paramsToAsyncFn: login })
      .then((credentials) => {
        let accessCredentials = credentials

        const request = requestPromise.defaults({
          timeout: 100000,
          resolveWithFullResponse: true,
          ...defaultConfig
        })

        function http (optionsToSend) {
          const options = {
            ...optionsToSend,
            headers: {
              [authType]: accessCredentials,
              ...optionsToSend.headers || {}
            }
          }

          const catch401 = (options) => (error) => {
            if (error.statusCode === 401) {
              return waitForBeTrusty(Speech2TextLib.login, { timer: 3000, limiter: 2, paramsToAsyncFn: login })
                .then((credentials) => {
                  accessCredentials = credentials

                  options.headers[authType] = accessCredentials
                  return request(options)
                })
                .catch((error) => {
                  logger.error({ statusCode: error.statusCode, stack: error.stack }, error.message)
                  throw error
                })
            }

            return Promise.reject(error)
          }

          return request(options).catch(catch401(options))
        }

        return http
      })
      .catch((error) => {
        logger.error({ statusCode: error.statusCode, stack: error.stack }, error.message)
        throw error
      })
  }
}

module.exports = Speech2TextLib
