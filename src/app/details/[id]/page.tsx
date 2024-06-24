"use client";

import { axiosInstance } from "@/app/api/api";
import Card from "@/components/card";
import { IMovie, IMovieDetail } from "@/models/IMovie";
import { BASE_URL_IMAGE, conventToHours } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const MovieDetails = () => {
  const [movie, setMovie] = useState<IMovieDetail>();
  const [recommendationMovies, setRecommendationMovies] = useState<IMovie[]>(
    []
  );
  const params = useParams();

  useEffect(() => {
    const id = params.id;

    axiosInstance
      .get(`/movie/${id}`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
        },
      })
      .then((response) => {
        setMovie(response.data);
      });
  }, [params.id]);

  useEffect(() => {
    axiosInstance
      .get(`/movie/${params.id}/similar`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
        },
      })
      .then((response) =>
        setRecommendationMovies((prev) => [...prev, ...response.data.results])
      );
  }, [params.id]);

  const { hours, minutes } = conventToHours(movie?.runtime!);

  console.log();

  return (
    <div className="w-full">
      <img
        src={`${BASE_URL_IMAGE}/${movie?.backdrop_path}`}
        alt="Background "
        className="-z-10 rounded-lg w-full"
      />
      <div className="max-w-[1660px] mx-auto px-6 py-10 flex flex-col">
        <div className="flex items-center lg:flex-row flex-col gap-[40px]">
          <div className="flex flex-col gap-10">
            <h1 className="text-5xl font-bold">{movie?.original_title}</h1>

            <p className="text-xl">{movie?.overview}</p>
            <p className="text-lg text-gray-500">{`${hours}h ${minutes}min`}</p>

            <div className="flex flex-row gap-5">
              {movie?.genres?.map((genre) => (
                <Link
                  key={genre.id}
                  href={`/genre/${genre.id}?genre=${genre.name}`}
                >
                  <p className="text-lg">{genre.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-[50px]">
          <h2 className="text-3xl font-bold">Similar</h2>
          <div className="grid lg:grid-cols-6 grid-cols-2 gap-5">
            {recommendationMovies.map((recommend) => (
              <Card movie={recommend} key={recommend.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
