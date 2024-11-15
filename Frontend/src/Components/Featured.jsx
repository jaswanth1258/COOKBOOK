import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";

export function loader() {
  return axios.get("http://localhost:4000/api/recipes/");
}

function Featured() {
  const [recipes, setRecipe] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const recipe = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/api/recipes/");
   
      console.log(res.data.recipes);
      setRecipe(res.data.recipes);
      setLoading(false);
    };
    recipe();
  }, []);
  return (
    <>
      <div className="flex items-center justify-center ml-20">
        <div className="grid grid-cols-3 self-center">
          {recipes.map((data) => (
            <Card
              key={data._id}
              Name={data.Name}
              url={data.url}
              val={data._id}
              ty={data.type}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Featured;

{
  /* <div className="flex items-center justify-center ml-20 ">
  <div className="grid grid-cols-3 self-center ">
    {recipes.map((data) => {
      <p>{data.Name}</p>;
      <Card name={data.Name} />;
    })}
    {/* <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card /> 
          </div>
        </div>; */
}
