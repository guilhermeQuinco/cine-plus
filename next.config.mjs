/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "**",
      },
    ],
  },
  redirects() {
    return [
      {
        source: "/",
        destination: "/discover/now_playing",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
