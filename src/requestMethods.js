import axios from "axios";
const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWI5ZjIxNjNhNjIyMzA4YmE5MmM3MSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MDA3NjU0MDYsImV4cCI6MTcwMTAyNDYwNn0.dwqpu_yFj1pqRWwpDR8YBqe_FHDWDMNrXG7vnDGUXmU"


export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header:{token:`Bearer ${TOKEN} `},
});