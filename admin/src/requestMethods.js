import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const persistedData = localStorage.getItem("persist:root");
const currentUserToken = persistedData ? JSON.parse(JSON.parse(persistedData).user)?.currentUser?.accessToken : null;
const TOKEN = currentUserToken || ""; // Set a default value if the token is not available

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
