var table = new Tabulator("#example-table", {
    dataTree:true,
    dataTreeCollapseElement:"<i class='fas fa-minus-square'></i>",
    dataTreeStartExpanded:true,
    height:"311px",
    columns:[
    {title:"Question", field:"question"},
    {title:"Likes", field:"likes", sorter:"number"},
    {title:"Total", field:"total", sorter:"number"},
    {title:"Subordinate", field:"subordinate"},
    ],
});

var tableData = [
  {id:1, question:"Billy Bob", likes:"12", subordinate:-1},
  {id:2, question:"Mary May", likes:"1", subordinate:1},
  {id:3, question:"Timmy Tarun", likes:"6", subordinate:-1},
  {id:4, question:"Danny Daniel", likes:"3", subordinate:3},
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
      questions[i].total = 0;
      //nest subordinate question in superordinate question
      var row = table.getRow(questions[i].subordinate);
      row.addTreeChild({id:questions.index, 
        question:questions[i].question, 
        likes:questions[i].likes, 
        subordinate:questions[i].subordinate,
        total:null
      });
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
    else{
      total = Number(questions[i].likes);
      for(j = 0; j < questions.length; j++){
        if(questions[j].subordinate == questions[i].id){
          total+=Number(questions[j].likes);
        }
      }
      table.updateData([{id:questions[i].id, total:total}]).then(function(){
        //run code after row has been deleted
      })
      .catch(function(error){
        //handle error deleting row
      });
    }
  }
}
