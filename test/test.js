
var assert = require('assert');
var fs = require('fs');
var rw = require('../index.js');

// Make calls
describe('Just the basic calls', function() {
  it('should not error on calling .get', function() {
      assert.doesNotThrow(function() {
        rw.get();
      });
  });
});

// Basic gets
describe('Get', function() {
  it('get single user', function(done) {
    rw.get('zzolo').done(function(data) {
      assert.equal('object', typeof data);
      done();
    });
  });

  it('get multiple users', function(done) {
    this.timeout(5000);

    rw.get('zzolo,minnpost').done(function(data) {
      // For easy viewing
      fs.writeFileSync('./.tmp/zzolo-minnpost.json', JSON.stringify(data));

      assert.equal('object', typeof data);
      assert.equal('object', typeof data.zzolo);
      done();
    });
  });
});