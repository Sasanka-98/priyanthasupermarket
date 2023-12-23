// window.onload or window.addEventListener() is to be executed after html file loaded
// browser onload event start
window.onload = () => {
  // call privilege table refresh function which is defined in current file
  // all records will be displayed from the beginning when the page loads and creating/updating/deleting records
  refreshPrivilegeTable();

  // create global privilege object
  // all data which is submitted will be saved into a single privilege object after validations are done
  privilege = new Object();

  // create global roles object
  // something like role in business may be added newly in future
  // that's why all roles included in an array
  roles = [
    { id: 1, name: "Manager" },
    { id: 2, name: "Cashier" },
    { id: 3, name: "Store Manager" },
  ];

  // create global modules object
  // something like module in business may be changed in future
  // that's why all modules included in an array
  modules = [
    { id: 1, name: "Employee" },
    { id: 2, name: "Privilege" },
  ];

  // call fillDataIntoSelect which is defined in ../script/commonFunction.js
  fillDataIntoSelect(selectRole, "Select Role...!", roles, "name");
  fillDataIntoSelect(selectModule, "Select Module...!", modules, "name");
};
// browser onload event end

// create function table refresh
// make all records to be displayed from the beginning when the page loads and creating/updating/deleting records
// called within current file
const refreshPrivilegeTable = function () {
    // when saving and retrieving record into/ from database, the transaction is done through an object of particular class
  // that's why details of particular privilege are stored in an object
  privileges = [];

  $.ajax("/privilege/findall", {
    type: "GET", // type = request method --> "GET", "POST", "PUT", "DELETE"
    contentType: "application/json", // data transfer format ("application/json" or "json")
    async: false, // true nm response eka enakm balan inne na. code eka continue wenawa. false nm response eka enakm balan innawa. code eka continue wenne na.

    success: function (successResponseData) {
      console.log("Success " , successResponseData);
      privileges = successResponseData;
    },

    error: function (failResponseData) {
      console.log("Fail " , failResponseData);
      privileges = [];
    }
  });

    // set dataType as "text" for these types of data that is found in elements in privileges array --> string, number, date
  // set dataType as "function" for these types of data that is found in elements in privileges array --> object, array, boolean
  const displayPropertyList = [
    { dataType: "function", propertyName: getRole },
    { dataType: "function", propertyName: getModule },
    { dataType: "function", propertyName: hasSelectPrivilege },
    { dataType: "function", propertyName: hasInsertPrivilege },
    { dataType: "function", propertyName: hasUpdatePrivilege },
    { dataType: "function", propertyName: hasDeletePrivilege },
  ];

    // call fillDataIntoTable function
  // defined in ../script/tableCommonFunction.js
  // (tableId, datalist, displayPropertyList, editFunctionName, deleteFunctionName, printFunctionName)
  fillDataIntoTable(
    tablePrivilege,
    privileges,
    displayPropertyList,
    privilegeFormRefill,
    deletePrivilege,
    printPrivilege
  );
};

// create function to get role name
// called from ../script/tableCommonFunction.js
const getRole = (ob) => {
  return ob.role_id.name;
};

// create function to get module name
// called from ../script/tableCommonFunction.js
const getModule = (ob) => {
  return ob.module_id.name;
};

// create function to get style of paragraph according to if user has select privilege
// called from ../script/tableCommonFunction.js
const hasSelectPrivilege = (ob) => {
  if (ob.privi_sel) {
    return (
      '<p style="border-radius: 10px;" class="border border-success text-success p-1 text-center fw-bold my-auto">' +
      "Granted" +
      "</p>"
    );
  } else {
    return (
      '<p style="border-radius: 10px;" class="border border-danger text-danger p-1 text-center fw-bold my-auto">' +
      "Not Granted" +
      "</p>"
    );
  }
};

// create function to get style of paragraph according to if user has insert privilege
// called from ../script/tableCommonFunction.js
const hasInsertPrivilege = (ob) => {
  if (ob.privi_inst) {
    return (
      '<p style="border-radius: 10px;" class="border border-success text-success p-1 text-center fw-bold my-auto">' +
      "Granted" +
      "</p>"
    );
  } else {
    return (
      '<p style="border-radius: 10px;" class="border border-danger text-danger p-1 text-center fw-bold my-auto">' +
      "Not Granted" +
      "</p>"
    );
  }
};

