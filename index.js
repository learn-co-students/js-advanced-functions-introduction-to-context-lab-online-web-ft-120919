// Your code here

function createEmployeeRecords(employeeData){
    return employeeData.map(createEmployeeRecord)
}

function createEmployeeRecord([firstName, familyName, title, payRate]){
    return {
        "firstName": firstName,
        "familyName": familyName,
        "title": title,
        "payPerHour": payRate,
        "timeInEvents": [],
        "timeOutEvents": []
    }
}

function createTimeInEvent(record, date){
    let timeInEvent = {
        type: "TimeIn",
        hour: parseInt(date.split(" ")[1]),
        date: date.split(" ")[0]
    }
    record.timeInEvents.push(timeInEvent)
    return record;
}

function createTimeOutEvent(record, date){
    let timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(date.split(" ")[1]),
        date: date.split(" ")[0]
    }
    record.timeOutEvents.push(timeOutEvent)
    return record;
}

function wagesEarnedOnDate(record, date){
    let hoursWorked = hoursWorkedOnDate(record, date);
    let payOwed = hoursWorked * record.payPerHour;
    return payOwed;
}

function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    const wagesOnDatesWorked = datesWorked.map(date => wagesEarnedOnDate(employeeRecord, date));
    const totalWages = wagesOnDatesWorked.reduce(((total, earning) => total + earning), 0);
    return totalWages;
}


function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    return hoursWorked;
}

function findEmployeeByFirstName(employeeRecords, firstName) {
return employeeRecords.find(record => record.firstName === firstName);
}

const parseTimestampHour = (timestamp) => parseInt(timestamp.slice(-4));
const parseTimestampDate = (timestamp) => timestamp.slice(0, -5);

function calculatePayroll(employeeRecords) {
    const totalPay = employeeRecords.reduce(((total, record) => total + allWagesFor(record)), 0);
    return totalPay;
  } 