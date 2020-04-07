// Your code here
function createEmployeeRecord(employee_array) {
	let employee = {
		familyName: employee_array[1],
		firstName: employee_array[0],
		title: employee_array[2],
		payPerHour: employee_array[3],
		timeInEvents: [],
		timeOutEvents: [],
	};
	return employee;
}

function createEmployeeRecords(arrays) {
	return arrays.map(createEmployeeRecord);
}
function createTimeInEvent(employee_record, time) {
	employee_record.timeInEvents.push({
		type: "TimeIn",
		hour: parseInt(time.split(" ")[1]),
		date: time.split(" ")[0],
	});
	return employee_record;
}
function createTimeOutEvent(employee_record, time) {
	employee_record.timeOutEvents.push({
		type: "TimeOut",
		hour: parseInt(time.split(" ")[1]),
		date: time.split(" ")[0],
	});
	return employee_record;
}

function hoursWorkedOnDate(employee, date) {
	let inEvent =
		employee.timeInEvents.find((event) => {
			return event.date === date;
		}).hour / 100;
	let outEvent =
		employee.timeOutEvents.find((event) => {
			return event.date === date;
		}).hour / 100;
	return outEvent - inEvent;
}

function wagesEarnedOnDate(employee, date) {
	return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}
function allWagesFor(employee) {
	return employee.timeInEvents
		.map((event) => {
			return hoursWorkedOnDate(employee, event.date) * employee.payPerHour;
		})
		.reduce((sum, hour) => {
			return sum + hour;
		}, 0);
}

function findEmployeeByFirstName(employees, name) {
	return employees.find((employee) => employee.firstName === name);
}

function calculatePayroll(employees) {
	return employees
		.map((e) => {
			return allWagesFor(e);
		})
		.reduce((sum, current) => {
			return sum + current;
		});
}
