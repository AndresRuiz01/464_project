import React, {useEffect, useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';

import "./PortfoliosList.css";

function PortfoliosList({setUserId, loggedInUserInfo, setLoggedInUserInfo}) {

  const navigate = useNavigate()

  function logout() {
    setLoggedInUserInfo({})
    navigate('/')
  }

  function navigateLogin() {
    navigate('/')
  }

  function navigateVisits() {
    navigate(`/${loggedInUserInfo["UserID"]}/views`)
  }

  function navigateEditor() {
    navigate(`/${loggedInUserInfo["UserID"]}/editor`)
  }

  function navigateView() {
    navigate(`/${loggedInUserInfo["UserID"]}/view/about`)
  }

  const [portfoliosList, setPortfoliosList] = useState([])

  let portfolioListComponents = []

  let hasPortfolio = false

  if (loggedInUserInfo["UserID"] in portfoliosList) {
    hasPortfolio = true
  }

  let i = 0

  let colors = ["white", "grey"]

  for(let portfolio in portfoliosList) {
    const userPortfolio = portfoliosList[portfolio];
    
    let portfolioNavLink = `/${portfolio}/view/about`

    let compClassName = `portfolio-info ${colors[i % 2]}`

    portfolioListComponents.push(<NavLink key={portfolio} className='nav-link' to={portfolioNavLink}>
                                    <div className={compClassName}>
                                        <div className="portfolio-item">
                                          <span>{userPortfolio["FirstName"]}</span>
                                          <span style={{width: "5px"}}></span>
                                          <span>{userPortfolio["LastName"]}</span>
                                        </div>
                                        <div className="portfolio-item">{userPortfolio["Occupation"]}</div>
                                    </div>
                                  </NavLink>);
                        
    i += 1
  }

  useEffect(() => {
    let blankInfo = {}
    axios.post('http://localhost:5000/getAllPortfolioUsers', blankInfo ,{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      let portfoliosList = res.data
      setPortfoliosList(portfoliosList)
    })
  }, [])

  return (
    <div>
      {<div id="portfolios">
        <div style={{height: "20px"}}></div>
        <h1>Portfolios</h1>
        {loggedInUserInfo.hasOwnProperty("UserID") && <Form>
          {hasPortfolio && <Button style={{margin: "0px 5px"}} onClick={navigateEditor} >Edit Portfolio</Button>}
          {hasPortfolio && <Button style={{margin: "0px 5px"}} onClick={navigateView}>View My Portfolio</Button>}
          {hasPortfolio && <Button style={{margin: "0px 5px"}} onClick={navigateVisits}>Portfolio Views</Button>}
          {!hasPortfolio && <Button style={{margin: "0px 5px"}} onClick={navigateEditor}>Create Portfolio</Button>}
          {/* TODO: ADD LOGOUT FUNCTIONALITY */}
          <Button style={{margin: "0px 5px"}} onClick={logout}>Log Out</Button>
          </Form>}
        {!loggedInUserInfo.hasOwnProperty("UserID") && <Button style={{margin: "0px 5px"}} onClick={navigateLogin}>Log In</Button>}
        {portfolioListComponents}
      </div>}
    </div>
  );
}

export default PortfoliosList;
