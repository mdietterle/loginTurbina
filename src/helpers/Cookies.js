const Cookies = {
  set (name, value, days) {
    let expires
    if (days) {
      const date = new Date()
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
      expires = '; expires=' + date.toGMTString()
    } else {
      expires = ''
    }
    if (document.domain === 'localhost') {
      document.cookie = name + '=' + value + expires + ';path=/;'
    } else {
      document.cookie = name + '=' + value + expires + ';domain=.' + document.domain + ';path=/;'
    }
  },
  get (cName) {
    if (document.cookie.length > 0) {
      let cStart = document.cookie.indexOf(cName + '=')
      if (cStart !== -1) {
        cStart = cStart + cName.length + 1
        let cEnd = document.cookie.indexOf(';', cStart)
        if (cEnd === -1) {
          cEnd = document.cookie.length
        }
        return unescape(document.cookie.substring(cStart, cEnd))
      }
    }
    return null
  }
}

export default Cookies
