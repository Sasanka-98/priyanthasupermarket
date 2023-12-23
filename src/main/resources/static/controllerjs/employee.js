// window.onload or window.addEventListener() is to be executed after html file loaded
// browser onload event start
window.addEventListener("load", () => {
  // call employee table refresh function which is defined in current file
  // all records will be displayed from the beginning when the page loads and creating/updating/deleting records
  refreshEmployeeTable();

  // create employee object

  // method 1
  // employee = {};

  // method 2
  // create global employee object
  // all data which is submitted will be saved into a single employee object after validations are done
  employee = new Object();

  // create global designation object
  // something like designation in business may be added newly in future
  // that's why all designations included in an array
  designations = [
    { id: 1, name: "Manager" },
    { id: 2, name: "Cashier" },
    { id: 3, name: "As-Manager" },
  ];

  //filling data into selectDesignation select tag
  // method 1
  /* selectDesignation.innerHTML = "";
  const optionMsg = document.createElement("option");
  optionMsg.selected = "selected";
  optionMsg.disabled = "disabled";
  optionMsg.innerText = "Select Designation...!";
  selectDesignation.appendChild(optionMsg);
  designations.forEach((element) => {
    const option = document.createElement("option");
    option.value = JSON.stringify(element);
    option.innerText = element.name;
    selectDesignation.appendChild(option);
  }); */

  // method 2
  // call fillDataIntoSelect which is defined in ../script/commonFunction.js
  fillDataIntoSelect(
    selectDesignation /* field */,
    "Select Designation...!" /* message */,
    designations /* datalist */,
    "name" /* property name given as string */
  );

  // create global employeeStatuses object
  // something like employee status in business may be changed in future
  // that's why all employee statuses included in an array
  employeeStatuses = [
    { id: 1, name: "Working" },
    { id: 2, name: "Resign" },
    { id: 3, name: "Deleted" },
  ];

  selectEmployeestatus.innerHTML = ""; // remove all children in selectEmployeestatus select tag
  const optionStatusMsg = document.createElement("option");
  optionStatusMsg.selected = "selected";
  optionStatusMsg.disabled = "disabled";
  optionStatusMsg.innerText = "Select Designation...!"; // set visible text on optionStatusMsg option element
  selectEmployeestatus.appendChild(optionStatusMsg);

  // loop for each and every element in employeeStatuses array
  employeeStatuses.forEach((element) => {
    const option = document.createElement("option");
    option.value = JSON.stringify(element); // javascript object convert into json string
    option.innerText = element.name;
    selectEmployeestatus.appendChild(option);
  });
});
// browser onload event end

// create function table refresh
// make all records to be displayed from the beginning when the page loads and creating/updating/deleting records
// called within current file
const refreshEmployeeTable = () => {
  // when saving and retrieving record into/ from database, the transaction is done through an object of particular class
  // that's why details of particular employee are stored in an object
  employees = [];

  // call jquery ajax function
  // $.ajax(URL, {option})
  $.ajax("/employee/findall", {
    type: "GET", // type = request method --> "GET", "POST", "PUT", "DELETE"
    contentType: "application/json", // data transfer format ("application/json" or "json")
    async: false, // true nm response eka enakm balan inne na. code eka continue wenawa. false nm response eka enakm balan innawa. code eka continue wenne na.

    success: function (successResponseData) {
      console.log("Success " , successResponseData);
      employees = successResponseData;
    },

    error: function (failResponseData) {
      console.log("Fail " , failResponseData);
      employees = [];
    }
  });

  // set dataType as "text" for these types of data that is found in elements in employees array --> string, number, date
  // set dataType as "function" for these types of data that is found in elements in employees array --> object, array, boolean
  const displayPropertyList = [
    { dataType: "text", propertyName: "fullname" }, // column fullname
    { dataType: "text", propertyName: "nic" }, // column nic
    { dataType: "function", propertyName: getHasUserAccount },
    { dataType: "text", propertyName: "mobile" },
    { dataType: "function", propertyName: getDesignation },
    { dataType: "function", propertyName: getEmployeeStatus },
  ];

  // call fillDataIntoTable function
  // defined in ../script/tableCommonFunction.js
  // (tableId, datalist, displayPropertyList, editFunctionName, deleteFunctionName, printFunctionName)
  fillDataIntoTable(
    tableEmployee,
    employees,
    displayPropertyList,
    employeeFormRefill,
    deleteEmployee,
    printEmployee, true
  );

  // call fillDataIntoTable2 function
  // defined in ../script/tableCommonFunction.js
  // (tableId, datalist, displayPropertyList, editFunctionName, deleteFunctionName, printFunctionName, buttonVisibility)
  // fillDataIntoTable2(
  //   tableEmployee,
  //   employees,
  //   displayPropertyList,
  //   employeeFormRefill,
  //   deleteEmployee,
  //   printEmployee, true
  // );

  // call fillDataIntoTable3 function
  // defined in ../script/tableCommonFunction.js
  // fillDataIntoTable3(
  //   tableEmployee,
  //   employees,
  //   displayPropertyList,
  //   employeeFormRefill,
  //   deleteEmployee,
  //   printEmployee,
  //   true
  // );

  // call fillDataIntoTable4 function
  // defined in ../script/tableCommonFunction.js
  // fillDataIntoTable4(
  //   tableEmployee,
  //   employees,
  //   displayPropertyList,
  //   employeeFormRefill,
  //   deleteEmployee,
  //   printEmployee,
  //   true
  // );

  // not to display edit/delete/print buttons area above table
};

