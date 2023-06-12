/** @type {import('next').NextConfig} */
module.exports  = {
  swcMinify:true,
  images: {
    domains: ['ryancarmody-blog.s3.amazonaws.com']
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    legacyBrowsers:false,
    optimizeCss: true, // enabling this will enable SSR for Tailwind
    serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"]
  },
};


