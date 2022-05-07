import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import AboutDesktop from "../desktop/AboutDesktop";
import AboutMobile from "../mobile/AboutMobile";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  if(width < 1250) {
    return false
  }
  return true
}


function ViewAbout({portfolio, setUserId, userId}) {

  const [isDesktop, setIsDesktop] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setIsDesktop(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { id } = useParams();
  setUserId(id)

  return (
    <div>
      {isDesktop && <AboutDesktop portfolio={portfolio} userId={userId} />}
      {!isDesktop && <AboutMobile portfolio={portfolio} userId={userId} />}
    </div>
  );
}

export default ViewAbout;
