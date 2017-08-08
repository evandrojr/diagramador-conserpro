#!/usr/bin/env node

const validator = require('html-validator')
const fs = require('fs')
var options = {
  format: 'text'
}

fs.readFile( 'index.html', 'utf8', (err, html) => {
  if (err) {
    throw err;
  }

  options.data = html

  validator(options)
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.error(error)
    })
})