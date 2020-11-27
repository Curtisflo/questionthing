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

//able to get the table name created by the user and store it in a variable now
const check = (e) => {
    const form = new FormData(e.target);
    const tableName = form.get("tableName");
    console.log(tableName);
    return false
};
