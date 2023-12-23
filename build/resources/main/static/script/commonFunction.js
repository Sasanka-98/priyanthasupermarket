// define function for fill data into select element
// called from ../controllerjs/employee-1.js
const fillDataIntoSelect = (field, message, datalist, property) => {
  field.innerHTML = ""; // remove all children of select tag

  // set message to be the first option
  const optionMsg = document.createElement("option");
  optionMsg.selected = "selected";
  optionMsg.disabled = "disabled";
  optionMsg.innerText = message;
  field.appendChild(optionMsg);

  // append data according to property of datalist object
  datalist.forEach((element) => {
    const option = document.createElement("option");
    option.value =
      JSON.stringify(
        element
      ); /* Convert a JavaScript object into a JSON string. A common use of JSON is to exchange data to/from a web server. When sending data to a web server, the data has to be a string. */

    option.innerText = element[property];
    field.appendChild(option);
  });
};
