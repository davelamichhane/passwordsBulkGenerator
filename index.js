#!/bin/node

const fs = require('fs');
require('dotenv').config()
const sha = require('./sha.js').sha
const {
  adCurrentYear,
  adNewYearMilliseconds,
  adNewYearDay,
  bsCurrentYear,
  bsNewYearMilliseconds,
  bsNewYearDay
} = require('./dates.js').datesObject

// secret keys (you should also remember these!)
const secretKey1 = process.env.SECRET_KEY_1;
const secretKey2 = process.env.SECRET_KEY_2;
const secretKey3 = process.env.SECRET_KEY_3;

// File Path
const inputFile = process.argv[2]

fs.readFile(inputFile, 'utf-8', (err, data) => {
  if (err) {
    console.log(err)
  } else {
    const lines = data.split('\n').filter(Boolean)
    const newArr = []
    lines.forEach(line => {
      // extract info
      const [, username, service, length, password] = line.split(/\s+/g)

      // create new password
      const str = username + service + bsCurrentYear + adCurrentYear + secretKey1 + secretKey2 + secretKey3;
      const mostRecentNewYearDay = adNewYearMilliseconds > bsNewYearMilliseconds ? adNewYearDay : bsNewYearDay; 
      const newPassword = sha(str, mostRecentNewYearDay).substring(0,parseInt(length))
      newArr.push(line.replace(password, newPassword))
    })

    //

    const newData = newArr.join('\n')
    fs.writeFile(`listFor${adCurrentYear}${bsCurrentYear}`, newData, err => {
      if (err) {
        console.log(err)
      } else {
        console.log('new file created successfully')
      }
    })
  }
})

