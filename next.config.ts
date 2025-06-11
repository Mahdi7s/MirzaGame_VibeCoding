
import type {NextConfig} from 'next';

const repoName = process.env.REPO_NAME || '';

const nextConfig: NextConfig = {
  output: 'export',
  // basePath is removed as GitHub Pages handles subpath via repo name.
  // This ensures index.html is at the root of the 'out' directory.
  assetPrefix: repoName ? `/${repoName}/` : '', // ESSENTIAL for assets in subpath
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
