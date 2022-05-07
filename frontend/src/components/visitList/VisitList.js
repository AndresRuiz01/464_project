import React, {useEffect, useState} from "react";
import { NavLink, useNavigate , useParams} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';

import "./VisitList.css";

function VisitList({setUserId, loggedInUserInfo, setLoggedInUserInfo}) {

  const navigate = useNavigate()

  function logout() {
    setLoggedInUserInfo({})
    navigate('/')
  }

  function navigateList() {
    navigate(`/portfolios`)
  }

  const { id } = useParams();

  const [visits, setVisits] = useState([])

  let visitsListComponents = []

  let colors = ["white", "grey"]

  let displayedVisits = []

  for(let v in visits) {
    const visit = visits[v];
    console.log(visit)
    if (displayedVisits.includes(visit["TimeVisited"])) {
      continue
    }

    let compClassName = `portfolio-info ${colors[displayedVisits.length % 2]}`

    visitsListComponents.push(<div key={v} className={compClassName}>
                                  <div className="portfolio-item">
                                    <span>{visit["FirstName"]} {visit["LastName"]}</span>
                                    <span style={{width: "5px"}}></span>
                                  </div>
                                  <div className="portfolio-item">{visit["TimeVisited"]}</div>
                              </div>);

    displayedVisits.push(visit["TimeVisited"])
                        
  }

  useEffect(() => {

    if (parseInt(id) !== loggedInUserInfo["UserID"]){
      navigate("/")
    }


    let userJSON = {"VisitedUserID": loggedInUserInfo["UserID"]}
    axios.post('http://localhost:5000/getVisits', userJSON ,{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      let visitsList = res.data
      setVisits(visitsList)
    })
  }, [])

  return (
    <div>
      {<div id="portfolios">
        <div style={{height: "20px"}}></div>
        <h1>Portfolio Views</h1>
        {loggedInUserInfo.hasOwnProperty("UserID") && <Form>
          <Button style={{margin: "0px 5px"}} onClick={navigateList} >Portfolios List</Button>
          <Button style={{margin: "0px 5px"}} onClick={logout}>Log Out</Button>
          </Form>}
        {visitsListComponents}
      </div>}
    </div>
  );
}

export default VisitList;
