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
    const arr = JSON.parse(data)
    arr.forEach(obj => {
      if(obj.update === true){
      const { username, service, length } = obj

      // create new password
      const str = username + service + bsCurrentYear + adCurrentYear + secretKey1 + secretKey2 + secretKey3;
      const mostRecentNewYearDay = adNewYearMilliseconds > bsNewYearMilliseconds ? adNewYearDay : bsNewYearDay;
      const newPassword = sha(str, mostRecentNewYearDay).substring(0, parseInt(length))

      // replace the old password with the new one
      obj.password = newPassword.slice(0,length+1)
      }
    })

    fs.writeFile(`listFor${adCurrentYear}${bsCurrentYear}.json`, JSON.stringify(arr, null, 2), err => {
      if (err) {
        console.log(err)
      } else {
        console.log('new file created successfully')
      }
    })
  }
})

