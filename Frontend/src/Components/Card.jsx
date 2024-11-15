import React, { useEffect } from "react";
import Fade from "react-reveal";
import { Link } from "react-router-dom";

function Card(prop) {
  useEffect(() => {
    console.log(prop);
  }, []);
  const link_to = `/recipe/${prop.val}`;
  return (
    <Link to={link_to} key={prop.Name}>
      <Fade bottom className=" rounded-3xl ">
        <div className=" h-[300px] border-black  w-[500px] m-3 rounded-3xl ">
          <img src={prop.url} className="h-3/4 w-3/4 rounded-3xl shadow-lg" />
          <div className="p-4">
            <p className="font-serif text-lg"> {prop.Name}</p>
            <p className="font-serif text-md">{prop.ty}</p>
          </div>
        </div>
      </Fade>
    </Link>
  );
}

export default Card;
