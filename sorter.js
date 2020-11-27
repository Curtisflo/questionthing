question = new Object();

links = new Object();

function addQuestions(dataLink){

    for(i = 0; i < dataLink; i++){
        
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

    }
}

questions = addQuestions("database");
questions = linkQuestions(questions);
updateSubordinate(questions)