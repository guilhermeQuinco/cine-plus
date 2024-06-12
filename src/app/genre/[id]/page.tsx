"use client";

import { axiosInstance } from "@/app/api/api";
import Card from "@/components/card";
import { IMovie } from "@/models/IMovie";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Genre = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = params.id;
    const genre = searchParams.get("genre");
    const page = searchParams.get("page");

    axiosInstance
      .get(`/discover/movie`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          with_genres: id,
          page,
        },
      })
      .then((response) => {
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        setCurrentPage(response.data.page);
      });
  }, [params.id, searchParams.get("page")]);

  const handlePage = (button: string) => {
    let page = "";
    button === "back"
      ? (page = `page=${currentPage - 1}`)
      : (page = `page=${currentPage + 1}`);

    router.push(
      `/genre/${params.id}?genre=${searchParams.get("genre")}&${page}`
    );
  };

  return (
    <div className="bg-gray-800  w-full">
      <div className="max-w-[1640px] mx-auto flex flex-col gap-10 items-center">
        <div className="grid grid-cols-6 gap-8  ">
          {movies?.map((movie) => (
            <Card movie={movie} key={movie.id} />
          ))}
        </div>

        <div className="flex flex-row gap-5">
          <button
            onClick={() => handlePage("back")}
            className={currentPage === 1 ? "hidden" : ""}
          >
            Back
          </button>
          <button
            onClick={() => handlePage("next")}
            className={currentPage === totalPages ? "hidden" : ""}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Genre;
