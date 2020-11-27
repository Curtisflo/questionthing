var table = new Tabulator("#example-table", {
    height:"311px",
    columns:[
    {title:"Question", field:"question"},
    {title:"Likes", field:"likes", sorter:"number"},
    {title:"likes_links", field:"likes_links"},
    {title:"subordinate", field:"subordinate"},
    ],
});

//able to get the table name created by the user and store it in a variable now
const check = (e) => {
  const form = new FormData(e.target);
  const tableName = form.get("tableName");
  console.log(tableName);
  return false
};