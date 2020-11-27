var table = new Tabulator("#example-table", {
    dataTree:true,
    dataTreeCollapseElement:"<i class='fas fa-minus-square'></i>",
    dataTreeStartExpanded:true,
    height:"311px",
    columns:[
    {title:"Question", field:"question"},
    {title:"Likes", field:"likes", sorter:"number"},
    {title:"Subordinate", field:"subordinate", sorter:"number"},
    ],
});

var tableData = [
  {id:1, question:"Billy Bob", likes:"12", subordinate:-1},
  {id:2, question:"Mary May", likes:"1", subordinate:1},
]
table.setData(tableData);

//able to get the table name created by the user and store it in a variable now
function check(e) {
  const form = new FormData(e.target);
  const tableName = form.get("tableName");
  console.log(tableName);
  return false;
}

setInterval(updates(), 1000);

function updates(){
  questions = addQuestions();
  //questions = linkQuestions(questions);
  for(i = 0; i < questions.length; i++){
    if(questions[i].subordinate != -1){
      //add subordinate question likes to superordinate question
      
      //nest subordinate question in superordinate question
      var row = table.getRow(questions[i].subordinate);
      row.addTreeChild({id:questions.index, 
        question:questions[i].question, 
        likes:questions[i].likes, 
        subordinate:questions[i].subordinate});
        table.updateRow(questions[i].subordinate).then(function(){
          //run code after row has been deleted
        })
        .catch(function(error){
          //handle error deleting row
        });
        table.deleteRow(questions[i].id).then(function(){
          //run code after row has been deleted
        })
        .catch(function(error){
          //handle error deleting row
        });
    }
  }
}
