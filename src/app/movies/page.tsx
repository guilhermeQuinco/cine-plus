"use client";

import Card from "@/components/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetPopularMovies } from "@/hooks/useGetPopularMovies";
import { useGetTopRatedMovies } from "@/hooks/useGetTopRatedMovies";

import React, { useRef } from "react";

const Movies = () => {
  const { popularMovies } = useGetPopularMovies();
  const { topRatedMovies } = useGetTopRatedMovies();

  return (
    <section className="w-full overflow-hidden mt-[100px]">
      <div className="max-w-[1640px] mx-auto flex flex-col gap-20 ">
        <div>
          <h1>Popular Movies</h1>

          <Carousel className="w-full max-w-full ">
            <CarouselContent className="-ml-5">
              {popularMovies?.map((movie, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 basis-1/2 lg:basis-1/6"
                >
                  <div className="p-1">
                    <Card movie={movie} key={movie.id} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div>
          <h1>Top rated movies</h1>

          <Carousel className="w-full max-w-full">
            <CarouselContent className="-ml-1">
              {topRatedMovies?.map((movie, index) => (
                <CarouselItem
                  key={index}
                  className="p-5 basis-1/2 lg:basis-1/6"
                >
                  <div className="p-1">
                    <Card movie={movie} key={movie.id} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Movies;
