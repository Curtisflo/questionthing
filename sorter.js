function addQuestions(){
    var question = {id:0, question:"none", likes:0, subordinate:-1};
    var questionList = [];
    for(i = 1; i < table.getDataCount()+1; i++){
        try{
            question = table.getRow(i).getData();
        }  
        catch(err){
            for(j = 1; j < table.getDataCount()+1; j++){
                var tester = {id:0, question:"none", likes:0, subordinate:-1};
                var childList = [];
                try{
                    tester = table.getRow(j).getData();
                    childList = tester._children;
                    if(childList.length == 0){
                        continue;
                    }
                    for(k = 0; k < childList.length; k++){
                        if(childList[k].id == i){
                            question = childList[k];
                        }
                    }
                }
                catch(error){continue;}
            }
        }
        questionList.push(question);
    }
    return questionList;
}

function linkQuestions(questionList){
    //check if things are linked
    greatestLinks = 0;
    greatestIndex = -1;
    for (i = 0; i < questionList.length; i++){
        for (j=0; i < questionList[i].links.length; i++){
            if (questionList[i].links.total > greatestLinks){
                greatestLinks = questionList[i].links.total;
                greatestIndex = questionList[i].links.id;
            }
            if (questionList[greatest_index].likes == questionList[i].likes){
                questionList[i].subordinate = greatestIndex;
            }
            else
                questionList[i].subordinate = -1;
        }
        greatestIndex = -1;
        greatestLinks = 0;
    }
    return questionList;
}