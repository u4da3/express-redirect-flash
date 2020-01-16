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
router.post('resources/update' (req, res) => {
  // update resources in the database

  // redirect with the flash attributes
  res.redirectFlash(302, 'resources/show', {
    key1: 'value1',
    key2: 'value2'
  })
})

router.get('resources/show',  (req, res) => {
  // Get the flash attribute `key1`
  const v1 = res.locals.key1

  // render with the flash attributes
  res.render('view/resources')
})
```

