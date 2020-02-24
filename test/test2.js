const assert = require('chai').assert
const httpMocks = require('node-mocks-http');
const {redirectFlashMiddleware} = require('../src/index')

describe('res.redirectFlash()', function() {

  it('should call the function res.redirct().', function(done) {
    // create the middleware to be tested
    var redirectFlash = redirectFlashMiddleware()
    // create the request
    var req = httpMocks.createRequest({
      session: {}
    });
    // create the response
    var res = httpMocks.createResponse({});
    res.redirect = function() {done()}
    // create the next()
    var next = function() {}
  
    // execute the middleware
    redirectFlash(req, res, next);

    // excecute res.redirectFlash
    const data = {}
    res.redirectFlash(302, '/redirect', data);

    // assertion
    assert.fail('error: the function done() has not called');
  });

  it('should pass the arguments `status` and `url` to res.redirect().', function(done) {
    // create the middleware to be tested
    var redirectFlash = redirectFlashMiddleware()
    // create the request
    var req = httpMocks.createRequest({
      session: {}
    });
    // create the response
    var res = httpMocks.createResponse({});
    res.redirect = function(status, url) {
      // assertion
      assert.equal(status, 304, 'error: the argmeint `status` has not passed to res.redirect()');
      assert.equal(url, '/redirect', 'error: the argmeint `status` has not passed to res.redirect()')
      done()}
    // create the next()
    var next = function() {}
  
    // execute the middleware
    redirectFlash(req, res, next);

    // excecute res.redirectFlash
    const data = {}
    res.redirectFlash(304, '/redirect', data);
  });

  it('should pass the arguments `url` to res.redirect().', function(done) {
    // create the middleware to be tested
    var redirectFlash = redirectFlashMiddleware()
    // create the request
    var req = httpMocks.createRequest({
      session: {}
    });
    // create the response
    var res = httpMocks.createResponse({});
    res.redirect = function(status, url) {
      // assertion
      assert.equal(status, 302, 'error: the argmeint `status` has not passed to res.redirect()');
      assert.equal(url, '/redirect', 'error: the argmeint `status` has not passed to res.redirect()')
      done()}
    // create the next()
    var next = function() {}
  
    // execute the middleware
    redirectFlash(req, res, next);

    // excecute res.redirectFlash
    const data = {}
    res.redirectFlash('/redirect', data);
  });

  it('should not throw an exception when the session is undefined.', function(done) {
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

    // excecute res.redirectFlash
    const data = {}
    res.redirectFlash(302, '/redirect', data);

    // assertion
    assert.fail('error: the function done() has not called');
  });

  it('should store the redirect attributes in the session when three arguments are given.', function(done) {
    // create the middleware to be tested
    var redirectFlash = redirectFlashMiddleware()
    // create the request
    var req = httpMocks.createRequest({
      session: {}
    });
    // create the response
    var res = httpMocks.createResponse({});
    // create the next()
    var next = function() {}
  
    // execute the middleware
    redirectFlash(req, res, next);

    // excecute res.redirectFlash
    const data = {
      key1: 'value1',
      key2: {
        key2_1: 'value2_1',
        key2_2: 'value2_2'
      }
    }
    res.redirectFlash(304, '/redirect', data);

    // assertion
    assert.equal(req.session.redirectFlash.key1, 'value1', 'error: the redirect attribute `key1` has not stored in the session.');
    assert.equal(req.session.redirectFlash.key2.key2_1, 'value2_1', 'error: the redirect attribute `key2_1` has not stored in the session.');
    assert.equal(req.session.redirectFlash.key2.key2_2, 'value2_2', 'error: the redirect attribute `key2_2` has not stored in the session.');
    done();
  });


  it('should store the redirect attributes in the session when two arguments are given.', function(done) {
    // create the middleware to be tested
    var redirectFlash = redirectFlashMiddleware()
    // create the request
    var req = httpMocks.createRequest({
      session: {}
    });
    // create the response
    var res = httpMocks.createResponse({});
    // create the next()
    var next = function() {}
  
    // execute the middleware
    redirectFlash(req, res, next);

    // excecute res.redirectFlash
    const data = {
      key1: 'value1',
      key2: {
        key2_1: 'value2_1',
        key2_2: 'value2_2'
      }
    }
    res.redirectFlash('/redirect', data);

    // assertion
    assert.equal(req.session.redirectFlash.key1, 'value1', 'error: the redirect attribute `key1` has not stored in the session.');
    assert.equal(req.session.redirectFlash.key2.key2_1, 'value2_1', 'error: the redirect attribute `key2_1` has not stored in the session.');
    assert.equal(req.session.redirectFlash.key2.key2_2, 'value2_2', 'error: the redirect attribute `key2_2` has not stored in the session.');
    done();
  });
}); 