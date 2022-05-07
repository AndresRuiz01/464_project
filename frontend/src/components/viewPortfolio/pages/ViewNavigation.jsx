import React, {useEffect, useState} from "react";

import NavigationDesktop from "../desktop/NavigationDesktop";
import NavigationMobile from "../mobile/NavigationMobile";

import { useParams } from "react-router-dom";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  if(width < 1250) {
    return false
  }
  return true
}

function ViewNavigation({portfolio, setUserId, userId}) {

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
      {isDesktop && <NavigationDesktop portfolio={portfolio} userId={userId} />}
      {!isDesktop && <NavigationMobile portfolio={portfolio} userId={userId} />}
    </div>
  );
}

export default ViewNavigation;
