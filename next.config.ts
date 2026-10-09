import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Allow the dev server's HMR/JS bundle to be reachable when testing from
  // another device on the same network (e.g. a phone hitting the PC's LAN IP).
  allowedDevOrigins: ['172.20.10.3'],

  async redirects() {
    return [
      // The site was first live (and indexed by Google) on the free Vercel
      // address. Permanently send it to the real domain so search results
      // move across. Per-deployment preview URLs have other hostnames and
      // are unaffected. Google Search Console verification files
      // (public/google<hex>.html) are exempt, so the old address can be
      // verified for the Removals and Change of Address tools.
      {
        source: '/:path((?!google[0-9a-f]+\\.html$).*)',
        has: [{ type: 'host', value: 'lankaivorydestination.vercel.app' }],
        destination: 'https://lankaivorydestination.com/:path',
        permanent: true,
      },
      // The Destinations page was removed in favour of the tour listing; send
      // its current and pre-restructure paths there. Exact matches only, so
      // /destinations/*.jpg image paths are not redirected.
      {
        source: '/discover-sri-lanka/destinations',
        destination: '/tours/signature-journeys',
        permanent: true,
      },
      {
        source: '/destinations',
        destination: '/tours/signature-journeys',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
