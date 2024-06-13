"use client";

import { axiosInstance } from "@/app/api/api";
import Card from "@/components/card";
import Loading from "@/components/loading";
import { IMovie } from "@/models/IMovie";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Search = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [title, setTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const searchParams = useSearchParams();
  const loader = useRef(null);

  useEffect(() => {
    setTitle(params.id.toString());

    try {
      setIsLoading(true);
      axiosInstance
        .get(`/search/multi`, {
          params: {
            api_key: process.env.NEXT_PUBLIC_API_KEY,
            query: params.id.toString(),
            page: currentPage,
          },
        })
        .then((response) => {
          setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  }, [params.id, currentPage]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) setCurrentPage((prevPage) => prevPage + 1);
    });

    if (loader.current) return observer.observe(loader.current);
  }, []);

  return (
    <div className="bg-gray-800  w-full pt-[100px]">
      <div className="max-w-[1640px] mx-auto flex flex-col gap-10">
        <span>Resultados para "{title}"</span>
        <div className="grid grid-cols-6 gap-5  ">
          {movies?.map((movie) => (
            <Card movie={movie} key={movie.id} />
          ))}
        </div>
        <div className="w-full flex justify-center">
          {isLoading && <Loading />}
        </div>
        <div ref={loader} />
      </div>
    </div>
  );
};

export default Search;
