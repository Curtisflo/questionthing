import mysql.connector
from mysql.connector import Error

# this function returns a connection object if the connection to th mySQL server works
def create_connection(host_name, user_name, user_password="6474584026Ab...", db_name):
    connection = mysql.connector.connect(
        host=host_name, user=user_name, passwd=user_password, database=db_name
    )
    return connection


connection = create_connection("localhost", "root", "6474584026Ab...", "question")

# have to use this function to initalize the db with the connction object
def create_database(connection, query):
    cursor = connection.cursor()
    cursor.execute(query)


# actually creating the db
create_database_query = "CREATE DATABASE question_app"
create_database(connection, create_database_query)

# this is the connection to the actual db where we are holdong user info
connectionToDB = create_connection("localhost", "root", "6474584026Ab...", "sm_app")


def execute_query(connection, query):
    cursor = connection.cursor()
    cursor.execute(query)
    connection.commit()


create_users_table = """
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT, 
  name TEXT NOT NULL, 
  age INT, 
  gender TEXT, 
  nationality TEXT, 
  PRIMARY KEY (id)
) ENGINE = InnoDB
"""

execute_query(connection, create_users_table)