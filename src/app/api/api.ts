import axios from "axios";

const BASE_URL = `https://api.themoviedb.org/3`;

const token = process.env.TOKEN || "";

export const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 5000,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});
