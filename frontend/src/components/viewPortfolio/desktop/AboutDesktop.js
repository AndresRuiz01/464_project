import React from "react";
import NavigationDesktop from "./NavigationDesktop";
import "./PageDesktop.css"
// import "./PageMobile.css"


function AboutDesktop({portfolio, userId}) {

  return (
    <div>
      <NavigationDesktop portfolio={portfolio} userId={userId} />
      <div className="page">
        <h1>About Me</h1>
        <div className="page-content">
          <div id="about-section">{portfolio["AboutSection"]}</div>
        </div>
      </div>
    </div>
  );
}

export default AboutDesktop;
