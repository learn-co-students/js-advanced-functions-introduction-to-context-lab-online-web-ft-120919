// Your code here
function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

let createEmployeeRecords = function(employeeData) {
  return employeeData.map(function(row) {
    return createEmployeeRecord(row)
  })
}

let createTimeInEvent = function(employee, timeStamp) {
  let [date, hour] = timeStamp.split(" ")

  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
  })
  return employee
}

let createTimeOutEvent = function(employee, timeStamp) {
  let [date, hour] = timeStamp.split(' ')

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
  })
  return employee
}

let hoursWorkedOnDate = function(employee, searchDate) {
  let timeIn = employee.timeInEvents.find((day) => day.date === searchDate)
  let timeOut = employee.timeOutEvents.find((day) => day.date === searchDate)

  let timeWorked = (timeOut.hour - timeIn.hour) / 100

  return timeWorked

}

let wagesEarnedOnDate = function(employee, searchDate) {
  let hoursWorked = hoursWorkedOnDate(employee, searchDate)
  let wages = hoursWorked * employee.payPerHour
  return wages
}

// let allWagesFor = function(employee) {
//   let datesWorked = employee.timeOutEvents.map((e) => e.date)
//   let totalWages = datesWorked.reduce((payments, date) => payments + wagesEarnedOnDate(employee, date), 0)
//   return totalWages
// }

let allWagesFor = function(employee) {
  let datesWorked = employee.timeInEvents.map(function(e) {
    return e.date
  })
  let totalWages = datesWorked.reduce(function(memo, d) {
    return memo + wagesEarnedOnDate(employee, d)
  }, 0)
  return totalWages
}

let findEmployeeByFirstName = function(empArray, firstName) {
  return empArray.find(function(record){
    return record.firstName === firstName
  })
}

let calculatePayroll = function(employeesArray) {
  return employeesArray.reduce(function(total, record) {
    return total + allWagesFor(record)
  }, 0)
}

