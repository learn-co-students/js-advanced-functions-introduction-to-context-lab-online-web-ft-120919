// Your code here
function createEmployeeRecord(empInfo){
  return {
    firstName: empInfo[0],
    familyName: empInfo[1],
    title: empInfo[2],
    payPerHour: empInfo[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}//createEmployeeRecord 

function createEmployeeRecords(empRecords){
  return empRecords.map(record => createEmployeeRecord(record));
}//createEmployeeRecords 

function createTimeInEvent(empRecord, date){
  if (!!empRecord){
    empRecord.timeInEvents.push(
        {
          type: "TimeIn",
          hour: parseInt(date.slice(11)),
          date: date.slice(0,10)
        }
    );
  }
  return empRecord;
}//createTimeInEvent

function createTimeOutEvent(empRecord, date){
    if (!!empRecord){
        empRecord.timeOutEvents.push(
            {
              type: "TimeOut",
              hour: parseInt(date.slice(11)),
              date: date.slice(0,10)
            }
        );
    }
    return empRecord;
}//createTimeOutEvent

function hoursWorkedOnDate(empRecord, dateTime) {
  if(!!empRecord){
    const timeInMatch = empRecord.timeInEvents.find(e => e.date === dateTime);
    const timeOutMatch = empRecord.timeOutEvents.find(e => e.date === dateTime);
    const hoursWorked = (timeOutMatch.hour - timeInMatch.hour) / 100;
    return hoursWorked; 
  }
}//hoursWorkedOnDate

function wagesEarnedOnDate(empRecord, dateTime) {
  const hrs = hoursWorkedOnDate(empRecord, dateTime);
  const rate = empRecord.payPerHour;
  return hrs * rate;
}//wagesEarnedOnDate

function allWagesFor(empRecord) {
  let total = 0;
  for (let i = 0; i < empRecord.timeInEvents.length; i++){
    total += wagesEarnedOnDate(empRecord, empRecord.timeInEvents[i].date);
  }//for
  return total;
}//allWagesFor

function calculatePayroll(employees) {
  let grandTotal = 0.0;
  for (let i = 0; i < employees.length; i++){
    grandTotal += allWagesFor(employees[i]);
  }
  return grandTotal;
//   return employees.reduce(function(total,emp){
//       return allWagesFor(emp) + total
//   })
}//calculatePayroll 

function findEmployeeByFirstName(employees, firstName){
  return employees.find(employee => employee.firstName === firstName)
}//findEmployeeByFirstName