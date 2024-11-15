import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Horizontal_card(props) {
  const link_to = `/recipe/${props.val}`;

  const nav = useNavigate();
  // console.log(props);
  const [name, setName] = useState("");
  useEffect(() => {
    setName(props.name);
    console.log(name);
  }, []);
  const delete_recipe = async () => {
    const res = await axios.post("http://localhost:4000/api/recipes/delete", {
      Name: name,
    });
    console.log(res);
    nav("/profile");
  };
  return (
    <>
      <div className="bg-orange-50 w-[1200px] h-[100px] m-4 rounded-xl flex items-center justify-around font-serif shadow-lg">
        <img
          src={props.url}
          alt=""
          className="rounded-full h-[75px] "
        />
        <Link to={link_to} key={props.name} className="text-2xl">
          {props.name}
        </Link>
        <div className="flex gap-x-20">
          <Link
            className="bg-green-500 px-5 py-2 text-white rounded-xl "
            to={`/recipe/edit/${props.val}`}
          >
            Edit
          </Link>
          <button
            className="bg-red-500 px-5 py-2 text-white rounded-xl "
            onClick={delete_recipe}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default Horizontal_card;
