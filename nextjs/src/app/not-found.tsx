import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center my-20">
      <h1 className="text-4xl font-bold mb-8">404</h1>
      <p className="text-gray-500 mb-8">
        The page you{"'"}re looking for doesn{"'"}t exist or has been moved.
      </p>
      <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
        Return Home
      </Link>
    </div>
  );
}
