// window.onload or window.addEventListener() is to be executed after html file loaded
// browser onload event start
window.onload = () => {
  // call user table refresh function which is defined in current file
  // all records will be displayed from the beginning when the page loads and creating/updating/deleting records
  refreshUserTable();

  // create global user object
  // all data which is submitted will be saved into a single user object after validations are done
  user = new Object();

  // create global users object
  // something like user in business may be added newly in future
  // that's why all users included in an array
  users = [
    { id: 4, fullName: "Ravindu Sasanka", callingName: "Ravindu" },
    { id: 5, fullName: "Nadun Mahima", callingName: "Nadun" },
  ];

  // call fillDataIntoSelect which is defined in ../script/commonFunction.js
  fillDataIntoSelect(
    selectEmployee /* field */,
    "Select Employee's Name...!" /* message */,
    users /* datalist */,
    "fullName" /* property name given as string */
  );
};
// browser onload event end

// create function table refresh
// make all records to be displayed from the beginning when the page loads and creating/updating/deleting records
// called within current file
const refreshUserTable = () => {
  // when saving and retrieving record into/ from database, the transaction is done through an object of particular class
  // that's why details of particular user are stored in an object
  users = [];

  $.ajax("/user/findall", {
    type: "GET", // type = request method --> "GET", "POST", "PUT", "DELETE"
    contentType: "application/json", // data transfer format ("application/json" or "json")
    async: false, // true nm response eka enakm balan inne na. code eka continue wenawa. false nm response eka enakm balan innawa. code eka continue wenne na.

    success: function (successResponseData) {
      console.log("Success " , successResponseData);
      users = successResponseData;
    },

    error: function (failResponseData) {
      console.log("Fail " , failResponseData);
      users = [];
    }
  });

  // set dataType as "text" for these types of data that is found in elements in users array --> string, number, date
  // set dataType as "function" for these types of data that is found in elements in users array --> object, array, boolean
  const displayPropertyList = [
    { dataType: "function", propertyName: getFullName },
    { dataType: "text", propertyName: "username" },
    { dataType: "text", propertyName: "email" },
    { dataType: "function", propertyName: getRoleName },
    { dataType: "function", propertyName: getUserStatus },
  ];

  // call fillDataIntoTable function
  // defined in ../script/tableCommonFunction.js
  fillDataIntoTable(
    tableUser,
    users,
    displayPropertyList,
    userFormRefill,
    deleteUser,
    printUser
  );
};

// create function to get employee full name
// called from ../script/tableCommonFunction.js
const getFullName = (ob) => {
  return ob.employee_id.fullname;
};

// create function to get employee's role
// called from ../script/tableCommonFunction.js
const getRoleName = (ob) => {
  return "Role";
};

// create function to get style of the button in status column
// called from ../script/tableCommonFunction.js
const getUserStatus = (ob) => {
  if (ob.status) {
    return (
      '<p style="border-radius: 10px;" class="border border-success text-success p-1 text-center fw-bold my-auto">' +
      "Active" +
      "</p>"
    );
  } else {
    return (
      '<p style="border-radius: 10px;" class="border border-danger text-danger p-1 text-center fw-bold my-auto">' +
      "In-Active" +
      "</p>"
    );
  }
};

// create function for refill user form
// called from ../script/tableCommonFunction.js
const userFormRefill = (ob, rowIndex) => {
  // get user confirmation
  const userConfirm = confirm(
    "Are you sure to edit following employee..? \n" +
      "\n Full Name is :" +
      ob.employee_id.fullname +
      "\n Status is : " +
      ob.status +
      "\n Email is : " +
      ob.email
  );

  if (userConfirm) {
    // call edit services
    const editServerResponse = "OK";
    if (editServerResponse == "OK") {
      alert("Edit Successfully");
      refreshUserTable();
    } else {
      alert(
        "Edit not completed, you have following error\n" + editServerResponse
      );
    }
  } else {
    alert("You cancelled edit of " + ob.employee_id.fullname);
    refreshUserTable();
  }
};

// create function for delete user record
// called from ../script/tableCommonFunction.js
const deleteUser = (ob, rowIndex) => {
  // get user confirmation
  const userConfirm = confirm(
    "Are you sure to delete following employee..? \n" +
      "\n Full Name is :" +
      ob.employee_id.fullname +
      "\n Status is : " +
      ob.status +
      "\n Email is : " +
      ob.email
  );

  if (userConfirm) {
    // call delete services
    const deleteServerResponse = "OK";
    if (deleteServerResponse == "OK") {
      alert("Delete Successfully");
      refreshUserTable();
    } else {
      alert(
        "Delete not completed, you have following error\n" +
          deleteServerResponse
      );
    }
  } else {
    alert("You cancelled deletion of " + ob.employee_id.fullname);
    refreshUserTable();
  }
};

// create function for print user record
// called from ../script/tableCommonFunction.js
const printUser = (ob, rowIndex) => {
  // get user confirmation
  const userConfirm = confirm(
    "Are you sure to print following employee..? \n" +
      "\n Full Name is :" +
      ob.employee_id.fullname +
      "\n Status is : " +
      ob.status +
      "\n Email is : " +
      ob.email
  );

  if (userConfirm) {
    // call print services
    const printServerResponse = "OK";
    if (printServerResponse == "OK") {
      alert("Print Successfully");
      refreshUserTable();
    } else {
      alert(
        "Print not completed, you have following error\n" + printServerResponse
      );
    }
  } else {
    alert("You cancelled print of " + ob.employee_id.fullname);
    refreshUserTable();
  }
};

// define function to submit user
// called from ../../templates/user.html
function submitUser() {
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

  // define function to check form error
// called from within current file
// return error when user submits, not entering data
  const checkFormError = () => {
    let errors = "";
    if (user.employee_id == null) {
        selectEmployee.classList.add("is-invalid");
      errors = errors + "Please Select Full Name...! \n";
    }
    if (user.username == null) {
        textUsername.classList.add("is-invalid");
      errors = errors + "Please Enter Valid Username...! \n";
    }
    if (user.password == null) {
        textPassword.classList.add("is-invalid");
      errors = errors + "Please Enter Valid Password...! \n";
    }
    if (user.re_password == null) {
        textRePassword.classList.add("is-invalid");
      errors = errors + "Please Enter Password Again...! \n";
    }
    return errors;
  };

  // define function for validate re-entered password
// called from ../../templates/user.html
  const textRePasswordValidator = (field) => {
    if(field.value == user.password) {
        field.classList.remove("is-invalid");
        field.classList.add("is-valid");
        user.re_password = field.value;
    } else {
        field.classList.remove("is-valid");
    field.classList.add("is-invalid");
    user.re_password = null;
    }
  }