function createEmployeeRecord(args) {
  return {
    firstName: args[0],
    familyName: args[1],
    title: args[2],
    payPerHour: args[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map(employeeInfo => createEmployeeRecord(employeeInfo))
}

function createTimeInEvent(employeeObject, dateTimeString) {
  employeeObject.timeInEvents.push({
    type: 'TimeIn',
    date: dateTimeString.split(' ')[0],
    hour: parseInt(dateTimeString.split(' ')[1].slice(0,4))
  })
  return employeeObject
}

function createTimeOutEvent(employeeObject, dateTimeString) {
  employeeObject.timeOutEvents.push({
    type: 'TimeOut',
    date: dateTimeString.split(' ')[0],
    hour: parseInt(dateTimeString.split(' ')[1].slice(0,4))
  })
  return employeeObject
}

function hoursWorkedOnDate(employeeObject, dateString) {
  const timeInEvent = employeeObject.timeInEvents.find(obj => obj.date === dateString)
  const timeOutEvent = employeeObject.timeOutEvents.find(obj => obj.date === dateString)

  const timeIn = parseInt(timeInEvent.hour)
  const timeOut = parseInt(timeOutEvent.hour)

  return (timeOut-timeIn)/100
}

function wagesEarnedOnDate(employeeObject, dateString) {
  return hoursWorkedOnDate(employeeObject, dateString)*employeeObject.payPerHour
}

function allWagesFor(employeeObject) {
  const dates = employeeObject.timeInEvents.map((event) => {
    return event.date
  })

  return dates.reduce((acc, date) => {
    return wagesEarnedOnDate(employeeObject, date) + acc
  }, 0)
}

function findEmployeeByFirstName(employees, name) {
  return employees.find((employee) => {
    return employee.firstName === name
  })
}

function calculatePayroll(employeeArray) {
  return employeeArray.reduce((acc, employee) => {
    // const acc = initial ? allWagesFor(initial) : undefined
    return allWagesFor(employee) + acc
  }, 0)
}
