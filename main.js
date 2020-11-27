var table = new Tabulator("#example-table", {
    height:"311px",
    columns:[
    {title:"Name", field:"name"},
    {title:"Progress", field:"progress", sorter:"number"},
    {title:"Gender", field:"gender"},
    {title:"Rating", field:"rating"},
    {title:"Favourite Color", field:"col"},
    {title:"Date Of Birth", field:"dob", hozAlign:"center"},
    ],
});
let tableName
tableName = document.getElementById(tableName).value;

function validateForm() {
    var x = document.forms["tableNameForm"]["tableName"].value;
    if (x == "") {
      alert("Table name must be filled out");
      return false;
    }
  }