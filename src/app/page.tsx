"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { axiosInstance } from "./api/api";

interface IMovie {
  id: number;
  title: string;
  poster_path: string;
}

const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500";
export default function Home() {
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    axiosInstance.get("/movie/top_rated").then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  return (
    <div className="grid  grid-cols-6 gap-5">
      {movies?.map((item, index) => (
        <div className="relative">
          {" "}
          <img
            src={`${BASE_IMG_URL}/${item.poster_path}`}
            alt="poster"
            className="object-cover w-[100%] h-[450px]"
          />
        </div>
      ))}
    </div>
  );
}
