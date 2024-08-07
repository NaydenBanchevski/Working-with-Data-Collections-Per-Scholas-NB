// assignment Per Scholas

const csvStringOne =
  "Index,Mass (kg),Spring 1 (m),Spring 2 (m)\n1,0.00,0.050,0.050\n2,0.49,0.066,0.066\n3,0.98,0.087,0.080\n4,1.47,0.116,0.108\n5,1.96,0.142,0.138\n6,2.45,0.166,0.158\n7,2.94,0.193,0.174\n8,3.43,0.204,0.192\n9,3.92,0.226,0.205\n10,4.41,0.238,0.232";

const csvStringTwo = `ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26`;

//function to convert the csv string to multiple arrays
function organizeCSV(str) {
  let table_cells = "";
  let table_rows = [];
  let table = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] === ",") {
      table_rows.push(table_cells);
      table_cells = "";
    } else if (str[i] === "\n") {
      table_rows.push(table_cells);
      table.push(table_rows);
      table_rows = [];
      table_cells = "";
    } else {
      table_cells += str[i];
    }
  }
  // Log each row of data
  for (let j = 0; j < table.length; j++) {
    console.log(table[j]);
  }
}

organizeCSV(csvStringOne);
console.log(`\n----\n`);
organizeCSV(csvStringTwo);

// assignment Per Scholas part Two

const csvStringThree =
  "ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26";

// function  to create Array with multiple objects

function organizeCSV2(str) {
  let strArr = "";
  let arr = [];
  let resultArr = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "\n") {
      resultArr.push(arr);
      arr.push(strArr);
      arr = [];
      strArr = "";
    } else {
      strArr += str[i];
    }
  }
  // after the last \n the string was not pushed into the array
  // this is a condition if there are characters left and there is no \n  to be pushed into the str within the array

  if (strArr.length > 0 || arr.length > 0) {
    arr.push(strArr);
    resultArr.push(arr);
  }
  console.log(`\n------\n`);
  console.log(resultArr);

  //here I`m slicing the first array[0] with the 'ID' 'Name' 'Occupation' and 'age'. If we don`t slice it the result will look like this
  // { 0: id: 'ID', name: 'Name', occupation: 'Occupation', age: 'Age'} an extra row that is not needed

  let resultArrObject = resultArr.slice(1).map((row) => {
    // here in this array the corresponding data is with the index of the each separate variable
    let [id, name, occupation, age] = row[0].split(",");
    return { id, name, occupation, age };
  });

  console.log(resultArrObject);
  return resultArrObject;
}

let csvArrObject = organizeCSV2(csvStringThree);

//remove last element
let csvRmv = csvArrObject.pop();
console.log(csvArrObject);

// add object at index 1 of the array
let csvObjOne = { id: "48", name: "Barry", occupation: "Runner", age: "25" };
let csvAddObjIndexOne = csvArrObject.splice(1, 0, csvObjOne);

// add object at the end of the array
let csvObjTwo = { id: "7", name: "Bilbo", occupation: "None", age: "111" };
let csvObjPush = csvArrObject.push(csvObjTwo);

// function to reverse the array to csv string
function arrToStr(arr) {
  // getting the 1st object-row with index of [0] by using Object.keys method. It gets all propNames and with the join method converts them into a string
  let obj_props = Object.keys(arr[0]).join(",");
  //console.log(obj_props)

  // for the result I'm mapping over the main array and I`m targeting each object within it  and with Object.values and join method I'm converting the object into a string separated by comma
  let result = arr.map((obj) => {
    let obj_values = Object.values(obj).join(",");
    //console.log(obj_values)

    // with the template literal the function returns the values of each object as a string with \n (new row in the beginning of each string) the double \\ allows me to add it and for it to appear as a part of the string
    return `\\n${obj_values}`;
  });
  // with the template literal I add the first row with the rest of the strings withing the main arr.
  return `${obj_props}${result}`;
}
let finalResult = arrToStr(csvArrObject);
console.log(finalResult);
