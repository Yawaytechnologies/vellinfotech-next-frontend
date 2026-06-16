import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      <h1 className="text-6xl font-bold text-[#005BAC] mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-slate-800 mb-2">Page Not Found</h2>
      <p className="text-slate-500 mb-8">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="bg-[#005BAC] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#004b8d] transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
