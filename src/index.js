const redirectFlashMiddleware = (option) => {
  // Implement of the method `redirectFlash([status], url, data)`
  const redirectFlashImpl = (req, res) => {
    return (...args) => {
      // Defaults of arguments
      let status = 302
      let url = '#'
      let data = {}
      // Attach the arguments
      for(argv of args) {
        if('number' === typeof argv) {
          status = argv | 0
        } else if('string' === typeof argv) {
          url = argv
        } else if(argv && 'object' == typeof argv) {
          Object.assign(data, argv)
        }
      }
      // Set data into the session
      if(req.session) {
        req.session.redirectFlash = data
      }
      // Redirect
      res.redirect(status, url)
    }
  }
  // redirect-flash-middleware
  return (req, res, next) => {
    if(req.session) {
      // Get data from the session
      Object.assign(res.locals, req.session.redirectFlash)
      // Clear data in the session
      req.session.redirectFlash = {}
    }
    // Add the method `redirectFlash([status], url, data)`
    res.redirectFlash = redirectFlashImpl(req, res)
    next()
  }
}
module.exports = redirectFlashMiddleware