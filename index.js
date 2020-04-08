// Your code here

function createEmployeeRecord(empArray) {
  return {
    firstName: empArray[0],
    familyName: empArray[1],
    title: empArray[2],
    payPerHour: empArray[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(arrayOfEmpArrays) {
  return arrayOfEmpArrays.map(empArray => {
    return {
      firstName: empArray[0],
      familyName: empArray[1],
      title: empArray[2],
      payPerHour: empArray[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  })
}

function createTimeInEvent(record, dateStamp) {
  record.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt((dateStamp.split(" ")[1]), 10),
    date: dateStamp.split(" ")[0]
  })
  return record
}

function createTimeOutEvent(record, dateStamp) {
  record.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt((dateStamp.split(" ")[1]), 10),
    date: dateStamp.split(" ")[0]
  })
  return record
}

function hoursWorkedOnDate(record, date) {
  let timeIn = record.timeInEvents.map(day => {
    if (day.date === date) {
      return day.hour
    }
  }).filter((d) => !!d)
  let timeOut = record.timeOutEvents.map(day => {
    if (day.date === date) {
      return day.hour
    }
  }).filter((d) => !!d)
  return (timeOut[0] - timeIn[0]) / 100
}

function wagesEarnedOnDate(record, date) {
  return hoursWorkedOnDate(record, date) * record.payPerHour
}

function allWagesFor(record) {
  let wages = record.timeInEvents.map(day => (
    wagesEarnedOnDate(record, day.date)
  ))
  return wages.reduce((startAmount, currentAmount) => {
    return startAmount + currentAmount
  }, 0)
}

function findEmployeeByFirstName(srcArray, firstName) {
  let foundEmp = srcArray.map(emp => {
    if (emp.firstName === firstName) {
      return emp
    }
  })
  return foundEmp[0]
}

function calculatePayroll(records) {
  let recordsAmounts = records.map(record => (
    allWagesFor(record)
  ))
  return recordsAmounts.reduce((startAmount, currentAmount) => {
    return startAmount + currentAmount
  }, 0)
}