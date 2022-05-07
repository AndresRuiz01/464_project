import React from "react";
import NavigationDesktop from "./NavigationDesktop";
import GrantPreview from "../../resources/projectImages/grant-tracking-preview.png" // remove import after using database
import SortingPreview from "../../resources/projectImages/sorting-visualizer-preview.png" // remove import after using database
import OscopePreview from "../../resources/projectImages/oscope-preview.png" // remove import after using database

import "./PageDesktop.css"

function ProjectsDesktop({portfolio, userId}) {

  var projectElements = []

  if (portfolio["ProjectOneTitle"] !== null) {
    projectElements.push(
    <a href={portfolio["ProjectOneLink"]} target="_blank" rel="noopener noreferrer">
    <div key={1} className="project">
      <img
        className="project-image" // Update to use pictures
        src={GrantPreview}
        alt=""
      />
      <div className="project-description">
        <h4>{portfolio["ProjectOneTitle"]}</h4>
        <p>{portfolio["ProjectOneDescription"]}</p>
      </div>
    </div>
    </a>
    )
  }
  if (portfolio["ProjectTwoTitle"] !== null) {
    projectElements.push(
      <a href={portfolio["ProjectTwoLink"]} target="_blank" rel="noopener noreferrer">
        <div key={2} className="project">
          <img
            className="project-image" // Update to use pictures
            src={SortingPreview}
            alt=""
          />
          <div className="project-description">
            <h4>{portfolio["ProjectTwoTitle"]}</h4>
            <p>{portfolio["ProjectTwoDescription"]}</p>
          </div>
        </div>
      </a>)
  }

  if (portfolio["ProjectThreeTitle"] !== null) {
    projectElements.push(
      <a href={portfolio["ProjectThreeLink"]} target="_blank" rel="noopener noreferrer">
        <div key={3} className="project">
          <img
            className="project-image" // Update to use pictures
            src={OscopePreview}
            alt=""
          />
          <div className="project-description">
            <h4>{portfolio["ProjectThreeTitle"]}</h4>
            <p>{portfolio["ProjectThreeDescription"]}</p>
          </div>
        </div>
      </a>)
  }

  return (
    <div>
      <NavigationDesktop portfolio={portfolio} userId={userId}/>
      <div className="page">
        <h1>Projects</h1>
        <div id="project-list">
          {projectElements}
        </div>
      </div>
    </div>
  );
}

export default ProjectsDesktop;
