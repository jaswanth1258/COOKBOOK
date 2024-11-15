import axios from "axios";
import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";
import { json, useLoaderData, useNavigate } from "react-router-dom";

export function loader({ params }) {
  const id = params.id;
  const str = `http://localhost:4000/api/recipes/${id}`;
  return axios.get(str);
}
function EditRecipe() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [url_, setUrl] = useState("");
  const [stat, setStat] = useState("");
  const [procedure_, setProcedure] = useState("");
  const [ingredients_, setIngredients] = useState([]);
  const [temp, setTemp] = useState("");
  const [submit, setSubmit] = useState(false);
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   setSubmit((val) => val ^ 1);
  // };
  const loaderData = useLoaderData();
  useEffect(() => {
    console.log(loaderData);
    window.scrollTo(0, 0);
    setName(loaderData.data.Name);
    setUrl(loaderData.data.url);
    setStat(loaderData.data.type);
    setProcedure(loaderData.data.procedure);
    setIngredients(loaderData.data.ingredients);
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const temp = async () => {
      axios
        .patch(
          `http://localhost:4000/api/recipes/edit/${loaderData.data._id}`,
          {
            Name: name,
            url: url_,
            type: stat,
            ingredients: ingredients_,
            procedure: procedure_,
          }
        )
        .then(() => {
          nav(`/recipe/${loaderData.data._id}`, { replace: true });
          // console.log(res);
        });

      console.log({
        Name: name,
        url: url_,
        type: stat,
        ingredients: ingredients_,
        procedure: procedure_,
      });
    };
    temp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {}, []);
  // return (
  //   <>
  //     <p>Recipe Edit page</p>
  //   </>
  // );
  return (
    <Fade bottom className="">
      <button className="self-start ml-[3.5%] mb-[2%]" onClick={() => nav(-1)}>
        ← Back
      </button>
      <div className="self-start ml-[3.5%] mb-[2%] text-3xl font-serif">
        Enter the Details
      </div>
      <div className="flex items-center justify-center ">
        <div className="w-[90%] bg-white h-fit  shadow-xl  rounded-xl">
          <form className="flex flex-col  h-full items-start justify-between p-5 font-serif">
            <div className="mb-5">
              <p htmlFor="Name" className="ml-5 m-4 text-2xl ">
                Name of the Dish
              </p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-[425%] mx-4 h-16 rounded-xl border-[1px] px-4 text-xl text-start border-black"
                placeholder="Enter the name"
                name="Name"
              />
            </div>

            <div className="mb-7">
              <p htmlFor="url" className="ml-5 m-4 text-2xl">
                Image Url
              </p>
              <input
                type="text"
                value={url_}
                onChange={(e) => setUrl(e.target.value)}
                className="w-[425%] mx-4 h-16 rounded-xl border-[1px] px-4 text-xl text-start border-black"
                placeholder="Enter the Url"
                name="url"
              />
            </div>

            <div className="mb-7">
              <p htmlFor="Veg" className="ml-5 m-4 text-2xl">
                Cusine or Type
              </p>
              <input
                type="text"
                value={stat}
                onChange={(e) => setStat(e.target.value)}
                className="w-[425%] mx-4 h-16 rounded-xl border-[1px] px-4 text-xl text-start border-black"
                placeholder="Enter the Option"
                name="Veg"
              />
            </div>

            <div className="mb-7">
              <p htmlFor="Ingredients" className="ml-5 m-4 text-2xl">
                Ingredients
              </p>
              <textarea
                type="text"
                value={ingredients_}
                onChange={(e) => setIngredients(e.target.value)}
                className="w-[413%] mx-4 h-16  rounded-xl border-[1px] px-4 pt-4 text-xl text-start border-black "
                placeholder="Enter the Ingredients"
                name="Ingredients"
              />
            </div>

            <div className="mb-7">
              <p htmlFor="Procedure" className="ml-5 m-4 text-2xl">
                Cooking Procedure
              </p>
              <textarea
                type="text"
                value={procedure_}
                onChange={(e) => setProcedure(e.target.value)}
                className="w-[413%] mx-4 h-16 rounded-xl border-[1px] px-4 pt-4 text-xl text-start border-black"
                placeholder="Enter the Cooking Procedure"
                name="Procedure"
              />
            </div>

            <button
              // type="submit"
              onClick={handleSubmit}
              className="ml-4 w-[200px] inline-block px-2 py-2 mt-2 text-white bg-blue-600 rounded-xl hover:bg-blue-700 "
            >
              Proceed
            </button>
          </form>
        </div>
      </div>
    </Fade>
  );
}

export default EditRecipe;
