"use client";

import Card from "@/components/card";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetPopularMovies } from "@/hooks/useGetPopularMovies";

import React, { useRef } from "react";

const Movies = () => {
  const { popularMovies } = useGetPopularMovies();

  return (
    <section className="w-full overflow-hidden mt-[200px]">
      <div className="max-w-[1640px] mx-auto ">
        <div>
          <h1>Popular Movies</h1>
          <div className="grid grid-cols-6 gap-5 pt-[2rem] ">
            <Carousel className="w-full max-w-sm">
              <CarouselContent className="-ml-1">
                {popularMovies?.map((movie) => (
                  <Card movie={movie} key={movie.id} />
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Movies;
