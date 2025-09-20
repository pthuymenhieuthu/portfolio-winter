import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const withMDX = createMDX({
  extension: /\.mdx?$/, // cho phép import .md và .mdx
});

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'], // hỗ trợ file md/mdx như page
};

export default withMDX(nextConfig);