// create fillDataIntoTable function fill data into table
// display edit/ delete/ view buttons in modify column
// called from ../controllerjs/employee-1.js
const fillDataIntoTable = (
  tableId,
  datalist,
  displayColumnList,
  editFunction /* employeeFormRefill function in ../controllerjs/employee-1.js */,
  deleteFunction /* deleteEmployee function in ../controllerjs/employee-1.js */,
  printFunction /* printEmployee function in ../controllerjs/employee-1.js */,
  buttonVisibility = true
) => {
  // create variable called employeeTable and assign table element
  const tableBody = tableId.children[1]; // catch tbody element of table
  tableBody.innerHTML = ""; // remove all children of tbody element

  datalist.forEach((element, index) => {
    const tr = document.createElement("tr");


    const tdIndex = document.createElement("td");
    tdIndex.innerText = index + 1;
    tr.appendChild(tdIndex);

    displayColumnList.forEach((column) => {
      const td = document.createElement("td");
      if (column.dataType == "text") {
        td.innerText = element[column.propertyName];
      }
      if (column.dataType == "function") {
        td.innerHTML = column.propertyName(element);
      }

      tr.appendChild(td);
    });

    const tdButton = document.createElement("td");

    const buttonEdit = document.createElement("button");
    buttonEdit.className = "btn btn-outline-warning fw-bold me-2";
    buttonEdit.innerHTML = "Edit";
    buttonEdit.onclick = function () {
      // console.log('Edit');
      editFunction(element, index);
    };
    tdButton.appendChild(buttonEdit);

    const buttonDelete = document.createElement("button");
    buttonDelete.className = "btn btn-outline-danger fw-bold me-2";
    buttonDelete.innerHTML = "Delete";
    buttonDelete.onclick = function () {
      // console.log('Delete');
      deleteFunction(element, index);
    };
    tdButton.appendChild(buttonDelete);

    const buttonView = document.createElement("button");
    buttonView.className = "btn btn-outline-success fw-bold";
    buttonView.innerHTML = "View";
    buttonView.onclick = function () {
      // console.log('View');
      printFunction(element, index);
    };
    tdButton.appendChild(buttonView);

    if (buttonVisibility) {
      tr.appendChild(tdButton); // append tdbutton into table row
    }

    tableBody.appendChild(tr); // append table row into table body
  });
};

// create fillDataIntoTable2 function fill data into table
// display edit/ delete/ view buttons in a dropdown menu in modify column
// called from ../controllerjs/employee-1.js
const fillDataIntoTable2 = (
  tableId,
  datalist,
  displayColumnList,
  editFunction /* employeeFormRefill function in ../controllerjs/employee-1.js */,
  deleteFunction /* deleteEmployee function in ../controllerjs/employee-1.js */,
  printFunction /* printEmployee function in ../controllerjs/employee-1.js */,
  buttonVisibility = true
) => {
  // create variable called employeeTable and assign table element
  const tableBody = tableId.children[1]; // catch tbody element of table
  tableBody.innerHTML = ""; // remove all children of tbody element

  datalist.forEach((element, index) => {
    const tr = document.createElement("tr");

    const tdIndex = document.createElement("td");
    tdIndex.innerText = index + 1;
    tr.appendChild(tdIndex);

    displayColumnList.forEach((column) => {
      const td = document.createElement("td");
      if (column.dataType == "text") {
        td.innerText = element[column.propertyName];
      }
      if (column.dataType == "function") {
        td.innerHTML = column.propertyName(element);
      }

      tr.appendChild(td);
    });

    const tdButton = document.createElement("td");
    tdButton.className = "text-center";

    // create dropdown menu container
    const divDropdown = document.createElement("div");
    divDropdown.className = "dropdown";

    // create dropdown menu icon
    const dropDownI = document.createElement("i");
    dropDownI.className = "fa-solid fa-ellipsis-vertical";
    dropDownI.setAttribute("data-bs-toggle", "dropdown");
    dropDownI.setAttribute("aria-expanded", "false");

    // create dropdown menu list
    const dropdownUL = document.createElement("ul");
    dropdownUL.className = "dropdown-menu";

    // create dropdown menu list items
    const dropdownLiEdit = document.createElement("li");
    dropdownLiEdit.className = "dropdown-item";

    const dropdownLiDelete = document.createElement("li");
    dropdownLiDelete.className = "dropdown-item";

    const dropdownLiPrint = document.createElement("li");
    dropdownLiPrint.className = "dropdown-item";

    const buttonEdit = document.createElement("button");
    buttonEdit.className = "btn btn-warning w-100 fw-bold me-2";
    buttonEdit.innerHTML = "Edit";
    buttonEdit.onclick = function () {
      // console.log('Edit');
      editFunction(element, index);
    };

    const buttonDelete = document.createElement("button");
    buttonDelete.className = "btn btn-danger w-100 fw-bold me-2";
    buttonDelete.innerHTML = "Delete";
    buttonDelete.onclick = function () {
      // console.log('Delete');
      deleteFunction(element, index);
    };

    const buttonView = document.createElement("button");
    buttonView.className = "btn btn-success w-100 fw-bold";
    buttonView.innerHTML = "View";
    buttonView.onclick = function () {
      // console.log('View');
      printFunction(element, index);
    };

    // append buttons to dropdown menu list items
    dropdownLiEdit.appendChild(buttonEdit);
    dropdownLiDelete.appendChild(buttonDelete);
    dropdownLiPrint.appendChild(buttonView);

    // append list items to dropdown list
    dropdownUL.appendChild(dropdownLiEdit);
    dropdownUL.appendChild(dropdownLiDelete);
    dropdownUL.appendChild(dropdownLiPrint);

    // append dropdown list, dropdown menu icon to dropdown container
    divDropdown.appendChild(dropDownI);
    divDropdown.appendChild(dropdownUL);

    tdButton.appendChild(divDropdown);

    if (buttonVisibility) {
      tr.appendChild(tdButton); // append tdbutton into table row
    }

    tableBody.appendChild(tr); // append table row into table body
  });
};

