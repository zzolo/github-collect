# Github Collect

A NodeJS library for getting Github objects like
repositories, members, gists for users and orgs.

## Install

    npm install repo-watch

## Configuration

Configuration is handled by [rc]() so any of those valid ways of defining
configuration will work.

* `github_token`: Your Oauth token for Github; you can create one on your Github
account under Settings ->  Applications.
Example of using an environment variable:
`export github_collect_github_token=abc`

## Use

    var rw = require('repo-watch');

    // Uses promises with [q]()
    rw.get('username').done(function(data) {
      console.log(data);
    });

    // Username can be an array or a string of names separated by columns
    rw.get('username1,username2');
    rw.get(['username1', 'username2']);

## Data structure

What you will get back in return is a keyed object by username of the
Github information for that username with a custom property called `objects`
which holds the supplementary objects.

    {
      organization_name: {
        ...,
        objects: {
          repos: [],
          gists: [],
          members: []
        }
      },
      user_name: {
        ...,
        objects: {
          repos: [],
          gists: []
        }
      }
    }

## Test

    npm install -g mocha
    mocha
