import React, { useEffect, useState } from "react";
import Featured from "./Featured";
import { Bounce, Fade } from "react-reveal";
import axios from "axios";
import Card from "./Card";

function ByIngredient() {
  const [text, setText] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    let arr = text.split(",");
    arr = arr.map((str) => str.trim());
    setIngredients(arr);
    setSubmit((val) => val ^ 1);
  };
  useEffect(() => {
    const temp = async () => {
      setLoading(true);
      console.log(ingredients);
      const res = await axios.post(
        "http://localhost:4000/api/recipes/ingredient",
        // "https://dbms-project-e4a5.onrender.com/api/recipes/ingredient",
        {
          ingredient: ingredients,
        }
      );
      console.log(res.data);
      setRecipes(res.data);
      setLoading(false);
      setSubmit(false);
    };

    temp();
  }, [submit]);
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center m-10 gap-x-2 fade-up-element "
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="shadow-lg w-1/2 p-3 pl-5 text-lg rounded-lg border-[1px] border-gray-300 "
          placeholder="   🔍  Enter the Ingredients"
          name="temp_val"
        />
      </form>
      {submit || recipes ? (
        <>
          <div className="grid grid-cols-3 self-center ml-10">
            {recipes.map((data) => {
              return (
                <Card
                  key={data._id}
                  Name={data.Name}
                  url={data.url}
                  val={data._id}
                  ty={data.type}
                />
              );
            })}
          </div>
        </>
      ) : (
        <div className="h-[200px]"></div>
      )}4
      <div className="h-[330px]"></div>
    </>
  );
}

export default ByIngredient;
