import { BASE_URL } from "@/utils";
import axios from "axios";

const token = process.env.TOKEN || "";

export const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 5000,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});
