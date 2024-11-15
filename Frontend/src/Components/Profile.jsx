import React, { useEffect, useState } from "react";
import Card from "./Card";
import Horizontal_card from "./Horizontal_card";
import { Link, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/store";
import axios from "axios";
import { requireAuth } from "../../utils";
// eslint-disable-next-line react-refresh/only-export-components
export function loader() {
  if (requireAuth()) {
    return axios.post("http://localhost:4000/api/users/userRecipes", {
      // return axios.post("https://dbms-project-e4a5.onrender.com/api/users/userRecipes", {
      _id: localStorage.getItem("userId"),
    });
  } else {
    throw redirect("/login");
  }
}
function Profile() {
  const user = useLoaderData().data.user;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isRecipes, setIsRecipes] = useState(false);
  const [recipes, setRecipes] = useState([]);
  // const [user, setUser] = useState({});
  const logout = async () => {
    dispatch(authActions.logout());
    localStorage.removeItem("userId");
    navigate("/login");
    // window.location.reload();
  };
  useEffect(() => {
    console.log(user);
    if (user.recipes.length > 0) {
      setIsRecipes(true);
    }
  }, []);
  useEffect(() => {
    const hasReloaded = localStorage.getItem("profile");
    localStorage.removeItem("login");
    if (!hasReloaded) {
      // Reload the page only once
      localStorage.setItem("profile", "true");
      window.location.reload();
    }
  }, []);

  // useEffect(() => {
  //   const temp = async () => {
  //     setLoading(true);
  //     const res = await axios.post(
  //       "http://localhost:4000/api/users/userRecipes",
  //       {
  //         _id: localStorage.getItem("userId"),
  //       }
  //     );
  //     setUser(res.data.user);
  //     setRecipes(res.data.user.recipes);
  //     if (res.data.user.recipes.length > 0) {
  //       setIsRecipes(true);
  //     }
  //     // console.log(res);
  //     setLoading(false);
  //   };
  //   console.log(vals);
  //   temp();
  // }, []);

  const nav = useNavigate();
  return (
    <>
      <div className="flex flex-col ">
        <button
          className="self-start ml-[3.5%] mb-[2%]"
          onClick={() => nav(-1)}
        >
          ← Back
        </button>
        <div className="flex m-3 justify-center">
          <img
            src={user.url}
            className="h-[450px] w-[500px] rounded-lg shadow-lg"
          />
          <div className="mr-[450px] self-center p-10 text-3xl font-serif ">
            <h1 className=" mb-3">{user.name}</h1>
            <h1 className=" mt-3 mb-3">{user.userName}</h1>
            <h1>{user.email}</h1>
          </div>
        </div>
        <hr className="w-[80%] self-center " />
        <div className="self-center">
          {isRecipes
            ? user.recipes.map((data) => {
                return (
                  <Horizontal_card
                    key={data._id}
                    name={data.Name}
                    val={data._id}
                    url={data.url}
                  />
                );
              })
            : null}
          <div className="flex justify-between mt-5">
            <Link
              to="/addrecipe"
              className="bg-green-500 px-5 py-3 text-white rounded-xl ml-5 "
            >
              Add Recipe
            </Link>
            <button
              className="bg-red-500 px-4 mx-14 py-3 text-white rounded-xl"
              onClick={logout}
            >
              SignOut
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
