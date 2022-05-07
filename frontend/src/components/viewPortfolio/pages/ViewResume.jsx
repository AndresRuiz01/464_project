import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import ResumeDesktop from "../desktop/ResumeDesktop";
import ResumeMobile from "../mobile/ResumeMobile";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  if(width < 1250) {
    return false
  }
  return true
}

function ViewResume({portfolio, userId, setUserId}) {
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
      {isDesktop && <ResumeDesktop portfolio={portfolio} userId={userId} />}
      {!isDesktop && <ResumeMobile portfolio={portfolio} userId={userId} />}
    </div>
  );
}

export default ViewResume;
