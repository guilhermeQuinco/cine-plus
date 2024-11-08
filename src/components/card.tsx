import { IMovie } from "@/models/IMovie";
import { BASE_URL_IMAGE, conventToHours } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CardProps {
  movie: IMovie;
}

const Card = ({ movie }: CardProps) => {
  return (
    <Link href={`/details/${movie.id}`}>
      {" "}
      <div className="group w-full hover:scale-125 hover:z-10 hover:shadow-xl transition ease-linear duration-100 rounded-lg ">
        <img
          src={`${BASE_URL_IMAGE}/${movie.poster_path}`}
          alt="poster"
          className="object-cover w-[100%] h-[350px] rounded-lg group-hover:rounded-b-none "
        />

        <div className="invisible bg-black group-hover:visible gap-3 flex flex-col absolute p-5 group-hover:rounded-b-lg">
          <h1 className="text-xl font-bold">{movie.title}</h1>
          <div className="w-full bg-slate-700 h-[1px]"></div>
          <span className="textHidden">{movie.overview}</span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
