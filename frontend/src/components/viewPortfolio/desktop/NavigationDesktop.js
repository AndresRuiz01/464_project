import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import './NavigationDesktop.css'

import LinkedInIcon from '../../resources/contactIcons/linkedin-icon.png'
import GithubIcon from '../../resources/contactIcons/github-icon.png'
import EmailIcon from '../../resources/contactIcons/email-icon.png'
import NavigateBack from '../../resources/back_arrow.png'



function NavigationDesktop({portfolio, userId}) {

  const navigate = useNavigate();

  function navigateList() {
    navigate("/portfolios")
  }

  const aboutPageLink = `/${userId}/view/about`
  const projectsLink = `/${userId}/view/projects`
  const resumeLink = `/${userId}/view/resume`

  let isPortfolioLink = portfolio["ProjectOneTitle"]

  return (
    <div>
    <img onClick={navigateList} id="navigate-back" src={NavigateBack}></img>
    <div id="sidebar-design">
      <nav>
        <div id="sidebar">
          <div id="heading">
            <h3 id="name-heading">{portfolio["FirstName"]} {portfolio["LastName"]}</h3>
            <h6 id="name-heading" style={{color: "#0087ca"}}>{portfolio["Occupation"]}</h6>
          </div>
          <div style={{height: '20vh'}}></div>
          <ul className="navigation">
              {portfolio["AboutSection"] != null && <li className="navigation-item">
                <NavLink className='nav-link' to={aboutPageLink}>About Me</NavLink>
              </li>}
              <li className="nav-space"></li>
              {portfolio["ProjectOneTitle"] != null && <li className="navigation-item">
                <NavLink className="nav-link" to={projectsLink}>Projects</NavLink>
              </li>}
              <li className="nav-space"></li>
              {portfolio["ResumeLink"] != null && <li className="navigation-item">
                <NavLink className="nav-link" to={resumeLink}> Resume </NavLink>
              </li>}
          </ul>
        </div>
      </nav>
      <div id="nav-icons">
        {portfolio["GithubLink"] != null && <a href={portfolio["GithubLink"]} rel="noopener noreferrer" target="_blank">
          <img className="nav-icon" src={GithubIcon} width="40px" alt="GitHub"></img>    
        </a>}
        {portfolio["LinkedInLink"] != null && <a href={portfolio["LinkedInLink"]} rel="noopener noreferrer" target="_blank">
          <img className="nav-icon" src={LinkedInIcon} width="40px" alt="LinkedIn"></img>  
        </a>}
        {portfolio["Email"] != null && <a href={`mailto:${portfolio["Email"]}`} rel="noopener noreferrer" target="_blank">
          <img className="nav-icon" src={EmailIcon} width="40px" alt="Email"></img>    
        </a>}
      </div>
    </div>
  </div>
  );
}

export default NavigationDesktop;
