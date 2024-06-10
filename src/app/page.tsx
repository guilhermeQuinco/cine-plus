"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { axiosInstance } from "./api/api";

const api_key = process.env.API_KEY || "";

interface IMovie {
  id: number;
  title: string;
  poster_path: string;
}

const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500";
export default function Home() {
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    axiosInstance
      .get(
        `/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=10`
      )
      .then((response) => {
        setMovies(response.data.results);
      });
  }, []);

  return (
    <div className="bg-gray-800 w-full">
      <div className="grid max-w-[1640px] mx-auto  grid-cols-6 gap-8 p-5 ">
        {movies?.map((item, index) => (
          <div className="relative" key={index}>
            <img
              src={`${BASE_IMG_URL}/${item.poster_path}`}
              alt="poster"
              className="object-cover w-[100%] h-[380px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
