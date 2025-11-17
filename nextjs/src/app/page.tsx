import Link from "next/dist/client/link";

export default function Home() {
  return (
    <div className="my-40 max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-medium mb-6">The technical founder</h1>
      <h1 className="text-2xl font-medium mb-6"><Link href="https://qaggle.com" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">qaggle</Link> <span className="text-gray-400">& one over one</span></h1>
      <h1 className="text-xl text-gray-600">yc s23 | ex-google | ex-apple</h1>
    </div>
  );
}