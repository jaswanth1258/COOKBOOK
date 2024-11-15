import axios from "axios";
import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

export function loader({ params }) {
  const id = params.id;
  const str = `http://localhost:4000/api/recipes/${id}`;
  // const str = `https://dbms-project-e4a5.onrender.com/api/recipes/${id}`;
  return axios.get(str);
}

function RecipeDisplay() {
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [procedure, setProcedure] = useState([]);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { id } = useParams();
  let vals = useLoaderData().data;

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(vals);

    // window.location.reload()
  });

  useEffect(() => {
    const hasReloaded = localStorage.getItem("hasReloaded");

    if (!hasReloaded) {
      // Reload the page only once
      localStorage.setItem("hasReloaded", "true");
      window.location.reload();
    }
    // console.log(vals.procedure[0].split("\n"));
  }, []);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   setLoading(true);
  //   const str = `http://localhost:4000/api/recipes/${id}`;
  //   const temp = async () => {
  //     const res = await axios.get(str);


  //     setRecipe(res.data);
  //     setIngredients(res.data.ingredients);
  //     setProcedure(res.data.procedure);
  //     setType(res.data.type);
  //   };
  //   temp();
  //   // console.log(recipe.Name);
  //   setLoading(false);
  // }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center font-serif ">
        <button
          className="self-start ml-[3.5%] mb-[2%]"
          onClick={() => nav(-1)}
        >
          ← Back
        </button>
        <Fade bottom className="flex justify-around items-center w-screen">
          <img
            // src="/photos/chicken_tikka.jpeg "
            src={vals.url}
            className="h-[600px] w-[75%]  rounded-2xl shadow-xl"
          />

          <div className="flex items-center justify-around gap-x-4 p-5 w-[75%] mt-5 mb-5 ">
            <div className="flex flex-col">
              <div className="flex items-center">
                <img src="../../photos/time.gif" className="h-[60px] mr-1 " />
                <p>5 min</p>
              </div>
              <p className="self-center text-lg ml-2">Prep Time</p>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <img
                  src="../../photos/total_time.gif"
                  className="h-[60px] mr-1 "
                />
                <p>20 min</p>
              </div>
              <p className="self-center text-lg ml-2">Total Time</p>
            </div>

            <div className="flex flex-col">
              <img src="../../photos/people.gif" className="h-[70px] mr-1 " />
              <div className="flex items-center">
                <p>5</p>
                <p className="self-center text-lg ml-1 ">-Servings</p>
              </div>
            </div>

            <div className="flex flex-col">
              <img src="../../photos/cal.gif" className="h-[70px] mr-1 " />
              <p className="self-center text-xl">500</p>
            </div>
          </div>

          <div className=" w-[75%] mt-3 mb-3">
            <div className="self-start">
              <p className=" text-3xl font-extrabold mb-2">
                {vals.Name.toUpperCase()}
              </p>
              <p className="text-xl font-semibold">
                {/* veg */}
                {vals.type.toUpperCase()}
              </p>
            </div>
          </div>

          <div className=" w-[75%]  mt-3 mb-3">
            <div className="self-start ">
              <h1 className="text-xl font-bold mt-3 mb-3">INGREDIENTS</h1>
              <>
                {vals.ingredients[0].split("\n").map((d, index) => {
                  return (
                    <div key={index}>
                      <p>{index + 1 + ". " + d.toUpperCase()}</p>
                    </div>
                  );
                })}

                {/* 1. 1 pound boneless chicken, cut into bite-sized pieces
                <br />
                2. 1 cup plain yogurt
                <br />
                3. 2 tablespoons ginger-garlic paste
                <br />
                4. 1 tablespoon red chili powder
                <br />
                5. 1 tablespoon turmeric powder
                <br />
                6. 1 tablespoon cumin powder
                <br />
                7. 1 tablespoon coriander powder
                <br />
                8. 1 tablespoon garam masala
                <br />
                9. 2 tablespoons lemon juice
                <br />
                10. 2 tablespoons vegetable oil
                <br />
                11. Salt to taste
                <br /> */}
              </>
            </div>
          </div>

          <div className=" w-[75%] mt-3 mb-3">
            <div className="self-start">
              <h1 className="text-xl font-bold mt-3 mb-3">PROCEDURE</h1>
              <>
                {vals.procedure[0].split("\n").map((d, index) => {
                  return (
                    <>
                      <p>{index + 1 + ". " + d.toUpperCase()}</p>
                    </>
                  );
                })}

                {/* 1. Gather ingredients including chicken, yogurt, spices, and
                lemon juice. <br />
                2. Prepare a spicy yogurt marinade by mixing ingredients in a
                bowl.
                <br />
                3. Coat chicken pieces with the marinade and refrigerate for at
                least 2 hours.
                <br />
                4. Preheat grill or oven to medium-high heat.
                <br />
                5. Soak wooden skewers if using.
                <br />
                6. Thread marinated chicken onto skewers.
                <br />
                7. Grill for 15-20 minutes, turning occasionally.
                <br />
                8. Baste chicken with oil or butter for moisture and flavor.
                <br />
                9. Check chickens internal temperature (165°F or 74°C).
                <br />
                10. Serve hot with your choice of accompaniments.
                <br /> */}
              </>
            </div>
          </div>
        </Fade>
      </div>
    </>
  );
}

export default RecipeDisplay;

// {vals.ingredients.map((d,index) => {
//   return (
//     <>
//       <p>{(index+1)+". " + d}</p>

//     </>
//   );

// })}
