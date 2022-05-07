import React from "react";
import NavigationMobile from "./NavigationMobile";
import "./PageMobile.css"

function ResumeMobile({portfolio, userId}) {

  return (
    <div>
      <NavigationMobile portfolio={portfolio} userId={userId}/>
      <div className="page-mobile">
        <h5>Resume</h5>
        <iframe id="resume-document-mobile" src={portfolio["ResumeLink"]} title="Resume" frameBorder="0" scrolling="no"></iframe>
      </div>
    </div>
  );
}

export default ResumeMobile;
