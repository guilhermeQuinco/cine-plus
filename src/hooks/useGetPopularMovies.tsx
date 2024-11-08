"use client";

import { axiosInstance } from "@/app/api/api";
import { IMovie } from "@/models/IMovie";
import { useEffect, useState } from "react";

export function useGetPopularMovies() {
  const [popularMovies, setPopularMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/movie/popular", {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
        },
      })
      .then((response) => {
        setPopularMovies((prev) => [...prev, ...response.data.results]);
      });
  }, []);

  return { popularMovies };
}
