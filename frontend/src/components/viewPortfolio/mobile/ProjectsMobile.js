import React from "react";
import NavigationMobile from "./NavigationMobile";
import GrantPreview from "../../resources/projectImages/grant-tracking-preview.png" // remove import after using database
import SortingPreview from "../../resources/projectImages/sorting-visualizer-preview.png" // remove import after using database
import OscopePreview from "../../resources/projectImages/oscope-preview.png" // remove import after using databaseimport "./PageMobile.css"

function ProjectsMobile({portfolio, userId}) {

  var projectElements = []


  if (portfolio["ProjectOneTitle"] !== null) {
    projectElements.push(
    <a href={portfolio["ProjectOneLink"]} target="_blank" rel="noopener noreferrer">
    <div key={1} className="project-mobile">
      <img
        className="project-image-mobile" // Update to use pictures
        src={GrantPreview}
        alt=""
      />
      <div className="project-description-mobile">
        <h6 className="project-title-mobile" >{portfolio["ProjectOneTitle"]}</h6>
        <p>{portfolio["ProjectOneDescription"]}</p>
      </div>
    </div>
    </a>
    )
  }

  if (portfolio["ProjectTwoTitle"] !== null) {
    projectElements.push(
    <a href={portfolio["ProjectTwoLink"]} target="_blank" rel="noopener noreferrer">
    <div key={1} className="project-mobile">
      <img
        className="project-image-mobile" // Update to use pictures
        src={SortingPreview}
        alt=""
      />
      <div className="project-description-mobile">
        <h6 className="project-title-mobile" >{portfolio["ProjectTwoTitle"]}</h6>
        <p>{portfolio["ProjectTwoDescription"]}</p>
      </div>
    </div>
    </a>
    )
  }

  if (portfolio["ProjectThreeTitle"] !== null) {
    projectElements.push(
    <a href={portfolio["ProjectThreeLink"]} target="_blank" rel="noopener noreferrer">
    <div key={1} className="project-mobile">
      <img
        className="project-image-mobile" // Update to use pictures
        src={OscopePreview}
        alt=""
      />
      <div className="project-description-mobile">
        <h6 className="project-title-mobile" >{portfolio["ProjectThreeTitle"]}</h6>
        <p>{portfolio["ProjectThreeDescription"]}</p>
      </div>
    </div>
    </a>
    )
  }

  return (
    <div>
      <NavigationMobile portfolio={portfolio} userId={userId}/>
      <div className="page-mobile">
        <h5>Projects</h5>
        <div>
          {projectElements}
        </div>
      </div>
    </div>
  );
}

export default ProjectsMobile;
