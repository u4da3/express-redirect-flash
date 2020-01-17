# express-redirect-flash
This middlware meke it possible to redirect requests with flash attributes.

## Syntax

```js
res.redirectFlash([status,] url, data)
```

## Usage
### app.js
```js
const session = require('express-session')
const redirectFlash = require('express-redirect-flash')

app.use(session({
  // some options
}))
app.use(redirectFlash())
```
### router.js
```js
router.post('/update' (req, res) => {
  // update resources in the database

  // redirect with the flash attributes
  res.redirectFlash(302, 'show', {
    key1: 'value1',
    key2: 'value2'
  })
})

router.get('/show',  (req, res) => {
  // Get the flash attribute `key1`
  const v1 = res.locals.key1

  // render with the flash attributes
  res.render('resources')
})
```

### PRG Pattern
`express-redirect-flash` make it easer to implement applications with the PRG pattern (Post-Redirect-Get pattern) for security.

![sequence dialog](http://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/u4da3/express-redirect-flash/develop/uml/seq.puml)
