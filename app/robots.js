export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
          "/login/",
        ],
      },
    ],
    sitemap: "https://www.vellinfotech.com/sitemap.xml",
    host: "https://www.vellinfotech.com",
  };
}