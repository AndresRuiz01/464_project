import React from "react";
import NavigationMobile from "./NavigationMobile";
import "./PageMobile.css"


function AboutMobile({portfolio, userId}) {

  return (
    <div>
      <NavigationMobile portfolio={portfolio} userId={userId} />
      <div className="page-mobile">
        <h5>About Me</h5>
        <div className="about-mobile">{portfolio["AboutSection"]}</div>
      </div>
    </div>
  );
}

export default AboutMobile;
