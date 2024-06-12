import { IMovie } from "@/models/IMovie";
import { BASE_URL_IMAGE } from "@/utils";
import Image from "next/image";
import React from "react";

interface CardProps {
  movie: IMovie;
}

const Card = ({ movie }: CardProps) => {
  return (
    <div className="group relative hover:scale-125 hover:z-10 transition ease-out duration-300">
      <img
        src={`${BASE_URL_IMAGE}/${movie.poster_path}`}
        alt="poster"
        className="object-cover w-[100% ] h-[380px]"
      />

      <div className="invisible bg-black group-hover:visible absolute"></div>
    </div>
  );
};

export default Card;
