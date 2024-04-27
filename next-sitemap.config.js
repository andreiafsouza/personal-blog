/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://personal-blog-andreiafsouza.vercel.app/",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
};
