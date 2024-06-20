"use client";

import { use, useEffect, useState } from "react";
import { IMovie } from "@/models/IMovie";
import { axiosInstance } from "./api/api";
import { BASE_URL_IMAGE } from "@/utils";
import Link from "next/link";
import Card from "@/components/card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
  };

  const [slideMovies, setSlideMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    axiosInstance
      .get(`/discover/movie`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
        },
      })
      .then((response) =>
        setSlideMovies((prevMovies) => [
          ...prevMovies,
          ...response.data.results,
        ])
      );
  }, []);

  return (
    <main className="w-full overflow-hidden ">
      <div className="max-w-[1640px] mx-auto flex h-full flex-col  gap-10 items-center">
        <Slider {...settings} className="w-full h-full  flex mt-[50px] ">
          {slideMovies.map((movie) => (
            <Card movie={movie} key={movie.id} />
          ))}
        </Slider>
      </div>
    </main>
  );
}
