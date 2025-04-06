import { getAllPosts } from "@/lib/markdown";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";

export default function Posts() {
  const posts = getAllPosts();

  return (
    <PageLayout title="Blog">
      <div>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <div className="flex flex-row gap-8">
                <span className="w-[25%] md:w-[20%] lg:w-[15%] text-gray-400 text-sm text-right">
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
                </span>
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="w-[75%] md:w-[80%] lg:w-[85%] font-semibold hover:underline"
              >
                {post.title}
              </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  );
}

export async function generateMetadata() {
  return {
    title: "Blog | Hardik Vala",
  };
}
