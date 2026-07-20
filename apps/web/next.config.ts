import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@abhimanyu/ui"],
  allowedDevOrigins: ["unscarfed-elfreda-superrespectably.ngrok-free.dev"],
  cacheComponents: true,
  // async rewrites() {
  //   const apiUrl = process.env.API_URL ?? "http://localhost:4000"
  //   return [
  //     { source: "/api/auth/:path*", destination: `${apiUrl}/api/auth/:path*` },
  //     { source: "/api/trpc/:path*", destination: `${apiUrl}/api/trpc/:path*` },
  //   ]
  // },
}

export default nextConfig
