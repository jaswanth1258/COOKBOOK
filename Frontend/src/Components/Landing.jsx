import React, { useEffect } from "react";
import Featured from "./Featured";
import Special from "./Special";
function Landing() {
  
    useEffect(()=> window.scrollTo(0, 0),[])
  return (
    <div className="flex flex-col gap-10  items-center ">
      <Special />
      <Featured />
      {/* <Featured /> */}
    </div>
  );
}

export default Landing;
