// Your code here
function createEmployeeRecord(employeeArray) {
    let employeeObject = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }

    return employeeObject
}

function createEmployeeRecords(employeesArray) {
    return employeesArray.map(createEmployeeRecord)
}

function createTimeInEvent(employeeObject, timestamp) {
    let timeInObject = {
        type: "TimeIn",
        date: timestamp.split(' ')[0],
        hour: parseInt(timestamp.split(' ')[1])
    }
    employeeObject.timeInEvents.push(timeInObject)
    return employeeObject
}

function createTimeOutEvent(employeeObject, timestamp) {
    let timeOutObject = {
        type: "TimeOut",
        date: timestamp.split(' ')[0],
        hour: parseInt(timestamp.split(' ')[1])
    }
    employeeObject.timeOutEvents.push(timeOutObject)
    return employeeObject
}

function hoursWorkedOnDate(employeeObject, date) {
    const timeStart = employeeObject.timeInEvents.find(timeIn => timeIn.date === date).hour
    const timeEnd = employeeObject.timeOutEvents.find(timeOut => timeOut.date === date).hour
    const hoursWorked = (timeEnd - timeStart) / 100
    return hoursWorked
}

function wagesEarnedOnDate(employeeObject, date) {
    const hoursWorked = hoursWorkedOnDate(employeeObject, date)
    const wagesEarned = hoursWorked * employeeObject.payPerHour
    return wagesEarned
}

function allWagesFor(employeeObject) {
    const dateArray = employeeObject.timeInEvents.map(timeIn => timeIn.date) 
    const totalWages = dateArray.reduce(function(total, currentDate) {
        return total + wagesEarnedOnDate(employeeObject, currentDate)
    }, 0)
    return totalWages
}

function calculatePayroll(employeesArray) {
    return employeesArray.reduce(function(total, currentEmployee) {
        return total + allWagesFor(currentEmployee)
    }, 0)
}

function findEmployeeByFirstName(employeesArray, firstNameString) {
    return employeesArray.find(employee => employee.firstName === firstNameString)
}