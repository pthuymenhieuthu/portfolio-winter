import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const withMDX = createMDX({
  extension: /\.mdx?$/, // cho phép import .md và .mdx
});

const nextConfig = {
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'], // hỗ trợ file md/mdx như page
};

export default withMDX(nextConfig);
