
import type {NextConfig} from 'next';

// This will be set by the GitHub Actions workflow from GITHUB_REPOSITORY
const repoName = process.env.REPO_NAME || '';

const nextConfig: NextConfig = {
  output: 'export',
  // Set basePath and assetPrefix if deploying to a subdirectory like username.github.io/repo-name
  // If deploying to username.github.io (a user/org site), these can be empty strings or removed.
  basePath: repoName ? `/${repoName}` : '',
  assetPrefix: repoName ? `/${repoName}/` : '',
  images: {
    unoptimized: true, // Required for static export as image optimization needs a server
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
