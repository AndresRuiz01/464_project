import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import ProjectsDesktop from "../desktop/ProjectsDesktop";
import ProjectsMobile from "../mobile/ProjectsMobile";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  if(width < 1250) {
    return false
  }
  return true
}

function ViewProjects({portfolio, userId, setUserId}) {

  const [isDesktop, setIsDesktop] = useState(getWindowDimensions());

  const { id } = useParams();
  setUserId(id)

  useEffect(() => {
    function handleResize() {
      setIsDesktop(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {isDesktop && <ProjectsDesktop portfolio={portfolio} userId={userId}/>}
      {!isDesktop && <ProjectsMobile portfolio={portfolio} userId={userId} />}
    </div>
  );
}

export default ViewProjects;
