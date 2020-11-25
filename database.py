import mysql.connector
from mysql.connector import Error

# this function returns a connection object if the connection to th mySQL server works
def create_connection(host_name, user_name, user_password, db_name=0):
    connection = None
    try:
        connection = mysql.connector.connect(
            host=host_name, user=user_name, passwd=user_password, database=db_name
        )
        print("Connection to MySQL DB successful")
    except Error as e:
        print(f"The error '{e}' occurred")

    return connection


connection = create_connection("localhost", "root", "")

# have to use this function to initalize the db with the connction object
def create_database(connection, query):
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        print("Database created successfully")
    except Error as e:
        print(f"The error '{e}' occurred")


# actually creating the db
create_database_query = "CREATE DATABASE sm_app"
create_database(connection, create_database_query)

# this is the connection to the actual db where we are holdong user info
connectionToDB = create_connection("localhost", "root", "", "sm_app")