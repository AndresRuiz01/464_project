import React from "react";

import NavigationDesktop from "./NavigationDesktop";
import "./PageDesktop.css"

function ResumeDesktop({portfolio, userId}) {

  return (
    <div>
      <NavigationDesktop portfolio={portfolio} userId={userId} />
      {portfolio["ResumeLink"] != null && <div className="page">
        <h1>Resume</h1>
        <iframe id="resume-document" src={portfolio["ResumeLink"]} title="Resume" frameBorder="0" scrolling="no"></iframe>
      </div>}
    </div>
  );
}

export default ResumeDesktop;
