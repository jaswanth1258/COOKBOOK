import axios from "axios";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
} from "react-router-dom";

import React, { useEffect, useState } from "react";
import Landing from "./Components/Landing";
import ByRecipe from "./Components/ByRecipe";
import ByIngredient from "./Components/ByIngredient";
import Layout from "./Components/Layout";
import Login from "./Components/Login";
import Login_Signup from "./Components/Login_Signup";
import RecipeDisplay, {
  loader as RecipeLoader,
} from "./Components/RecipeDisplay";
import Profile, { loader as UserLoader } from "./Components/Profile";
import AddRecipe from "./Components/AddRecipe";
import { requireAuth } from "../utils";
import Featured from "./Components/Featured";
import { loader as HeaderLoader } from "./Components/Header";
import EditRecipe, { loader as EditLoader } from "./Components/EditRecipe";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} loader={HeaderLoader}>
      <Route index element={<Landing />} />
      <Route path="/byrecipe" element={<ByRecipe />} />
      <Route path="/byingredient" element={<ByIngredient />} />
      <Route path="/login" element={<Login_Signup />} />
      <Route
        path="/recipe/:id"
        element={<RecipeDisplay />}
        loader={RecipeLoader}
      />
      <Route
        path="/recipe/edit/:id"
        element={<EditRecipe />}
        loader={EditLoader}
      />
      <Route path="/featured" element={<Featured />} />
      <Route
        path="/profile"
        element={<Profile />}
        // loader={async ({ request }) => await requireAuth(request)}
        loader={UserLoader}
      />
      <Route
        path="/addrecipe"
        element={
          <AddRecipe loader={async ({ request }) => await requireAuth()} />
        }
      />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
