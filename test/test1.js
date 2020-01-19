const assert = require('assert')
const httpMocks = require('node-mocks-http');
const redirectFlashMiddleware = require('../src/index')

describe('redirectFlashMiddleware', function() {

  it('should clear the flash attributes and move it into res.locals', function(done) {
    // create the middleware to be tested
    var redirectFlash = redirectFlashMiddleware()
    // create the request
    var req = httpMocks.createRequest({
      session: {
        redirectFlash: {
          key1: 'value1',
          key2: {
            key2_1: 'value2_1',
            key2_2: 'value2_2'
          }
        },
        key3: 'value3'
      }
    });
    // create the response
    var res = httpMocks.createResponse({});
    // create the next()
    var next = function() {};
  
    // execute the middleware
    redirectFlash(req, res, next);

    // assertion
    assert(0 === Object.keys(req.session.redirectFlash).length, 'error: the redirect attributes has not cleard.');
    assert('value3' === req.session.key3, 'error: the session data that is not a the redirect attribute has cleard.');
    assert('value1' === res.locals.key1, 'error: the redirect attribute `key1` has not moved.');
    assert('value2_1' === res.locals.key2.key2_1, 'error: the redirect attribute `key2_1` has not moved.');
    assert('value2_2' === res.locals.key2.key2_2, 'error: the redirect attribute `key2_2` has not moved.');
    done();
  });

  it('should attach res.redirectFlash as a function', function(done) {
    // create the middleware to be tested
    var redirectFlash = redirectFlashMiddleware()
    // create the request
    var req = httpMocks.createRequest({
      session: {}
    });
    // create the response
    var res = httpMocks.createResponse({});
    // create the next()
    var next = function() {};
  
    // execute the middleware
    redirectFlash(req, res, next);

    // assertion
    assert(typeof res.redirectFlash == 'function', 'error');
    done();
  });

  it('should call the function next()', function(done) {
    // create the middleware to be tested
    var redirectFlash = redirectFlashMiddleware()
    // create the request
    var req = httpMocks.createRequest({
      session: {}
    });
    // create the response
    var res = httpMocks.createResponse({});
    // create the next()
    var next = function() {done()}
  
    // execute the middleware
    redirectFlash(req, res, next);

    // assertion
    assert(false, 'error: the function done() has not called');
  });

  it('should not throw an exception when the session is undefined, ', function(done) {
    // create the middleware to be tested
    var redirectFlash = redirectFlashMiddleware()
    // create the request
    var req = httpMocks.createRequest({});
    // create the response
    var res = httpMocks.createResponse({});
    // create the next()
    var next = function() {done()}
  
    // execute the middleware
    redirectFlash(req, res, next);

    // assertion
    assert(false, 'error: the function done() has not called');
  });
}); 