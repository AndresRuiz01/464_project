from flask import jsonify
import mysql.connector
from datetime import datetime
config = {
  'user': 'root',
  'password': 'root',
  'host': 'localhost',
  'unix_socket': '/Applications/MAMP/tmp/mysql/mysql.sock',
  'database': 'portfolio_project_db',
  'raise_on_warnings': True
}

first_name = "test"
first_name = "test"
occupation = "test"
email = "test"
pwd = "test"


cnx = mysql.connector.connect(**config)

cursor = cnx.cursor(dictionary=True)

time_visited = datetime.now()

print(time_visited)

formatted_time = time_visited.strftime('%Y-%m-%d %H:%M:%S')

insert_statement = f"INSERT INTO VISITS (VisitingUserID, VisitedUserId, TimeVisited ) VALUES (1, 2, \'{formatted_time}\');"

print(insert_statement)

cursor.execute(insert_statement)

cnx.commit()