// create function to get style of the button in status column
// called from ../script/tableCommonFunction.js
const getEmployeeStatus = (ob) => {
  // return 'SS';
  //   return ob.employeeStatus_id.name;
  if (ob.employeestatus_id.name == "Working") {
    return (
      '<p style="border-radius: 10px;" class="border border-success text-success p-1 text-center fw-bold my-auto">' +
      ob.employeestatus_id.name +
      "</p>"
    );
  } else if (ob.employeestatus_id.name == "Resign") {
    return (
      '<p style="border-radius: 10px;" class="border border-warning text-warning p-1 text-center fw-bold my-auto">' +
      ob.employeestatus_id.name +
      "</p>"
    );
  } else if (ob.employeestatus_id.name == "Deleted") {
    return (
      '<p style="border-radius: 10px;" class="border border-danger text-danger p-1 text-center fw-bold my-auto">' +
      ob.employeestatus_id.name +
      "</p>"
    );
  }
};

// create function to get designation
// called from ../script/tableCommonFunction.js
const getDesignation = (ob) => {
  return ob.designation_id.name;
};

// create function to get style of icon according to if user has an account
// called from ../script/tableCommonFunction.js
const getHasUserAccount = (ob) => {
  // return ob.hasUserAccount;
  if (ob.hasUserAccount) {
    // return 'Has User Account';
    return '<i class="fa-regular fa-circle-check fa-2x text-success"></i>';
  } else {
    // return 'Has not user Account';
    return '<i class="fa-regular fa-circle-xmark fa-2x text-danger"></i>';
  }
};

// create function for refill employee form
// called from ../../templates/employee-1.html, ../script/tableCommonFunction.js
const employeeFormRefill = (ob, rowIndex) => {
  // get user confirmation
  const userConfirm = confirm(
    "Are you sure to edit following employee..? \n" +
      "\n Full Name is :" +
      ob.fullname +
      "\n Status is : " +
      ob.employeestatus_id.name +
      "\n Nic is : " +
      ob.nic
  );

  if (userConfirm) {
    // call edit services
    const editServerResponse = "OK";
    if (editServerResponse == "OK") {
      alert("Edit Successfully");
      refreshEmployeeTable();
      divModify.setAttribute(
        "class",
        "d-none"
      ); /* disappear edit/delete/print buttons area above table after editing the record */
    } else {
      alert(
        "Edit not completed, you have following error\n" + editServerResponse
      );
    }
  } else {
    alert("You cancelled edit of " + ob.fullname);
    refreshEmployeeTable();
    divModify.setAttribute(
      "class",
      "d-none"
    ); /* disappear edit/delete/print buttons area above table after editing the record is cancelled */
  }
};

