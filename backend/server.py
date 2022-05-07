from flask import request, jsonify, Flask
from flask_cors import CORS
import mysql.connector
from datetime import datetime

db_config = {
  'user': 'root',
  'password': 'root',
  'host': 'localhost',
  'unix_socket': '/Applications/MAMP/tmp/mysql/mysql.sock',
  'database': 'portfolio_project_db',
  'raise_on_warnings': True
}

app = Flask(__name__)
CORS(app)

def execute_query(query_statement):
  cnx = mysql.connector.connect(**db_config)

  cursor = cnx.cursor(dictionary=True)

  cursor.execute(query_statement)

  results = cursor.fetchall()

  cnx.close()

  return results


@app.route("/getAllPortfolioUsers", methods=['POST'])
def get_all_portfolio_users():
  query_statement = f'SELECT UserID FROM `Portfolios`;'

  results = execute_query(query_statement)
  # merged_results = {**portfolio_results[0], **user_results[0]}
  portfolios = {}

  for user in results:
    user_query = f'SELECT FirstName, LastName, Occupation FROM `Users` WHERE UserID = {user["UserID"]};'
    userInfo = execute_query(user_query)
    portfolios[user["UserID"]] = userInfo[0]

  return portfolios


@app.route("/login", methods=['POST'])
def login():
  content_type = request.headers.get('Content-Type')

  if (content_type == 'application/json'):
      params = request.get_json()
  else:
    error_msg = f'An invalid content type ({content_type}) was provided to the map data endpoint. Please provide a valid JSON content type.'
    app.logger.error(error_msg)
    return jsonify(message=error_msg), 418

  if "Email" in params and "Pwd" in params:
    email = params["Email"]
    pwd = params["Pwd"]
  else: 
    error_msg = f'Missing userID property from request'
    app.logger.error(error_msg)
    return jsonify(message=error_msg), 418

  query_statement = f'SELECT UserID, FirstName, LastName, Occupation FROM `Users` WHERE Email = \'{email}\' AND Pwd = \'{pwd}\';'

  results = execute_query(query_statement)

  if len(results) < 1:
    error_msg = f'Incorrect Email or Password'
    app.logger.error(error_msg)
    return jsonify(message=error_msg), 418

  return results[0]


@app.route("/getUserInfo", methods=['POST'])
def get_user_info():
  content_type = request.headers.get('Content-Type')

  if (content_type == 'application/json'):
      params = request.get_json()
  else:
    error_msg = f'An invalid content type ({content_type}) was provided to the map data endpoint. Please provide a valid JSON content type.'
    app.logger.error(error_msg)
    return jsonify(message=error_msg), 418

  if "UserID" in params:
    user_id = params["UserID"]
  else: 
    error_msg = f'Missing property from request'
    app.logger.error(error_msg)
    return jsonify(message=error_msg), 418

  query_statement = f'SELECT FirstName, LastName, Occupation FROM `Users` WHERE UserID = \'{user_id}\';'

  results = execute_query(query_statement)

  if len(results) < 1:
    return {}

  return results[0]

@app.route("/getPortfolio", methods=['POST'])
def get_portfolio():

  content_type = request.headers.get('Content-Type')

  if (content_type == 'application/json'):
      params = request.get_json()
  else:
    error_msg = f'An invalid content type ({content_type}) was provided to the map data endpoint. Please provide a valid JSON content type.'
    app.logger.error(error_msg)
    return jsonify(message=error_msg), 418


  if "UserID" in params:
    user_id = params["UserID"]
  else: 
    error_msg = f'Missing userID property from request'
    app.logger.error(error_msg)
    return jsonify(message=error_msg), 418

  query_statement = f'Select * FROM `Portfolios` where UserID = {user_id}'

  portfolio_results = execute_query(query_statement)
  
  if len(portfolio_results) < 1:
    error_msg = f'No user with that ID'
    app.logger.error(error_msg)
    return jsonify(message=error_msg), 418

  query_statement = f'SELECT FirstName, LastName, Occupation FROM `Users` WHERE UserID = \'{user_id}\';'

  user_results = execute_query(query_statement)

  if len(user_results) < 1:
    error_msg = f'No user with that ID'
    app.logger.error(error_msg)
    return jsonify(message=error_msg), 418

  merged_results = {**portfolio_results[0], **user_results[0]}

  return merged_results

