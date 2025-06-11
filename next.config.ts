
import type {NextConfig} from 'next';

// This will be set by the GitHub Actions workflow from GITHUB_REPOSITORY
const repoName = process.env.REPO_NAME || '';

const nextConfig: NextConfig = {
  output: 'export',
  // basePath: repoName ? `/${repoName}` : '', // REMOVED: GitHub Pages handles the subpath via the repo name. This caused index.html to be in a subfolder within the 'out' dir.
  assetPrefix: repoName ? `/${repoName}/` : '', // ESSENTIAL: Ensures assets are loaded correctly from the subpath.
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
