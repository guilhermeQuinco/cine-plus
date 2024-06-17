export const BASE_URL = `https://api.themoviedb.org/3`;
export const BASE_URL_IMAGE = "https://image.tmdb.org/t/p/w500";

export function conventToHours(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { hours, minutes };
}

export function infiniteScroll(loader: any) {}
