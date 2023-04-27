// Your code here
function createEmployeeRecord(array){
    const employeeObj = {firstName: array[0],
        familyName : array[1],
        title : array [2],
        payPerHour : array[3],
        timeInEvents : [],
        timeOutEvents : [],
    }
    return employeeObj;
}

function createEmployeeRecords(arrayOfArray){
    let employeesArray = [];
    arrayOfArray.forEach((array)=> {
        //console.log(array);
        employeesArray.push(createEmployeeRecord(array));
    });
    return employeesArray;
}

function createTimeInEvent(employee, date){
    const timeStamp = date.split(' ');
    const timeInObj = { type : "TimeIn", hour : parseInt(timeStamp[1]), date : timeStamp [0],};
    employee.timeInEvents.push(timeInObj);
    return employee;
}

function createTimeOutEvent(employee, date){
    const timeStamp = date.split(' ');
    const timeOutObj = { type : "TimeOut", hour : parseInt(timeStamp[1]), date : timeStamp [0],};
    employee.timeOutEvents.push(timeOutObj);
    return employee;
}

function hoursWorkedOnDate(employee, date){
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour-timeIn.hour)/100
}

function wagesEarnedOnDate(employee, date){
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee){
    const allWages = employee.timeInEvents.map(event=> wagesEarnedOnDate(employee, event.date))
    return allWages.reduce(function(total, wage){return wage + total})
}

function calculatePayroll(employeeArray){
    let totalEmployeeWages = 0;
    employeeArray.forEach(function(employee){
        totalEmployeeWages += allWagesFor(employee)
    })
    return totalEmployeeWages
}