// create fillDataIntoTable3 function fill data into table
// display edit/delete/print buttons area above table when radio button clicked
// called from ../controllerjs/employee-1.js
const fillDataIntoTable3 = (
  tableId,
  datalist,
  displayColumnList,
  editFunction /* employeeFormRefill function in ../controllerjs/employee-1.js */,
  deleteFunction /* deleteEmployee function in ../controllerjs/employee-1.js */,
  printFunction /* printEmployee function in ../controllerjs/employee-1.js */,
  buttonVisibility = true
) => {
  // create variable called employeeTable and assign table element
  const tableBody = tableId.children[1]; // catch tbody element of table
  tableBody.innerHTML = ""; // remove all children of tbody element

  datalist.forEach((element, index) => {
    const tr = document.createElement("tr");

    const tdIndex = document.createElement("td");
    tdIndex.innerText = index + 1;
    tr.appendChild(tdIndex);

    displayColumnList.forEach((column) => {
      const td = document.createElement("td");
      if (column.dataType == "text") {
        td.innerText = element[column.propertyName];
      }
      if (column.dataType == "function") {
        td.innerHTML = column.propertyName(element);
      }

      tr.appendChild(td);
    });

    const tdButton = document.createElement("td");
    tdButton.className = "text-center";

    const inputRadio = document.createElement("input");
    inputRadio.name = "modify";
    inputRadio.type = "radio";
    inputRadio.className = "form-check-input mt-1";
    inputRadio.onchange = () => {
      divModify.setAttribute("class", "");
      window["activeOb"] = element;
      window["activeRow"] = index;
    };

    // console.log(element);

    tdButton.appendChild(inputRadio);

    if (buttonVisibility) {
      tr.appendChild(tdButton); // append tdbutton into table row
    }

    tableBody.appendChild(tr); // append table row into table body
  });
};

// create fillDataIntoTable4 function fill data into table
// display edit/delete/print buttons area above table when row clicked
// called from ../controllerjs/employee-1.js
const fillDataIntoTable4 = (
  tableId,
  datalist,
  displayColumnList,
  editFunction /* employeeFormRefill function in ../controllerjs/employee-1.js */,
  deleteFunction /* deleteEmployee function in ../controllerjs/employee-1.js */,
  printFunction /* printEmployee function in ../controllerjs/employee-1.js */,
  buttonVisibility = true
) => {
  // create variable called employeeTable and assign table element
  const tableBody = tableId.children[1]; // catch tbody element of table
  tableBody.innerHTML = ""; // remove all children of tbody element

  datalist.forEach((element, index) => {
    const tr = document.createElement("tr");

    const tdIndex = document.createElement("td");
    tdIndex.innerText = index + 1;
    tr.appendChild(tdIndex);

    displayColumnList.forEach((column) => {
      const td = document.createElement("td");
      if (column.dataType == "text") {
        td.innerText = element[column.propertyName];
      }
      if (column.dataType == "function") {
        td.innerHTML = column.propertyName(element);
      }

      tr.appendChild(td);
    });

    if (buttonVisibility) {
      tr.onclick = () => {
        divModify.setAttribute("class", "");
        window["activeOb"] = element;
        window["activeRow"] = index;
      };
    }

    tableBody.appendChild(tr); // append table row into table body
  });
};

// create fillDataIntoTable5 function fill data into table
// display edit/delete/print buttons area above table when row clicked
// confirmation box will be displayed
// called from ../controllerjs/employee-1.js
const fillDataIntoTable5 = (
  tableId,
  datalist,
  displayColumnList,
  editFunction /* employeeFormRefill function in ../controllerjs/employee-1.js */,
  deleteFunction /* deleteEmployee function in ../controllerjs/employee-1.js */,
  printFunction /* printEmployee function in ../controllerjs/employee-1.js */,
  buttonVisibility = true
) => {
  // create variable called employeeTable and assign table element
  const tableBody = tableId.children[1]; // catch tbody element of table
  tableBody.innerHTML = ""; // remove all children of tbody element

  datalist.forEach((element, index) => {
    const tr = document.createElement("tr");

    const tdIndex = document.createElement("td");
    tdIndex.innerText = index + 1;
    tr.appendChild(tdIndex);

    displayColumnList.forEach((column) => {
      const td = document.createElement("td");
      if (column.dataType == "text") {
        td.innerText = element[column.propertyName];
      }
      if (column.dataType == "function") {
        td.innerHTML = column.propertyName(element);
      }

      tr.appendChild(td);
    });
    if (buttonVisibility) {
      tr.onclick = () => {
        editFunction(
          element,
          index
        ); /* call employeeFormRefill function that is defined in ../controllerjs/employee-1.js */
        divModify.setAttribute("class", "");
        window["activeOb"] = element;
        window["activeRow"] = index;
      };
    }

    tableBody.appendChild(tr); // append table row into table body
  });
};
