/**
 * github-collect
 *
 * A NodeJS library for getting Github objects like
 * repositories, members, gists for users and orgs.
 */

var _ = require('lodash');
var q = require('q');

var env = require('rc')('github_collect', {
  github_token: ''
});
var github = new (require('github'))({
  version: '3.0.0'
});

// Need this for all github calls
function githubAuth() {
  github.authenticate({
    type: 'oauth',
    token: env.github_token
  });
  return github;
}

// Wrap github calls in to promises
function qG(options) {
  var defer = q.defer();
  var compiledData = [];

  // Recursive call to paginate
  function qGCall(pageLink) {
    var methodCall;

    // Callback
    function callback(error, data) {
      if (error) {
        defer.reject(new Error(error));
      }
      else {
        compiledData = compiledData.concat(data);
        if (github.hasNextPage(data)) {
          qGCall(data);
        }
        else {
          defer.resolve(compiledData);
        }
      }
    }

    // If the call is a link to another page, use that.
    if (pageLink) {
      method = github.getNextPage(pageLink, callback);
    }
    else {
      githubAuth()[options.obj][options.method](options, callback);
    }
  }
  qGCall();

  return defer.promise;
}

// Get objects for a specific username
function getObjects(user) {
  var username = (_.isObject(user)) ? user.login : user;
  var isOrg = (_.isObject(user) && user.type === 'Organization');
  var defers = [];

  // Get repos
  defers.push(qG({
    obj: 'repos', method: 'getFromUser', user: username,
    sort: 'created', per_page: 100
  }));

  // Get gists
  defers.push(qG({
    obj: 'gists', method: 'getFromUser', user: username,
    sort: 'created', per_page: 100
  }));

  // Get members (for orgs)
  if (isOrg) {
    defers.push(qG({
      obj: 'orgs', method: 'getMembers', org: username,
      per_page: 100
    }));
  }

  return q.all(defers);
}

// Get data from usernames, which can be an array of usernames
// or a string of usernames separated by commas.
function get(usernames, options) {
  usernames = usernames || '';
  usernames = (_.isArray(usernames)) ? usernames : usernames.split(',');
  options = options || {};
  var defers = [];
  var collection = {};

  _.each(usernames, function(u) {
    var defer = q.defer();
    u = u.toLowerCase();

    if (u.length === 0) {
      return;
    }

    qG({
      obj: 'user', method: 'getFrom', user: u
    })
    .done(function(data) {
      collection[u] = data[0];

      // Get objects for the specific user
      getObjects(data[0]).done(function(objData) {
        collection[u].objects = collection[u].objects || {};
        collection[u].objects.repos = objData[0];
        collection[u].objects.gists = objData[1];
        collection[u].objects.members = objData[2];

        defer.resolve(collection[u]);
      });
    });

    defers.push(defer.promise);
  });

  return q.all(defers).then(function() {
    return collection;
  });
}

module.exports = {
  getObjects: getObjects,
  get: get
};