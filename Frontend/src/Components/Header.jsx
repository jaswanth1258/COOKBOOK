import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Fade } from "react-reveal";
import { Link, useLoaderData } from "react-router-dom";
import { requireAuth, validate } from "../../utils";


export function loader()
{
  return validate();
}

function Header() {
  const [show, setShow] = useState(false);
  const val=useLoaderData();
  const t = () => {
    setShow((show) => show ^ 1);
  };
  useEffect(() => {}, []);
  return (
    <Fade top>
      <div className="flex justify-between px-[50px] py-8">
        <Link to="" className="font-serif text-xl">
          COOKBOOK
        </Link>
        <div className="flex gap-x-20 font-serif  text-lg">
          <div className="flex gap-x-6">
            <Link to="/byrecipe">Recipe by Name</Link>
            <Link to="/byingredient">Recipe by Ingredients</Link>
          </div>
          {val? (
            <Link to="/profile" className="">
              Profile
            </Link>
          ) : (
            <Link to="/login" className="" onClick={t}>
              Login/Sign Up
            </Link>
          )}
        </div>
      </div>
    </Fade>
  );
}

export default Header;
