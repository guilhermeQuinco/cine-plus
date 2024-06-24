"use client";

import { axiosInstance } from "@/app/api/api";
import { IMovie } from "@/models/IMovie";
import { useEffect, useState } from "react";

export function useGetTopRatedMovies() {
  const [topRatedMovies, setTopRatedMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/movie/top_rated", {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
        },
      })
      .then((response) => {
        setTopRatedMovies((prev) => [...prev, ...response.data.results]);
      });
  }, []);

  return { topRatedMovies };
}
