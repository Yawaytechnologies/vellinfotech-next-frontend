export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/admin/*"],
      },
    ],
    sitemap: "https://www.vellinfotech.com/sitemap.xml",
  };
}
