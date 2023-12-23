// define method for validate input data
// called from ../../templates/employee-1.html
function textInputValidator(field, pattern, object, property) {
  const regex = new RegExp(pattern);
  if (field.value != "") {
    if (regex.test(field.value)) {
      // console.log("Valid");
      // obIndex.setAttribute("style", "border: 2px solid green");
      // obIndex.classList.add('bg-success');
      field.classList.remove("is-invalid");
      field.classList.add("is-valid");
      window[object][property] = field.value;
    } else {
      // console.log("Invalid");
      // obIndex.setAttribute("style", "border: 2px solid red");
      // obIndex.classList.add('bg-danger');
      field.classList.remove("is-valid");
      field.classList.add("is-invalid");
      window[object][property] = null;
    }
  } else {
    window[object][property] = null;
    if (field.required) {
      field.classList.remove("is-valid");
      field.classList.add("is-invalid");
    } else {
      field.classList.remove("is-valid");
      field.classList.remove("is-invalid");
    }
  }
}

// define function for validate dynamic select element
// called from ../../templates/employee-1.html
const selectDValidator = (field, pattern, object, property) => {
  if (field.value != "") {
    // valid
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
    window[object][property] = JSON.parse(
      field.value
    ); /* Parse the data so the data becomes a JavaScript object. A common use of JSON is to exchange data to/from a web server. When receiving data from a web server, the data is always a string. */
  } else {
    // invalid
    field.classList.remove("is-valid");
    field.classList.add("is-invalid");
    window[object][property] = null;
  }
};

// define function for validate static select element
// called from ../../templates/employee-1.html
const selectSValidator = (field, pattern, object, property) => {
  if (field.value != "") {
    // valid
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
    window[object][property] = field.value; // Not going to parse to JS object since the value is not a JSON string
  } else {
    // invalid
    field.classList.remove("is-valid");
    field.classList.add("is-invalid");
    window[object][property] = null;
  }
};
