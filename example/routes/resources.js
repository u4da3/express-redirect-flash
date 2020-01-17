var express = require('express');
var router = express.Router();

router.post('/update', (req, res) => {
  // get request parameters
  const data = {
    key_1: req.body['data-1'],
    key_2: req.body['data-2'],
  }

  // redirect with the flash attributes
  res.redirectFlash(302, 'show', data)
})

router.get('/show',  (req, res) => {
  // get the flash attribute by key_2
  let value_2 = res.locals.key_2 || ''
  value_2 = value_2 + '!'

  // render with the flash attributes
  res.render('resources', {key_2: value_2})
})

module.exports = router;
