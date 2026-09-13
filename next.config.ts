import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Allow the dev server's HMR/JS bundle to be reachable when testing from
  // another device on the same network (e.g. a phone hitting the PC's LAN IP).
  allowedDevOrigins: ['172.20.10.3'],
};

export default nextConfig;