def exexute_insert(insert_statement):
  cnx = mysql.connector.connect(**db_config)

  cursor = cnx.cursor(dictionary=True)

  cursor.execute(insert_statement)

  cnx.commit()

  cnx.close()


@app.route("/createUser", methods=['POST'])
def create_user():
  content_type = request.headers.get('Content-Type')

  # Ensure the request is made with a json file
  if (content_type == 'application/json'):
      params = request.get_json()
  else:
    error_msg = f'An invalid content type ({content_type}) was provided to the map data endpoint. Please provide a valid JSON content type.'
    app.logger.error(error_msg)
    return jsonify(message=error_msg), 418

  # Ensure all of the properties exist to create a user
  if "FirstName" in params and "LastName" in params and "Occupation" in params and "Email" in params and "Pwd" in params:
    first_name = params["FirstName"]
    last_name = params["LastName"]
    occupation = params["Occupation"]
    email = params["Email"]
    pwd = params["Pwd"]
  else:
    error_msg = f'Create user query does not have the required fields'
    app.logger.error(error_msg)
    return jsonify(message=error_msg), 418

  insert_statement = f"INSERT INTO USERS (FirstName, LastName, Occupation, Email, Pwd ) VALUES (\'{first_name}\', \'{last_name}\', \'{occupation}\', \'{email}\', \'{pwd}\');"

  exexute_insert(insert_statement)


@app.route("/getVisits", methods=['POST'])
def get_visits():

  content_type = request.headers.get('Content-Type')

  if (content_type == 'application/json'):
      params = request.get_json()
  else:
    error_msg = f'An invalid content type ({content_type}) was provided to the map data endpoint. Please provide a valid JSON content type.'
    app.logger.error(error_msg)
    return jsonify(message=error_msg), 418


  if "VisitedUserID" in params:
    visited_id = params["VisitedUserID"]
  else: 
    error_msg = f'Missing userID property from request'
    app.logger.error(error_msg)
    return jsonify(message=error_msg), 418

  query_statement = f'Select VisitingUserID, TimeVisited FROM `Visits` where VisitedUserID = {visited_id}'

  visit_results = execute_query(query_statement)
  
  visits = {}

  for i,visit in enumerate(visit_results):
    user_query = f'Select FirstName, LastName FROM `USERS` where UserID = {visit["VisitingUserID"]}'
    user_results = execute_query(user_query)
    merged_results = {**user_results[0], **visit}
    visits[i] = merged_results

  return visits


@app.route("/createVisit", methods=['POST'])
def create_visit():
  content_type = request.headers.get('Content-Type')

  # Ensure the request is made with a json file
  if (content_type == 'application/json'):
      params = request.get_json()
  else:
    error_msg = f'An invalid content type ({content_type}) was provided to the map data endpoint. Please provide a valid JSON content type.'
    app.logger.error(error_msg)
    return jsonify(message=error_msg), 418

  # Ensure all of the properties exist to create a user
  if "VisitingUserID" in params and "VisitedUserID" in params:
    visiting_id = params["VisitingUserID"]
    visited_id = params["VisitedUserID"]
  else:
    error_msg = f'Create view query does not have the required fields'
    app.logger.error(error_msg)
    return jsonify(message=error_msg), 418

  time_visited = datetime.now()
  app.logger.error("-----------------------")
  app.logger.error(time_visited)

  time_query = f"SELECT TimeVisited FROM `VISITS` WHERE VisitingUserID = {visiting_id} AND VisitedUserID = {visited_id};"

  results = execute_query(time_query)

  if len(results) > 0:
    app.logger.error(results[-1])
    previous_time = results[-1]["TimeVisited"]
    minutes_diff = (time_visited - previous_time).total_seconds() / 60.0

    if minutes_diff < 5:
      return (
        jsonify(
            message="Record already recorded"
        ),
        200,
    )

  formatted_time = time_visited.strftime('%Y-%m-%d %H:%M:%S')

  insert_statement = f"INSERT INTO VISITS (VisitingUserID, VisitedUserId, TimeVisited ) VALUES ({visiting_id}, {visited_id}, \'{formatted_time}\');"

  exexute_insert(insert_statement)

  return (
        jsonify(
            message="Successfully Updated Portfolio"
        ),
        200,
    )

