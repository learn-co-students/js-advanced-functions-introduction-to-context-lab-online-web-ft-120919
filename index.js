function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
};

function createEmployeeRecords(employee) {
    return employee.map(e => {
    return createEmployeeRecord(e)
    })
};

function createTimeInEvent(employeeRecord, dateTime) {
     employeeRecord.timeInEvents.push({
        type: "TimeIn",
        date: dateTime.split(" ")[0],
        hour: parseInt(dateTime.split(" ")[1])
    })
    return employeeRecord
};

function createTimeOutEvent(employeeRecord, dateTime) {
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        date: dateTime.split(" ")[0],
        hour: parseInt(dateTime.split(" ")[1])
    })
    return employeeRecord
};

function hoursWorkedOnDate(employeeRecord, date) {
    const start = employeeRecord.timeInEvents.find(timeInEvent => {
        return timeInEvent.date === date
    }).hour
    const end = employeeRecord.timeOutEvents.find(timeOutEvent => {
        return timeOutEvent.date === date
    }).hour

    return (end - start) / 100;
};

function wagesEarnedOnDate(employeeRecord, date) {
    return employeeRecord.payPerHour * hoursWorkedOnDate(employeeRecord, date)
};

function allWagesFor(employeeRecord) {
    return employeeRecord.timeInEvents.map(timeInEvent => {
        return wagesEarnedOnDate(employeeRecord, timeInEvent.date)
    }).reduce((acc, memo) => {
        return acc + memo 
    });
};

function calculatePayroll(employeeArray) {
    return employeeArray.map(employee => allWagesFor(employee)).reduce((acc, next) => {
        return acc + next
    })
};

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(src => {
        return src.firstName === firstName
    })
}