// create function to get style of paragraph according to if user has update privilege
// called from ../script/tableCommonFunction.js
const hasUpdatePrivilege = (ob) => {
  if (ob.privi_upd) {
    return (
      '<p style="border-radius: 10px;" class="border border-success text-success p-1 text-center fw-bold my-auto">' +
      "Granted" +
      "</p>"
    );
  } else {
    return (
      '<p style="border-radius: 10px;" class="border border-danger text-danger p-1 text-center fw-bold my-auto">' +
      "Not Granted" +
      "</p>"
    );
  }
};

// create function to get style of paragraph according to if user has delete privilege
// called from ../script/tableCommonFunction.js
const hasDeletePrivilege = (ob) => {
  if (ob.privi_del) {
    return (
      '<p style="border-radius: 10px;" class="border border-success text-success p-1 text-center fw-bold my-auto">' +
      "Granted" +
      "</p>"
    );
  } else {
    return (
      '<p style="border-radius: 10px;" class="border border-danger text-danger p-1 text-center fw-bold my-auto">' +
      "Not Granted" +
      "</p>"
    );
  }
};

// create function for refill privilege form
// called from ../script/tableCommonFunction.js
const privilegeFormRefill = (ob, rowIndex) => {
  // get user confirmation
  const userConfirm = confirm(
    "Are you sure to edit following privilege..? \n" +
      "\n Role Name is :" +
      ob.role_id.name +
      "\n Module Name is : " +
      ob.module_id.name
  );

  if (userConfirm) {
    // call edit services
    const editServerResponse = "OK";
    if (editServerResponse == "OK") {
      alert("Edit Successfully");
      refreshPrivilegeTable();
    } else {
      alert(
        "Edit not completed, you have following error\n" + editServerResponse
      );
    }
  } else {
    alert(
      "You cancelled edit of " +
        "\n Role Name :" +
        ob.role_id.name +
        "\n Module Name : " +
        ob.module_id.name
    );
    refreshPrivilegeTable();
  }
};

// create function for delete privilege record
// called from ../script/tableCommonFunction.js
const deletePrivilege = (ob, rowIndex) => {
  // get user confirmation
  const userConfirm = confirm(
    "Are you sure to delete following privilege..? \n" +
      "\n Role Name is :" +
      ob.role_id.name +
      "\n Module Name is : " +
      ob.module_id.name
  );

  if (userConfirm) {
    // call delete services
    const deleteServerResponse = "OK";
    if (deleteServerResponse == "OK") {
      alert("Delete Successfully");
      refreshPrivilegeTable();
    } else {
      alert(
        "Delete not completed, you have following error\n" +
          deleteServerResponse
      );
    }
  } else {
    alert(
      "You cancelled deletion of " +
        "\n Role Name :" +
        ob.role_id.name +
        "\n Module Name : " +
        ob.module_id.name
    );
    refreshPrivilegeTable();
  }
};

// create function for print privilege record
// called from ../script/tableCommonFunction.js
const printPrivilege = (ob, rowIndex) => {
  // get user confirmation
  const userConfirm = confirm(
    "Are you sure to print following privilege..? \n" +
      "\n Role Name is :" +
      ob.role_id.name +
      "\n Module Name is : " +
      ob.module_id.name
  );

  if (userConfirm) {
    // call print services
    const printServerResponse = "OK";
    if (printServerResponse == "OK") {
      alert("Print Successfully");
      refreshPrivilegeTable();
    } else {
      alert(
        "Print not completed, you have following error\n" + printServerResponse
      );
    }
  } else {
    alert(
      "You cancelled print of " +
        "\n Role Name :" +
        ob.role_id.name +
        "\n Module Name : " +
        ob.module_id.name
    );
    refreshPrivilegeTable();
  }
};

// define function to submit privilege
// called from ../../templates/privilege.html
function submitPrivilege() {
  // console.log("Submit");
  // console.log(privilege);

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
  if (privilege.role_id == null) {
    selectRole.classList.add("is-invalid");
    errors = errors + "Select Role...! \n";
  }
  if (privilege.module_id == null) {
    selectModule.classList.add("is-invalid");
    errors = errors + "Select Module...! \n";
  }
  return errors;
};
