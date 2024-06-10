"use client";

import { axiosInstance } from "@/app/api/api";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500";

interface IMovie {
  id: number;
  title: string;
  poster_path: string;
}

const Discover = () => {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [discover, setDiscover] = useState("");

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  useEffect(() => {
    // puxa o parametro
    const id = params.id.toString();

    //pega o valor do parametro
    const page = searchParams.get("page");

    console.log(page);

    setDiscover(id);
    switch (id) {
      case "now_playing":
        setTitle("Now playing Movies");
        break;

      case "top_rated":
        setTitle("Top Rated Movies");
        break;

      case "popular":
        setTitle("Popular Movies");
        break;

      case "upcoming":
        setTitle("Upcoming Movies");
        break;

      default:
        setTitle("");
        break;
    }

    axiosInstance
      .get(`/movie/${id}`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          page,
        },
      })
      .then((response) => {
        setMovies(response.data.results);
      });
  }, [params.id, searchParams.get("page")]);

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
};

export default Discover;
