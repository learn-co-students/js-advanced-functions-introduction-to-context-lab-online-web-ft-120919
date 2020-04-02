function createEmployeeRecord(arr){
    const [firstName, familyName, title, payPerHour] = arr
    return {firstName: firstName,
            familyName: familyName,
            title: title,
            payPerHour: payPerHour,
            timeInEvents: [],
            timeOutEvents: []
    }
}

function createEmployeeRecords(arrOfArrays) {
    return arrOfArrays.map(arr => createEmployeeRecord(arr))
}

function createTimeInEvent(employeeRecordObject, timestmp) {
    const [date, time] = timestmp.split(' ')
    employeeRecordObject.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(time),
        date: date
    })
    return employeeRecordObject
}

function createTimeOutEvent(employeeRecordObject, timestmp) {
    const [date, time] = timestmp.split(' ')
    employeeRecordObject.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(time),
        date: date
    })
    return employeeRecordObject
}

function hoursWorkedOnDate(employeeRecordObject, datestmp) {
    const arrDateIn = employeeRecordObject.timeInEvents.filter( obj => obj.date === datestmp) 
    // this give array [{type:, hour:, date:, {}}]
    const arrDateOut = employeeRecordObject.timeOutEvents.filter( obj => obj.date === datestmp)
    return (arrDateOut[0].hour - arrDateIn[0].hour)/100
}

function wagesEarnedOnDate(employeeRecordObject, datestmp) {
    const hours = hoursWorkedOnDate(employeeRecordObject, datestmp)
    return hours * employeeRecordObject.payPerHour
}

function allWagesFor(employeeRecordObject) {
    // need dates for func to calc hours and wages
    const datesWorked = employeeRecordObject.timeInEvents.map( obj => obj.date)
    const arrSum = datesWorked.map( dates => wagesEarnedOnDate(employeeRecordObject, dates))
    // return arrSum.reduce((a,b) => a + b)      
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return arrSum.reduce(reducer)
}

function calculatePayroll(arrEmployeeRecords) {
    // return arrEmployeeRecords.reduce( )
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const arrSum = arrEmployeeRecords.map( record => allWagesFor(record)) 
    return arrSum.reduce(reducer)
}

function findEmployeeByFirstName(arrEmployeeRecords, firstName) {
    return arrEmployeeRecords.find(record => record.firstName === firstName)
}

// array1.map(x => x * 2);
// "YYYY-MM-DD HHMM"
// const [title, firstName, lastName] = 'Sir Woody BarksALot'.split(' ')

