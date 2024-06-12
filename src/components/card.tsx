import { IMovie } from "@/models/IMovie";
import { BASE_URL_IMAGE } from "@/utils";
import Image from "next/image";
import React from "react";

interface CardProps {
  movie: IMovie;
}

const Card = ({ movie }: CardProps) => {
  return (
    <div className="">
      <div className="relative">
        <img
          src={`${BASE_URL_IMAGE}/${movie.poster_path}`}
          alt="poster"
          className="object-cover w-[100%] h-[380px]"
        />
      </div>
    </div>
  );
};

export default Card;
