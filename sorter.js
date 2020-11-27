question = new Object();

links = new Object();

function addQuestions(){

    for(i = 0; i < table.getDataCount(); i++){
        var row = table.getRow(i).getData();
        
        
    }
    questionList
    return questionList;
}

function linkQuestions(questionList){
    //check if things are linked
    greatestLinks = 0;
    greatestIndex = -1;
    for (i = 0; i < questionList.length; i++){
        for (i=0; i < questionList.links.length; i++){
            if (questionList.links.total > greatestLinks){
                greatestLinks = questionList.links.total;
                greatestIndex = questionList.links.index;
            }
            if (questionList[greatest_index].likes == questionList.likes){
                questionList.subordinate = greatestIndex;
            }
            else
                questionList.subordinate = -1;
        }
        greatestIndex = -1;
        greatestLinks = 0;
    }
    return questionList;
}

function updateSubordinate(questionList){
    // Alter everything's subordinate variable
    for (i=0; i < questionList.length; i++){
        table.updateRow(questionList[i].index, {
            id:questionList[i].index, 
            question:questionList[i].question, 
            subordinate:questionList[i].subordinate
        });
    }
}

questions = addQuestions();
questions = linkQuestions(questions);
updateSubordinate(questions)