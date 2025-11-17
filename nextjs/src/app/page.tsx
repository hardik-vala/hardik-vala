import Link from "next/dist/client/link";

export default function Home() {
  return (
    <div className="my-40 max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-medium mb-4">The technical founder @ <Link href="https://qaggle.com" className="font-medium text-blue-600 hover:text-blue-500 transition-text-color">qaggle.com</Link></h1>
      <h1 className="text-2xl text-gray-500">yc s23 | ex-google | ex-apple</h1>
    </div>
  );
}