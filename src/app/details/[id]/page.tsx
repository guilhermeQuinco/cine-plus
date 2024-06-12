"use client";

import { axiosInstance } from "@/app/api/api";
import { IMovieDetail } from "@/models/IMovie";
import { BASE_URL_IMAGE, conventToHours } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const MovieDetails = () => {
  const [movie, setMovie] = useState<IMovieDetail>();
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

  const { hours, minutes } = conventToHours(movie?.runtime!);

  console.log();

  return (
    <div className="w-full ]">
      <div className="max-w-[1660px] mx-auto px-6 py-10 flex flex-row gap-[40px]">
        <Image
          src={`${BASE_URL_IMAGE}/${movie?.poster_path}`}
          alt="Background "
          className="-z-10 rounded-lg"
          width={400}
          height={200}
        />

        <div className="flex flex-col gap-10">
          <h1>{movie?.original_title}</h1>

          <p>{movie?.overview}</p>
          <p>{`${hours}h${minutes}min`}</p>

          <div className="flex flex-row gap-5">
            {movie?.genres?.map((genre) => (
              <Link
                key={genre.id}
                href={`/genre/${genre.id}?genre=${genre.name}`}
              >
                <p>{genre.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
