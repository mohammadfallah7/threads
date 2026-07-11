import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { remotePatterns: [new URL("https://4tc5kyrth8.ucarecd.net/**")] },
};

export default nextConfig;
