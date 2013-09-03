
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
describe('Get method', function() {
  it('get single user', function(done) {
    this.timeout(5000);

    rw.get('zzolo').done(function(data) {
      assert.equal('object', typeof data);
      assert.equal('object', typeof data.zzolo);
      assert.equal('object', typeof data.zzolo.objects);
      done();
    });
  });

  it('get multiple users', function(done) {
    this.timeout(0);

    rw.get('zzolo,minnpost').done(function(data) {
      // For easy viewing
      //fs.writeFileSync('./.tmp/zzolo-minnpost.json', JSON.stringify(data));
      assert.equal('object', typeof data);
      assert.equal('object', typeof data.zzolo);
      assert.equal('object', typeof data.zzolo.objects);
      done();
    });
  });

  it('get paged user', function(done) {
    this.timeout(0);

    rw.get('codeforamerica').done(function(data) {
      assert.equal('object', typeof data);
      assert.equal('object', typeof data.codeforamerica);
      assert.equal('object', typeof data.codeforamerica.objects);
      assert.equal('object', typeof data.codeforamerica.objects.repos);
      assert.equal(true, (data.codeforamerica.objects.repos.length > 100));
      done();
    });
  });
});