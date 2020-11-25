class question:
    def __init__(self, num, question, subordinate, links):
        self.question = question
        self.num = num
        self.subordinate = subordinate
        self.links = links

class links:
    def __init__(self, index_num, total):
        self.index_num = index_num
        self.total = total


def add_questions():
    question_list = question(1, "hi", -1, links(1, 2)) 
    #access database
    #determine what the links are
    #separate the itmes into an array
    #question_list.links.append(new_link)
    return question_list

def link_questions(question_list):
    #check if things are linked
    greatest_links = 0
    greatest_index = -1
    for x in question_list:
        for x in question_list.links:
            if question_list.links.total > greatest_links:
                greatest_links = question_list.links.total
                greatest_index = question_list.links.index
            if question_list[greatest_index].likes == question_list.likes:
                question_list.subordinate = greatest_index
            else:
                question_list.subordinate = -1
        greatest_index = -1
        greatest_links = 0
    return question_list

def update(question_list):
    #alter everything's subordinate variable
    for x in question_list:
        pass
        #whatever the fuck is the sql thing = question_list.subordinate

questions = add_questions()
questions = link_questions(questions)
update(questions)