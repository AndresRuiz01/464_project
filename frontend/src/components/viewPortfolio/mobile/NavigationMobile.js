import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import NavigateBack from '../../resources/back_arrow.png'
import './NavigationMobile.css'

function NavigationMobile({portfolio, userId}) {

  const aboutPageLink = `/${userId}/view/about`
  const projectsLink = `/${userId}/view/projects`
  const resumeLink = `/${userId}/view/resume`

  const navigate = useNavigate()

  function navigateList() {
    navigate("/portfolios")
  }

  return (
    <div>
       <div id="mobile-nav-bar">
       <img onClick={navigateList} id="navigate-back-mobile" src={NavigateBack}></img>
        <h5 id="name-heading-mobile">{portfolio["FirstName"]}</h5>
        <nav>
          {portfolio["AboutSection"] != null && <NavLink className="nav-link-mobile" to={aboutPageLink}>About Me</NavLink>}
          {portfolio["ProjectOneTitle"] != null && <NavLink className="nav-link-mobile" to={projectsLink}>Projects</NavLink>}
          {portfolio["ResumeLink"] != null && <NavLink className="nav-link-mobile" to={resumeLink}>Resume</NavLink>}
        </nav>
      </div>
    </div>
  );
}

export default NavigationMobile;