// create function for delete employee record
// called from ../../templates/employee-1.html, ../script/tableCommonFunction.js
const deleteEmployee = (ob, rowIndex) => {
  // get user confirmation
  const userConfirm = confirm(
    "Are you sure to delete following employee..? \n" +
      "\n Full Name is :" +
      ob.fullname +
      "\n Status is : " +
      ob.employeestatus_id.name +
      "\n Nic is : " +
      ob.nic
  );

  if (userConfirm) {
    // call delete services
    const deleteServerResponse = "OK";
    if (deleteServerResponse == "OK") {
      alert("Delete Successfully");
      refreshEmployeeTable();
      divModify.setAttribute(
        "class",
        "d-none"
      ); /* disappear edit/delete/print buttons area above table after deleting the record */
    } else {
      alert(
        "Delete not completed, you have following error\n" +
          deleteServerResponse
      );
    }
  } else {
    alert("You cancelled deletion of " + ob.fullname);
    refreshEmployeeTable();
    divModify.setAttribute(
      "class",
      "d-none"
    ); /* disappear edit/delete/print buttons area above table after deleting the record is cancelled */
  }
};

// create function for print employee record
// called from ../../templates/employee-1.html, ../script/tableCommonFunction.js
const printEmployee = (ob, rowIndex) => {
  // get user confirmation
  const userConfirm = confirm(
    "Are you sure to print following employee..? \n" +
      "\n Full Name is :" +
      ob.fullname +
      "\n Status is : " +
      ob.employeestatus_id.name +
      "\n Nic is : " +
      ob.nic
  );

  if (userConfirm) {
    // call print services
    const printServerResponse = "OK";
    if (printServerResponse == "OK") {
      alert("Print Successfully");
      refreshEmployeeTable();
      divModify.setAttribute(
        "class",
        "d-none"
      ); /* disappear edit/delete/print buttons area above table after printing the record */
    } else {
      alert(
        "Print not completed, you have following error\n" + printServerResponse
      );
    }
  } else {
    alert("You cancelled print of " + ob.fullname);
    refreshEmployeeTable();
    divModify.setAttribute(
      "class",
      "d-none"
    ); /* disappear edit/delete/print buttons area above table after printing the record is cancelled */
  }
};

// define function to check form error
// called from within current file
// return error when user submits, not entering data
const checkFormError = () => {
  let errors = "";
  if (employee.fullName == null) {
    textFullName.classList.add("is-invalid");
    errors = errors + "Please Enter Valid Full Name...! \n";
  }
  if (employee.callingName == null) {
    textCallingName.classList.add("is-invalid");
    errors = errors + "Please Enter Valid Calling Name...! \n";
  }
  if (employee.employeestatus == null) {
    selectEmployeestatus.classList.add("is-invalid");
    errors = errors + "Select Status...! \n";
  }
  return errors;
};

// define function to submit employee
// called from ../../templates/employee-1.html
function submitEmployee() {
  // console.log("Submit");
  // console.log(employee);

  // need to check error
  const errors = checkFormError(); // defined within current file
  if (errors == "") {
    // need to get user confirmation
  } else {
    // alert('Form has following error \n' + errors);
  }
}

// define function for full name validator and generate calling name list
// called from ../../templates/employee-1.html
function inputNameValidator(field, pattern) {
  const regex = new RegExp(pattern);
  if (regex.test(field.value)) {
    // both is-invalid and is-valid classes should not be there at the same time
    // one must be removed so that style to be applied
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");

    employee.fullName = field.value; // binding

    // generate calling name list using parts of full name
    fullNameParts = field.value.split(" ");
    dlNameParts.innerHTML = ""; // remove initial children of dlNameParts select tag

    fullNameParts.forEach((element) => {
      const fullNamePartOption = document.createElement("option");
      fullNamePartOption.value = element;
      dlNameParts.appendChild(fullNamePartOption);
    });
  } else {
    field.classList.remove("is-valid");
    field.classList.add("is-invalid");
    // fullNameParts = field.value.split(" ");
    employee.fullName = null;
  }
  /* in the case of someone enter calling name first then enter full name */
  // if (textCallingName.value != "") {
  //   textCallingNameValidator(textCallingName);
  // }
}

// define function for validate calling name
// called from ../../templates/employee-1.html
const textCallingNameValidator = (field) => {
  const fieldValue = field.value;

  // return the index of calling name which is entered
  // if it is not found -1 will be return
  const extIndex = fullNameParts.map((element) => element).indexOf(fieldValue);
  if (extIndex != -1) {
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
    employee.callingName = field.value;
  } else {
    field.classList.remove("is-valid");
    field.classList.add("is-invalid");
    employee.callingName = null;
  }
};
