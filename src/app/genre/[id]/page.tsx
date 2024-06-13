"use client";

import { axiosInstance } from "@/app/api/api";
import Card from "@/components/card";
import Loading from "@/components/loading";
import { IMovie } from "@/models/IMovie";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Genre = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [title, setTitle] = useState("");

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const loader = useRef(null);

  useEffect(() => {
    const id = params.id;
    const titleParam = searchParams.get("genre");

    setTitle(titleParam!);

    try {
      setIsLoading(true);
      axiosInstance
        .get(`/discover/movie`, {
          params: {
            api_key: process.env.NEXT_PUBLIC_API_KEY,
            with_genres: id,
            page: currentPage,
          },
        })
        .then((response) => {
          setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
          setTotalPages(response.data.total_pages);
          setCurrentPage(response.data.page);
          setIsLoading(false);
        });
    } catch (error) {}
  }, [params.id, currentPage]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setCurrentPage((currentPageInside) => currentPageInside + 1);
      }
    });
    if (loader.current) intersectionObserver.observe(loader.current);
  }, []);

  return (
    <div className="bg-gray-800  w-full">
      <div className="max-w-[1640px] mx-auto flex flex-col gap-10  py-10">
        <span className="text-4xl font-bold capitalize">{title}</span>
        <div className="grid grid-cols-6 gap-8  ">
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

export default Genre;
