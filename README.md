# Github Collect

A NodeJS library for getting Github objects like
repositories, members, gists for users and orgs.

## Install

    npm install repo-watch

## Use

    var rw = require('repo-watch');
    rw.get('username', function(objects) {
      console.log(objects);
    });

## Test

    npm install -g mocha
    mocha
