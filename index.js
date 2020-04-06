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

function createEmployeeRecords(arrayArrays) {
    return arrayArrays.map(array => {return createEmployeeRecord(array)})
}

function createTimeInEvent(employee, dateTime) {
    let date = dateTime.split(' ')[0]
    let time = parseInt(dateTime.split(' ')[1])
    employee.timeInEvents.push({type: 'TimeIn', date: date, hour: time})
    return employee
}

function createTimeOutEvent(employee, dateTime) {
    let date = dateTime.split(' ')[0]
    let time = parseInt(dateTime.split(' ')[1])
    employee.timeOutEvents.push({type: 'TimeOut', date: date, hour: time})
    return employee
}

function hoursWorkedOnDate(employee, date) {
    let clockIn = employee.timeInEvents.find(event => event.date === date)
    let clockOut = employee.timeOutEvents.find(event => event.date === date)
    return (clockOut.hour - clockIn.hour)/100
}

function wagesEarnedOnDate(employee, date) {
    let hours = hoursWorkedOnDate(employee, date)
    return hours * employee.payPerHour
}

function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, event) => {
        return total + wagesEarnedOnDate(employee, event.date)
    }, 0)
}

function calculatePayroll(employeeArray) {
    return employeeArray.reduce((total, employee) => {
        return total + allWagesFor(employee)
    }, 0)
}

function findEmployeeByFirstName(employeeArray, name) {
    return employeeArray.find(employee => employee.firstName === name)
}