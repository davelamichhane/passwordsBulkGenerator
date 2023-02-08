const adbs = require('ad-bs-converter');

// AD dates
const adCurrentDate = new Date().toISOString().split('T')[0].replaceAll('-','/') // eg: 2023/02/08
const adCurrentYear = adCurrentDate.substring(0,4) // eg: 2023
const adNewYear = new Date(adCurrentYear+'/01/01')// date object of 2023/01/01
const adNewYearMilliseconds = adNewYear.getTime() // eg: 1672516800000
const adNewYearDay = adNewYear.getDay() + 1 // new year 2023 was sunday therefore 1


// Bikram Sambat dates
const bsCurrentYear = adbs.ad2bs(adCurrentDate).en.year.toString() // eg: 2079
const bsNewYearObject = adbs.bs2ad(bsCurrentYear+'/01/01') // ad equivalent of 2079/10/01
const bsNewYear = new Date(`${bsNewYearObject.year}/${bsNewYearObject.month}/${bsNewYearObject.day}`) // date object of 2079/01/01 or 2022/04/14
const bsNewYearMilliseconds = bsNewYear.getTime() //eg: 1649880000000
const bsNewYearDay = bsNewYear.getDay() + 1 // new year 2079 was a thursday therefore 5

exports.datesObject = {adCurrentYear, adNewYearMilliseconds,adNewYearDay, bsCurrentYear,bsNewYearMilliseconds,bsNewYearDay}
