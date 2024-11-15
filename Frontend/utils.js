// import store from "./store/store";
import { redirect } from "react-router-dom";

export async function requireAuth() {
  const isLoggedIn = localStorage.getItem("userId");
  // const state = store.getState();
  // const isLoggedIn = state.auth.isLoggedIn;

  if (!isLoggedIn) {
    throw redirect("/login");
  } else {
    return true;
  }
}

export async function validate() {
  const isLoggedIn = localStorage.getItem("userId");
  // const state = store.getState();
  // const isLoggedIn = state.auth.isLoggedIn;

  if (!isLoggedIn) {
    return false;
  } else {
    return true;
  }
}
