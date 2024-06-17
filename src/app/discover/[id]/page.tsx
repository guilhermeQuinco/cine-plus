"use client";

import { axiosInstance } from "@/app/api/api";
import Card from "@/components/card";
import Loading from "@/components/loading";
import { IMovie } from "@/models/IMovie";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Discover = () => {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [discover, setDiscover] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const loader = useRef(null);

  useEffect(() => {
    // puxa o parametro
    const id = params.id.toString();

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

    try {
      setIsLoading(true);
      axiosInstance
        .get(`/movie/${id}`, {
          params: {
            api_key: process.env.NEXT_PUBLIC_API_KEY,
            language: "en",
            page: currentPage,
          },
        })
        .then((response) => {
          setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
          setCurrentPage(response.data.page);
          setTotalPages(response.data.total_pages);
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  }, [currentPage, params.id, searchParams.get("page")]);

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
      <div className="max-w-[1640px] mx-auto flex flex-col gap-10 items-center">
        <h1 className="mt-10 text-left font-bold">{title}</h1>
        <div className="grid grid-cols-6 gap-5  ">
          {movies?.map((movie) => (
            <Card movie={movie} key={movie.id} />
          ))}
        </div>
        {isLoading && <Loading />}
        <div ref={loader} />
      </div>
      first
    </div>
  );
};

export default Discover;