@app.route("/createPortfolio", methods=['POST'])
def create_portfolio():

  params = request.form

  fields_string = ''
  values_string = ''

  # Find out how to insert
  # for f in files:
  #   img = files[f].read()
  #   image_insert = f"UPDATE PORTFOLIOS SET {f} = %s WHERE UserID = {user_id} and PortfolioID = {portfolio_id};"

  for key in params:
    if key == "ProjectOneImage" or key == "ProjectTwoImage" or key == "ProjectThreeImage" or key == "AboutImage":
      continue
    fields_string += key + ','
    if isinstance(params[key], str):
      if params[key] == "null":
        values_string += 'NULL,'
      else:
        values_string += f'\'{params[key]}\','
    else:
      values_string += str(params[key]) + ','


  fields_string = fields_string[:-1]
  values_string = values_string[:-1]

  insert_statement = f"INSERT INTO PORTFOLIOS ( {fields_string} ) VALUES ({values_string});"

  exexute_insert(insert_statement)

  return (
        jsonify(
            message="Successfully Updated Portfolio"
        ),
        200,
    )


@app.route("/updateUserPortfolio", methods=['POST'])
def update_portfolio():
  # Ensure the request is made with a json file
  params = request.form

  files = request.files

  # for f in files:
  #   app.logger.error("--------------------")
  #   app.logger.error(f)

  

  # for p in params:
  #   app.logger.error(p)
  #   app.logger.error(params[p])


  # Ensure all of the properties exist to create a user
  if "UserID" in params and "PortfolioID" in params:
    user_id = params["UserID"]
    portfolio_id = params["PortfolioID"]
  else:
    error_msg = f'Create portfolio query does not have the required fields'
    app.logger.error(error_msg)
    return jsonify(message=error_msg), 418

  # Find out how to insert
  # for f in files:
  #   img = files[f].read()
  #   image_insert = f"UPDATE PORTFOLIOS SET {f} = %s WHERE UserID = {user_id} and PortfolioID = {portfolio_id};"

    

  update_string = ''

  for key in params:
    # Skip Images
    if key == "ProjectOneImage" or key == "ProjectTwoImage" or key == "ProjectThreeImage" or key == "AboutImage":
      continue
    # Skip Unrelated Columns
    elif key == "UserID" or key == "PortfolioID" or key == "FirstName" or key == "LastName" or key == "Occupation" or key == None:
      continue
    elif isinstance(params[key], str):
      if params[key] == None or params[key] == "null":
        update_string += key + '= NULL,'
        continue
      update_string += key + '=' + f'\'{params[key]}\','
    else:
      if params[key] == None or params[key] == "null":
        update_string += key + '= NULL,'
        continue
      update_string += key + '=' + str(params[key]) + ','

  update_string = update_string[:-1]

  insert_statement = f"UPDATE PORTFOLIOS SET {update_string} WHERE UserID = {user_id} and PortfolioID = {portfolio_id};"

  exexute_insert(insert_statement)

  return (
        jsonify(
            message="Successfully Updated Portfolio"
        ),
        200,
    )

if __name__=="__main__":
  app.run(debug=True)