
//populates object from an array

function createEmployeeRecord(arr) {
  return {
    firstName: arr[0], 
    familyName: arr[1], 
    title: arr[2], 
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(arr) {
  return arr.map((a) => createEmployeeRecord(a))
}

function createTimeInEvent(emp, time) {
  const [date, hour] = time.split(" ")
  const timeObj = {
    type: "TimeIn",
    hour: parseInt(hour),
    date: date
  }
  emp.timeInEvents.push(timeObj)
  return emp
}

function createTimeOutEvent(emp, time) {
  const [date, hour] = time.split(" ")
  const timeObj = {
    type: "TimeOut",
    hour: parseInt(hour),
    date: date
  }
  emp.timeOutEvents.push(timeObj)
  return emp
}

function hoursWorkedOnDate(emp, date) {
  const timeIn = emp.timeInEvents.find(a => a.date == date)
  const timeOut = emp.timeOutEvents.find(a => a.date == date)
  return timeOut.hour / 100 - timeIn.hour / 100
}

function wagesEarnedOnDate(emp, date) {
  const hours = hoursWorkedOnDate(emp, date)
  return hours * emp.payPerHour
}

function allWagesFor(emp) {
  // build array of all dates of timeIn events
  const allDates = emp.timeInEvents.map(a => a.date)
  // pass every date into wages earned on date and accumulate total dollars
  return allDates.reduce((a, c) => a + wagesEarnedOnDate(emp, c), 0)
}

function calculatePayroll(arr) {
  return arr.reduce((a, c) => a + allWagesFor(c), 0)
}

function findEmployeeByFirstName(arr, name) {
  return arr.find(a => a.firstName == name)
}