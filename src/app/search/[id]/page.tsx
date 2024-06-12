"use client";

import { axiosInstance } from "@/app/api/api";
import Card from "@/components/card";
import { IMovie } from "@/models/IMovie";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Search = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);

  const params = useParams();
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchValue = params.id;
    const page = searchParams.get("page");

    axiosInstance
      .get(`/search/multi`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          query: searchValue,
          page,
        },
      })
      .then((response) => {
        setMovies(response.data.results);
        console.log(response.data);
      });
  }, [searchParams.get("page"), params.id]);

  return (
    <div className="bg-gray-800  w-full pt-[100px]">
      <div className="max-w-[1640px] mx-auto flex flex-col gap-10 items-center">
        <div className="grid grid-cols-6 gap-5  ">
          {movies?.map((movie) => (
            <Card movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
