
var assert = require('assert');
var rw = require('../index.js');

// Make calls
describe('Just the basic calls', function() {
  it('should not error on calling .get', function() {
      assert.doesNotThrow(function() {
        rw.get();
      });
  });
});