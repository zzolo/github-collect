# Github Collect

A NodeJS library for getting Github objects like
repositories, members, gists for users and orgs.

## Install

    npm install github-collect

## Configuration

Configuration is handled by [rc](https://github.com/dominictarr/rc) so any of 
those valid ways of definingconfiguration will work.

* `github_token`: Your Oauth token for Github; you can create one on your Github
account under Settings ->  Applications.
Example of using an environment variable:
`export github_collect_github_token=abc`

## Use

    var gc = require('github-collect');

    // Get returns a promise
    gc.get('username').done(function(data) {
      console.log(data);
    });

    // Username can be an array or a string of names separated by columns
    gc.get('username1,username2');
    gc.get(['username1', 'username2']);


Provides promises with [q](https://github.com/kriskowal/q).

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
